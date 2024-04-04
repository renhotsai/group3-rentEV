import React, { useEffect, useState } from "react"
import { auth, db } from "../firebaseConfig"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore"
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native"
import OrderImage from "../assets/electric-car.png"

const CarItem = ({ item, onDetailPress }) => {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const getUserName = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, "Rentals", user))

        setUserName(userDoc.data().name)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    getUserName(item.rental)
  }, [item.rental])

  return (
    <Pressable onPress={() => onDetailPress(item)} style={styles.item}>
      <Image style={styles.itemImage} source={OrderImage} />
      <Text style={styles.itemText}>{userName} sent request</Text>
    </Pressable>
  )
}

const OrderListView = ({ navigation, route }) => {
  const [orderList, setOrderList] = useState([])
  const [user, setUser] = useState({})
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const updateUserList = () => {
      const temp = orderList.filter((order) =>
        user.orderList.includes(order.id)
      )
      setUserList(temp)
    }

    updateUserList()
  }, [orderList, user])

  useEffect(() => {
    const unsubscribeUser = onSnapshot(
      doc(db, "Owners", auth.currentUser.email),
      (doc) => {
        setUser(doc.data())
      }
    )

    return () => {
      unsubscribeUser()
    }
  }, [])

  useEffect(() => {
    const unsubscribeOrders = onSnapshot(
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
      unsubscribeOrders()
    }
  }, [])

  const onDetailPress = (item) => {
    navigation.navigate("OrderDetail", { item: item })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarItem item={item} onDetailPress={onDetailPress} />
        )}
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
