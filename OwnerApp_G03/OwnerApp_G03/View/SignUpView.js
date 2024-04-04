import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { signup } from "../Controller/fireAuthHelper"
import { auth } from "../firebaseConfig"
import { addUser } from "../Controller/fireDBHelper"


const SignUpView = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")


    const onSignUpClicked = () => {
        // console.log(`email: ${email}, password: ${password}`);
        // console.log(`auth:${JSON.stringify(auth.currentUser)}`);
        signup(email, password)
            .then(() => {
                console.log("User signed up successfully");
                const newUser = {
                    address: address,
                    carList: [],
                    email: email,
                    name: name,
                    orderList: [],
                    phone: phone
                };

                addUser(newUser, "Owners")
                    .then(() => {
                        console.log("User added successfully");
                        props.login(true); // Assuming props.login is a function passed as a prop
                    })
                    .catch(error => {
                        console.error("Error adding user:", error);
                        // Handle error if addUser fails
                    });
            })
            .catch(error => {
                console.error("Error signing up:", error);
                // Handle error if signup fails
            });
    }

    return (
        <View style={styles.container}>
            <Text>SignUpView</Text>
            <TextInput placeholder="email" onChangeText={setEmail} value={email}></TextInput>
            <TextInput placeholder="password" onChangeText={setPassword} value={password}></TextInput>
            <TextInput placeholder="name" onChangeText={setName} value={name}></TextInput>
            <TextInput placeholder="address" onChangeText={setAddress} value={address}></TextInput>
            <TextInput placeholder="phone" onChangeText={setPhone} value={phone}></TextInput>
            <Pressable onPress={onSignUpClicked}>
                <Text>Sign Up</Text>
            </Pressable>
        </View>
    )
}

export default SignUpView


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60
    },
});