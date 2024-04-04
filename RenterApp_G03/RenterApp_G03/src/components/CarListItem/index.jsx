import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import { createOrder } from "../../firebaseHelper"

const CarListItem = ({ car }) => {
  useEffect(() => {
    console.log(car)
  }, [car])
  const handleMakeOrder = async () => {
    try {
      createOrder(car)
      Alert.alert("Your order has been placed!")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: car.imageUrl[0],
        }}
        style={styles.image}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>
          {car.make} {car.model}s
        </Text>
        <Text>Capacity: {car.capacity}</Text>
        <Text>Seat: {car.seat}</Text>
        <Text>License Plate: {car.licensePlate}</Text>
        <Text>Address: {car.address}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>$ {car.price}</Text>
          <TouchableOpacity
            style={styles.bookNowButton}
            onPress={handleMakeOrder}
          >
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 150,
    aspectRatio: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    color: "gray",
  },
  rightContainer: {
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  bookNowButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bookNowText: {
    color: "white",
  },
})

export default CarListItem
