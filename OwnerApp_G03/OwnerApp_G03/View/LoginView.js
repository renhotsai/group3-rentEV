import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { signin } from "../Controller/fireAuthHelper"
import { useState } from "react"
import SignUpView from "./SignUpView"
import { auth } from "../firebaseConfig"



const LoginView = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLoginClicked = () => {
        signin(email, password).then(() => {
            if (auth.currentUser !== null) {
                props.login(true)
            }

        })
    }
    const onSignUpClicked = () => {
        props.signup(true)
    }

    return (
        <View style={styles.container}>
            <Text>LoginView</Text>
            <TextInput placeholder="Email" onChangeText={setEmail} value={email}></TextInput>
            <TextInput placeholder="Password" onChangeText={setPassword} value={password}></TextInput>
            <Pressable onPress={onLoginClicked}>
                <Text>Login</Text>
            </Pressable>
            <Pressable onPress={onSignUpClicked}>
                <Text>SignUp</Text>
            </Pressable>
        </View>
    );
}

export default LoginView


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60
    },
});