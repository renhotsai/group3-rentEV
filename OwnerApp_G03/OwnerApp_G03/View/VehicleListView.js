import { FlatList, Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { select } from '../Controller/fireDBHelper'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { styles } from './styles'

const VehicleListView = ({ navigation, route }) => {

    const renderCarItem = ({ item }) => {
      return (
        <Pressable
          onPress={() => onDetailPress(item)}
          style={styles.listItemContainer}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imageUrl[0] }}
              style={styles.ListImg}
              alt="Car Image"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Make: {item.make} {item.model}
            </Text>
            <Text style={styles.infoText}>
              Seating Capacity: {item.capacity ? item.capacity : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Availability: {item.isRent ? "Not Available" : "Available"}
            </Text>
            <Text style={styles.infoText}>
              Price: {item.price ? ("$"+item.price) : "N/A"}
            </Text>
          </View>
        </Pressable>
      );
    };


    const onDetailPress = (item) =>{
        navigation.navigate("VehicleDetails",{item:item})
    }


    const [vehicleList, setVehicleList] = useState([])

    const [user, setUser] = useState({})
    const [userList, setUserList] = useState([])

    const updateUserList = () => {
        const temp = vehicleList.filter(vehicle => user.carList.includes(vehicle.id))
        setUserList(temp)
    }

    useEffect(() => {
        updateUserList()
    }, [vehicleList, user])

    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(doc(db, "Owners", auth.currentUser.email), (doc) => {
                setUser(doc.data())

            });

            return () => {
                unsubscribe()
            }
        }
        catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(collection(db, "Vehicles"), (querySnapshot) => {
                const temp = [];
                querySnapshot.forEach((doc) => {
                    const vehicle = {
                        id: doc.id,
                        ...doc.data()
                    }
                    temp.push(vehicle)
                });
                setVehicleList(temp)

            });

            return () => {
                unsubscribe()
            }
        }
        catch (err) {
            console.error(err);
        }
    }, [])



    return (
        <View>
            <FlatList
                data={userList}
                key={(item) => { return item.id }}
                renderItem={(item) => renderCarItem(item)}
            />
        </View>
    )
}

export default VehicleListView


