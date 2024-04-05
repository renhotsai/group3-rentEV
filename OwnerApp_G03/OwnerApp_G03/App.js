import { StyleSheet, Text, View } from 'react-native';
import MainView from './View/MainView'
import LoginView from './View/LoginView'
import { useEffect, useState } from 'react';
import SignUpView from './View/SignUpView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig';
import AddVehicleView from './View/AddVehicleView';
import VehicleDetailsView from './View/VehicleDetailsView';
import EditVehicleView from './View/EditVehicleView';
import OrderDetailView from './View/OrderDetailView';


const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Group>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="SignUp" component={SignUpView}
            options={{ headerShown: false }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="Main"
            component={MainView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddVehicle"
            component={AddVehicleView}
            options={{ title: "Add Vehicle" }}
          />
          <Stack.Screen
            name="VehicleDetails"
            component={VehicleDetailsView}
            options={{ title: "Car Details" }}
          />
          <Stack.Screen
            name="EditVehicle"
            component={EditVehicleView}
            options={{ title: "Edit Vehicle" }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetailView}
            options={{ title: "Order Detail" }}
          />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

