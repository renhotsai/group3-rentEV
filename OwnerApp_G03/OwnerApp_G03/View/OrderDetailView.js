import { doc, getDoc, updateDoc } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { Alert, Pressable, Text, View, Image, StyleSheet } from "react-native"
import { db } from "../firebaseConfig"

const OrderDetailView = ({ navigation, route }) => {
  const [orderDetail, setOrderDetail] = useState(null)
  const [rentalInfo, setRentalInfo] = useState(null)

  useEffect(() => {
    getDoc(doc(db, "Orders", order.id)).then((doc) => {
      setOrderDetail(doc.data())
    })
    getDoc(doc(db, "Rentals", order.rental)).then((doc) => {
      setRentalInfo(doc.data())
      console.log(doc.data())
    })
  }, [])

  const order = route.params.item

  const updateFireDoc = async (status) => {
    try {
      let updateToDB = {
        status: status,
      }
      if (status === "APPROVED") {
        updateToDB.confirmCode = generateRandomString()
      }

      await updateDoc(doc(db, "Orders", order.id), updateToDB)
      Alert.alert(`Order ${status}`)
    } catch (err) {
      console.error(err)
    }
  }

  const generateRandomString = () => {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const onAPPROVEPress = () => {
    updateFireDoc("APPROVED")
    updateDoc(doc(db, "Vehicles", order.vehicle), {
      isRent: true,
    })
    navigation.goBack()
  }

  const onDECLINEDPress = () => {
    updateFireDoc("DECLINED")
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000)
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <View style={styles.container}>
      {/* Vehicle Heading */}
      <Text style={styles.heading}>Vehicle</Text>
      {/* Vehicle Info Card */}
      {orderDetail && (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            {orderDetail.vehicleImg.length > 0 && (
              <Image
                source={{ uri: orderDetail.vehicleImg[0] }}
                style={styles.image}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.label}>Booking Date</Text>
              <Text>{formatDate(orderDetail.bookingDate)}</Text>
              <Text style={styles.label}>End Date</Text>
              <Text>{formatDate(orderDetail.endDate)}</Text>
              <Text style={styles.label}>Pick-Up Address</Text>
              <Text>{orderDetail.pickUpAddress}</Text>
              <Text style={styles.label}>Price</Text>
              <Text>{orderDetail.price}</Text>
              <Text style={styles.label}>Vehicle License No</Text>
              <Text>{orderDetail.vehicleLicenseNo}</Text>
              <Text style={styles.label}>Vehicle Name</Text>
              <Text>{orderDetail.vehicleName}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Rental Heading */}
      <Text style={styles.heading}>Rental</Text>
      {/* Rental Info Card */}
      {rentalInfo && (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: rentalInfo.imageUrl }}
              style={styles.imagePerson}
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Name</Text>
              <Text>{rentalInfo.name}</Text>
              <Text style={styles.label}>Email</Text>
              <Text>{rentalInfo.email}</Text>
              <Text style={styles.label}>Phone</Text>
              <Text>{rentalInfo.phone}</Text>
              <Text style={styles.label}>Address</Text>
              <Text>{rentalInfo.address}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Buttons */}
      {orderDetail && orderDetail.status === "PENDING" && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={onAPPROVEPress} style={styles.button}>
            <Text style={styles.buttonText}>APPROVE</Text>
          </Pressable>

          <Pressable onPress={onDECLINEDPress} style={styles.button}>
            <Text style={styles.buttonText}>DECLINE</Text>
          </Pressable>
        </View>
      )}

      {orderDetail && orderDetail.status === "DECLINED" && (
        <Text style={styles.declinedText}>DECLINED</Text>
      )}

      {orderDetail &&
        orderDetail.status !== "PENDING" &&
        orderDetail.status !== "DECLINED" && (
          <View>
            <Text style={styles.approvedText}>APPROVED</Text>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    height: 100,
    marginRight: 10,
  },
  imagePerson: {
    width: "50%",
    height: "100%",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  label: {
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 3, // Add elevation for shadow effect (Android)
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
  approvedText: {
    backgroundColor: "#2ecc71",
    color: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  declinedText: {
    backgroundColor: "#c0392b",
    color: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 10,
    overflow: "hidden",
  },
})

export default OrderDetailView
