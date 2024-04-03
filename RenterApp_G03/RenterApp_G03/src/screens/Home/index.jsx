import React, { useState, useEffect } from "react"
import axios from "axios"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps" // Import PROVIDER_GOOGLE for Android
import { StyleSheet, View, Platform } from "react-native"
import * as Location from "expo-location"

const Home = () => {
  const [userLocation, setUserLocation] = useState(null) // Initialize state for user location

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({})
          setUserLocation(location.coords)
          console.log(
            "Location:",
            location.coords.latitude,
            location.coords.longitude
          )
        } else {
          console.log("Location permission denied")
        }
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    }
    fetchLocation()
  }, [])

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
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
})

export default Home
