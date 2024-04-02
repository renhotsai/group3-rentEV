import { StyleSheet, Text, View } from 'react-native';
import MainView from './View/MainView'
import LoginView from './View/LoginView'
import { useEffect, useState } from 'react';
import SignUpView from './View/SignUpView';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignUp] = useState(false)

  console.log(`isLogin:${isLogin}`)
  console.log(`isSignup${isSignup}`);
  return (
      <NavigationContainer>
        {
          isLogin ? (<MainView />) :
            isSignup ? (<SignUpView login={setIsLogin} />) :
              (<LoginView signup={setIsSignUp} login={setIsLogin} />)
        }
      </NavigationContainer>
  )
}

export default App

