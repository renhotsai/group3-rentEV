import { StyleSheet, Text, View } from 'react-native';
import MainView from './View/MainView'
import LoginView from './View/LoginView'
import { useEffect, useState } from 'react';
import SignUpView from './View/SignUpView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const [screen, setScreen] = useState("Login")
  return (
    <NavigationContainer>

      {(() => {
        switch (screen) {
          case "Login":
            return <LoginView changeScreen={setScreen} />;
          case "SignUp":
            return <SignUpView changeScreen={setScreen} />;
          case "Main":
            return <MainView />;
          default:
            return null; // Or render a default component if needed
        }
      })()}
    </NavigationContainer>
  )
}

export default App

