import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Login from "./screens/Login"
import Home from "./screens/Home"
import Reservations from "./screens/Reservations"
const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

const TopTabsGroup = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reservations" component={Reservations} />
    </Tab.Navigator>
  )
}
const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ defaultScreen: true }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TopTabsGroup}
          options={{
            headerShown: false,
            contentStyle: { paddingTop: 50 }, // Adjust the paddingTop as needed
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root
