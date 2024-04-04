import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { signin } from "../Controller/fireAuthHelper";
import { auth } from "../firebaseConfig";
import { styles } from "./styles";

const LoginView = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClicked = () => {
    signin(email, password).then(() => {
      if (auth.currentUser !== null) {
        props.changeScreen("Main");
      }
    });
  };

  const onSignUpClicked = () => {
    props.changeScreen("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://withfra.me/android-chrome-512x512.png" }}
        style={styles.headerImg}
        alt="Logo"
      />

      <Text style={styles.title}>Rent EV</Text>
      <Text style={styles.subtitle}>#1 EV Rental platform in Canada</Text>

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
      <Pressable style={styles.button} onPress={onLoginClicked}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonStyleTwo]}
        onPress={onSignUpClicked}
      >
        <Text style={[styles.buttonText, styles.buttonTextStyleTwo]}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginView;
