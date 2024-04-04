import { Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { select } from '../Controller/fireDBHelper'
import { auth } from '../firebaseConfig'

const ProfileView = () => {

const [user,setUser] = useState({})

useEffect(()=>{
  select(auth.currentUser.email, "Owners").then((item)=>{
    setUser(item.data())
  })
},[])

  return (
    <View>
        <Text>{user.name}</Text>
        <Text>{user.address}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
    </View>
  )
}

export default ProfileView