import { AntDesign } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Pressable } from "react-native"
import VehicleListView from "./VehicleListView"
import ProfileView from "./ProfileView"
import { FontAwesome5 } from "@expo/vector-icons"
import OrderListView from "./OrderListView"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"
import { auth, db } from "../firebaseConfig"
import { select } from "../Controller/fireDBHelper"

const MainView = ({ navigation }) => {
  const onAddPress = () => {
    navigation.navigate("AddVehicle")
  }

  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Cars") {
            return <AntDesign name="car" size={24} color="black" />
          }
          if (route.name == "Profile") {
            return <AntDesign name="profile" size={24} color="black" />
          }
          if (route.name == "Order") {
            return <FontAwesome5 name="list" size={24} color="black" />
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Order" component={OrderListView} />
      <Tab.Screen
        name="Cars"
        component={VehicleListView}
        options={{
          headerRight: () => (
            <Pressable onPress={onAddPress}>
              <AntDesign
                name="pluscircleo"
                style={{ paddingRight: 16 }}
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      {/* <Tab.Screen name="Profile" component={ProfileView} /> */}
      
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        initialParams={{ changeScreen: null }} // Initialize changeScreen prop
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            // Pass the changeScreen function to ProfileView when tab is pressed
            navigation.setParams({ changeScreen: navigation.changeScreen });
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default MainView
