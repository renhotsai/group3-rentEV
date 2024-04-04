import React from "react"
import { View, Text, StyleSheet, Image, FlatList } from "react-native"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { FIRESTORE_DB } from "../../firebaseConfig"
import { useState, useEffect } from "react"

const Reservations = () => {
  //   let tempList = []
  const [reservationData, setReservationData] = useState([])

  //   const fetchFromDb = () => {
  //     const q = query(collection(FIRESTORE_DB, "Orders"))
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           const reservation = {
  //             id: change.doc.id,
  //             ...change.doc.data(),
  //           }
  //           console.log("New order: ", reservation)
  //           tempList.push(reservation)
  //         }
  //         if (change.type === "modified") {
  //           tempList.forEach((reservation, index) => {
  //             if (reservation.id === change.doc.id) {
  //               const reservationModified = {
  //                 id: change.doc.id,
  //                 ...change.doc.data(),
  //               }
  //               tempList[index] = reservationModified
  //               console.log("Modified order: ", tempList[index])
  //             }
  //           })
  //         }
  //         if (change.type === "removed") {
  //           console.log("Removed order: ", change.doc.data())
  //         }
  //       })
  //       setReservationData(tempList)
  //     })
  //   }

  const renderEmptyMsg = () => {
    return (
      <View>
        <Text style={styles.emptyMsg}>No Reservations found</Text>
      </View>
    )
  }

  const renderResItem = ({ item }) => (
    <View style={styles.resItemContainer}>
      <View style={styles.infoCarDetsWrapper}>
        <Text style={styles.infoResStatus}>{item.status}</Text>
        <Image
          source={{ uri: item?.vehicleImg[0] }}
          style={styles.resItemImg}
        />
        <View style={styles.resInfoContainer}>
          <Text style={styles.infoTitle}>{item.vehicleName}</Text>
          <View style={styles.infoResOwnerWrapper}>
            <Image
              source={require("../../../assets/profilePics/profile1.jpg")}
              style={styles.profilePic}
            />
            <Text style={styles.infoSmTitle}>{item.vehicleOwnerName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoResDetsRow1}>
        <View style={styles.infoResDetsCol1}>
          <Text style={styles.infoSubtitle}>LIC No.</Text>
          <Text style={styles.infoSmTitle}>{item.vehicleLicenseNo}</Text>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.infoSubtitle}>Price</Text>
            <Text style={styles.infoSmTitle}>${item.price}</Text>
          </View>
        </View>
        <View style={{ width: "60%" }}>
          <Text style={styles.infoSubtitle}>Pickup Location</Text>
          <Text style={styles.infoSmTitle}>{item.pickUpAddress}</Text>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.infoSubtitle}>Booking Date</Text>
            <Text style={styles.infoSmTitle}>{getDate(item.bookingDate)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoResDetsRow1}>
        <View>
          <Text style={styles.infoSubtitle}>Confirmation Code</Text>
          <Text style={styles.infoSmTitle}>
            {item.confirmCode ? item.confirmCode : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  )

  const getDate = (time) => {
    const timestamp =
      time.seconds * 1000 + Math.floor(time.nanoseconds / 1000000) // Combine seconds and nanoseconds to get milliseconds
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    console.log(formattedDate) // Output: April 15, 2024
    return formattedDate
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "Orders"),
      (querySnapshot) => {
        const temp = []
        querySnapshot.forEach((doc) => {
          const order = {
            id: doc.id,
            ...doc.data(),
          }
          temp.push(order)
        })
        setReservationData(temp)
      }
    )
    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}> My Reservations </Text>
      <FlatList
        style={styles.reservationList}
        data={reservationData}
        key={(item) => {
          return item.id
        }}
        ListEmptyComponent={renderEmptyMsg}
        renderItem={(item) => renderResItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F4F5F6",
  },
  pageHeading: {
    marginTop: 8,
    marginBottom: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  resItemContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#959da5",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 16,
    marginBottom: 8,
  },
  resItemImg: {
    width: 110,
    height: 70,
    objectFit: "fill",
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginTop: 24,
  },
  infoSmTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  infoSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#929292",
  },
  infoCarDetsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 8,
  },
  infoResDetsCol1: {
    width: "40%",
  },
  infoResDetsRow1: {
    borderTopWidth: 2,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopColor: "#F4F5F6",
    flexDirection: "row",
  },
  infoResStatus: {
    position: "absolute",
    fontWeight: "bold",
    top: 0,
    right: 0,
    color: "#075eec",
  },
  infoResPrice: {
    color: "#075eec",
    fontSize: 16,
    fontWeight: "600",
  },
  infoResOwnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  profilePic: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginEnd: 5,
  },
  emptyMsg: {
    marginTop: 25,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  reservationList: {
    alignContent: "stretch",
    width: "100%",
    padding: 24,
  },
})

export default Reservations

/*
    OrderObject: {
        vehicleName: ""
        status: ""
        vehicleOwnerName: ""
        vehicleLicenseNo: ""
        pickUpAddress: ""
        price: 0.0,
        bookingDate: date,
        confirmationCode: ""
        vehicleImg: ""
        vehicleOwnerImg: ""
    }
 */
