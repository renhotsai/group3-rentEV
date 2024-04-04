import React, { useState, useEffect } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View, TextInput } from "react-native"
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
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {userLocation && (
        <View style={styles.mapContainer}>
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
})

export default Home
