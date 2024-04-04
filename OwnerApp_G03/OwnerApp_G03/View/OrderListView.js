import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { select } from '../Controller/fireDBHelper'
import { collection, doc, onSnapshot } from 'firebase/firestore'


const OrderListView = ({ navigation, route }) => {

    const renderCarItem = ({ item }) => {
        return (
            <View>
                <Pressable onPress={()=>onDetailPress(item)}>
                    <Text>{item.id}</Text>
                </Pressable>
            </View>
        )
    }

    const onDetailPress = (item) =>{
        navigation.navigate("OrderDetail",{item:item})
    }


    const [orderList, setOrderList] = useState([])

    const [user, setUser] = useState({})
    const [userList, setUserList] = useState([])

    const updateUserList = () => {
        const temp = orderList.filter(order => user.orderList.includes(order.id))
        setUserList(temp)
    }

    useEffect(() => {
        updateUserList()
    }, [orderList, user])

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
            const unsubscribe = onSnapshot(collection(db, "Orders"), (querySnapshot) => {
                const temp = [];
                querySnapshot.forEach((doc) => {
                    const vehicle = {
                        id: doc.id,
                        ...doc.data()
                    }
                    temp.push(vehicle)
                });
                setOrderList(temp)

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

export default OrderListView

