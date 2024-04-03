import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { select } from '../Controller/fireDBHelper'
import { collection, doc, onSnapshot } from 'firebase/firestore'

const VehicleListView = ({ navigation, route }) => {

    const renderCarItem = ({ item }) => {
        return (
            <View>
                <Pressable onPress={()=>onDetailPress(item)}>
                    <Text>{item.make} {item.model} {item.trim}</Text>
                    <Text>Seats: {item.seat}</Text>
                    <Text>{item.imageName}</Text>
                    <Text>{item.licensePlate}</Text>
                    <Text>{item.capacity}</Text>
                    <Text>{item.isRent ? "rent" : ""}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.address}</Text>
                </Pressable>
            </View>
        )
    }

    const onDetailPress = (item) =>{

        navigation.navigate("EditVehicle",{item:item})
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
            const unsubscribe = onSnapshot(doc(db, "Owners", auth.currentUser.email), { includeMetadataChanges: true }, (doc) => {
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

const styles = StyleSheet.create({

});
