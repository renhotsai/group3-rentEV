import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home'; 
import Reservations from './screens/Reservations';

const Stack = createNativeStackNavigator();

const Root = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={Login} initialParams={{defaultScreen: true }} options={{headerShown: false}}/>   */}
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Reservations" component={Reservations}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Root; 