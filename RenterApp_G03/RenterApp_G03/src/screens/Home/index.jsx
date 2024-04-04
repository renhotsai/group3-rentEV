import React, { useState, useEffect } from "react"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps" // Import PROVIDER_GOOGLE for Android
import { StyleSheet, View, Text } from "react-native"
import { getAllCarData } from "../../firebaseHelper"
import * as Location from "expo-location"
import CarListItem from "../../components/CarListItem"
import CustomMarker from "../../components/CustomMarker"
import { onSnapshot, collection } from "firebase/firestore"
import { FIRESTORE_DB } from "../../firebaseConfig"

const Home = () => {
  const [userLocation, setUserLocation] = useState(null)
  const [evCarList, setEvCarList] = useState([])
  const [selectedCar, setSelectedCar] = useState(false)
  const [currCar, setCurrCar] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "Vehicles"),
      (querySnapshot) => {
        const temp = []
        querySnapshot.forEach((doc) => {
          const vehicle = {
            id: doc.id,
            ...doc.data(),
          }
          temp.push(vehicle)
        })
        setEvCarList(temp)
      }
    )
    return () => unsubscribe()
  }, [])
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({})
          setUserLocation(location.coords)
        } else {
          console.log("Location permission denied")
        }
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    }
    fetchLocation()
  }, [])

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const data = await getAllCarData()
        setEvCarList(data)
      } catch (error) {
        console.error("Error getting documents", error)
      }
    }
    fetchCarList()
  }, [])

  return (
    <View style={styles.container}>
      {userLocation && (
        <View>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {evCarList.map((car, index) => (
              <CustomMarker
                key={index}
                car={car}
                onPress={() => {
                  setSelectedCar(true)
                  setCurrCar(car)
                }}
              />
            ))}
          </MapView>
          {selectedCar && <CarListItem car={currCar} />}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    width: 50,
    height: 50,
  },
})

export default Home
