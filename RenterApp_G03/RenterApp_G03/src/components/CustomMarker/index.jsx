import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { Marker } from "react-native-maps"
import * as Location from "expo-location" // Import Location from expo-location

const CustomMarker = ({ car, onPress }) => {
  const fetchCoordinates = async (address) => {
    try {
      if (address) {
        const getLocation = async () => {
          const location = await Location.geocodeAsync(address)
          const coordinates = {
            latitude: location[0].latitude,
            longitude: location[0].longitude,
          }

          return coordinates
        }
        return await getLocation()
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error)
      return null
    }
  }

  const [coordinates, setCoordinates] = React.useState(null)

  useEffect(() => {
    const getCoordinates = async () => {
      const coords = await fetchCoordinates(car.address)
      setCoordinates(coords)
    }

    getCoordinates()
  }, [car.address])

  if (!coordinates) {
    return null
  }

  return (
    <Marker coordinate={coordinates} onPress={onPress}>
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>${car.price}</Text>
      </View>
    </Marker>
  )
}

export default CustomMarker
