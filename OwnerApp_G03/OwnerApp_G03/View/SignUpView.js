import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { signup } from "../Controller/fireAuthHelper";
import { addUser } from "../Controller/fireDBHelper";
import { auth } from "../firebaseConfig";
import { styles } from "./styles";

const SignUpView = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    
    const onCancelClicked = () => {
            props.changeScreen("Login");

    }

  const onSignUpClicked = () => {
    signup(email, password)
      .then(() => {
        const newUser = {
          address: address,
          carList: [],
          email: email,
          name: name,
          orderList: [],
          phone: phone,
        };

        addUser(newUser, "Owners")
          .then(() => {
            props.login(true);
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={setAddress}
        value={address}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={setPhone}
        value={phone}
      />
      <Pressable style={styles.button} onPress={onSignUpClicked}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonStyleTwo]}
        onPress={onCancelClicked}
      >
        <Text style={[styles.buttonText, styles.buttonTextStyleTwo]}>
          Cancel
        </Text>
          </Pressable>
          
    </View>
  );
};

export default SignUpView;
