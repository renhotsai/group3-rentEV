// ProfileView.js
import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { styles } from "./styles";
import { select } from "../Controller/fireDBHelper";
import { auth } from "../firebaseConfig";

const ProfileView = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    select(auth.currentUser.email, "Owners").then((item) => {
      setUser(item.data());
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
        }}
        style={styles.profileImg}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Name:</Text>
        <Text style={styles.detailValue}>{user.name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailValue}>{user.address}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{user.email}</Text>
      </View>
      <View style={[styles.detailContainer, styles.marginBottom]}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{user.phone}</Text>
      </View>

      {/* <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable> */}
    </View>
  );
};

export default ProfileView;
