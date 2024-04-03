import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { select } from '../Controller/fireDBHelper'
import { collection, onSnapshot } from 'firebase/firestore'

const VehicleListView = ({ navigation, route }) => {

    const renderCarItem = ({ item }) => {
        return (
            <View>
                <Text>{item.id}</Text>
                <Text>{item.imageName}</Text>
                <Text>{item.model}</Text>
                <Text>{item.licensePlate}</Text>
                <Text>{item.capacity}</Text>
                <Text>{item.isRent ? "rent" : ""}</Text>
                <Text>{item.price}</Text>
                <Text>{item.address}</Text>
                <Text>{item.brand}</Text>
            </View>
        )
    }

    const [vehicleList, setVehicleList] = useState([])

    const [userList, setUserList] = useState([])

    useEffect(() => {
        select(auth.currentUser.email, "Owners").then((item) => {
            const userLiist = vehicleList.filter(vehicle => item.data().carList.includes(vehicle.id))
            setUserList(userLiist)
        })
    }, [vehicleList])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Vehicles"), (querySnapshot) => {
            const temp = [];
            querySnapshot.forEach((doc) => {
                console.log(`doc:${doc.id}`);
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
    })



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

const styles = StyleSheet.create({

});
