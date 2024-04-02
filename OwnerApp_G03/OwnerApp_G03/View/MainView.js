import { StyleSheet, Text, View, } from 'react-native'
import React, { Component } from 'react'
import VehicleListView from './VehicleListView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import AddVehicleView from './AddVehicleView';
import ProfileView from './ProfileView';

const Tab = createBottomTabNavigator();


const MainView = () => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name == "Cars") {
                            return <AntDesign name="car" size={24} color="black" />
                        }
                        if (route.name == "Add") {
                            return <AntDesign name="pluscircleo" size={24} color="black" />
                        }
                        if (route.name == "Profile") {
                            return <AntDesign name="profile" size={24} color="black" />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Cars" component={VehicleListView} />
                <Tab.Screen name="Add" component={AddVehicleView} />
                <Tab.Screen name='Profile' component={ProfileView} />
            </Tab.Navigator>
    );
}

export default MainView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
