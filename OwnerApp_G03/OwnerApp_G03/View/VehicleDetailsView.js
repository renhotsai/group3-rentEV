import React, { useState, useEffect } from "react"
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native"
import { styles } from "./styles"
import { pickerArrow } from "./pickerArrow"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import * as Location from "expo-location"
const VehicleDetailsView = ({ navigation, route }) => {
  const [carLocation, setCarLocation] = useState(null)
  const data = route.params.item

  const handleEditPress = () => {
    navigation.navigate("EditVehicle", { item: data })
  }
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await Location.geocodeAsync(data.address)

      const coordinates = {
        latitude: location[0].latitude,
        longitude: location[0].longitude,
      }

      setCarLocation(coordinates)
    }
    fetchLocation()
  }, [])
  const renderDetailItem = (label, value) => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value ? value : "NA"}</Text>
    </View>
  )

  const renderDetailPair = (label1, value1, label2, value2) => (
    <View style={[styles.detailRow]}>
      {renderDetailItem(label1, value1)}
      {renderDetailItem(label2, value2)}
    </View>
  )

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FlatList
          data={data.imageUrl}
          style={styles.marginBottom}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.img} />
          )}
        />

        {renderDetailPair(
          "Make",
          data.make + " " + data.model,
          "Trim",
          data.trim
        )}
        {renderDetailPair(
          "Seats",
          data.seat,
          "License Plate",
          data.licensePlate
        )}
        {renderDetailPair(
          "Availability",
          (data.isRent ? "Not Available" : "Available"),
          "Capacity",
          data.capacity
        )}
        {renderDetailPair(
          "Price",
          data.price ? "$" + data.price : "NA",
          "Address",
          data.address
        )}
        {carLocation && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: carLocation.latitude,
              longitude: carLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: carLocation.latitude,
                longitude: carLocation.longitude,
              }}
              title={"Car Location"}
              description={"This is where the car is currently located"}
            />
          </MapView>
        )}
        <Pressable
          style={[styles.button, styles.topMargin]}
          onPress={handleEditPress}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default VehicleDetailsView
