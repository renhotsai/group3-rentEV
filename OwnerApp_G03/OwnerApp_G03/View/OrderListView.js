import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native"
import React, { Component, useEffect, useState } from "react"
import { auth, db } from "../firebaseConfig"
import { select } from "../Controller/fireDBHelper"
import { collection, doc, onSnapshot } from "firebase/firestore"
import OrderImage from "../assets/electric-car.png"
const OrderListView = ({ navigation, route }) => {
  const renderCarItem = ({ item }) => {
    return (
      <Pressable onPress={() => onDetailPress(item)} style={styles.item}>
        <Image style={styles.itemImage} source={OrderImage} />
        <Text style={styles.itemText}>{item.rental} sent request</Text>
      </Pressable>
    )
  }

  const onDetailPress = (item) => {
    navigation.navigate("OrderDetail", { item: item })
  }

  const [orderList, setOrderList] = useState([])

  const [user, setUser] = useState({})
  const [userList, setUserList] = useState([])

  const updateUserList = () => {
    const temp = orderList.filter((order) => user.orderList.includes(order.id))
    setUserList(temp)
  }

  useEffect(() => {
    updateUserList()
  }, [orderList, user])

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        doc(db, "Owners", auth.currentUser.email),
        (doc) => {
          setUser(doc.data())
        }
      )

      return () => {
        unsubscribe()
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "Orders"),
        (querySnapshot) => {
          const temp = []
          querySnapshot.forEach((doc) => {
            const vehicle = {
              id: doc.id,
              ...doc.data(),
            }
            temp.push(vehicle)
          })
          setOrderList(temp)
        }
      )

      return () => {
        unsubscribe()
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        key={(item) => {
          return item.id
        }}
        renderItem={(item) => renderCarItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light gray background color
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  itemText: {
    paddingLeft: 10,
    fontSize: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
})

export default OrderListView
