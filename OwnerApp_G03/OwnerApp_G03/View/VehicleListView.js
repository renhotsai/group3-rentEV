import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { } from '../Controller/fireDBHelper'
import { collection, onSnapshot } from 'firebase/firestore'

const VehicleListView = () => {

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

 

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, "Vehicles"), (querySnapshot) => {
            const temp = [];
            querySnapshot.forEach((doc) => {
                const vehicle = {
                    id:doc.id,
                    ...doc.data()
                }
                temp.push(vehicle)
            });
            setVehicleList(temp)
        });

        return()=>{
            unsubscribe()
        }
    },[])

    return (
        <View>
            <FlatList
                data={vehicleList}
                key={(item) => { return item.id }}
                renderItem={(item) => renderCarItem(item)}
            />
        </View>
    )
}

export default VehicleListView

const styles = StyleSheet.create({

});
