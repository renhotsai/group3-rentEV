import React, { useState, useEffect } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native"
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

  const handleSearch = async () => {
    const location = await Location.geocodeAsync(search)

    if (location && location.length > 0) {
      const coordinates = {
        latitude: location[0].latitude,
        longitude: location[0].longitude,
      }
      setUserLocation(coordinates)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Location"
          onChangeText={(text) => setSearch(text)}
          value={search}
          clearButtonMode="while-editing"
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {userLocation && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginRight: 8,
  },
  clearButton: {
    padding: 8,
  },
  searchButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default Home
