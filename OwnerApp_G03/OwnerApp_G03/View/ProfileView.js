import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { styles } from "./styles";
import { select } from "../Controller/fireDBHelper";
import { auth } from "../firebaseConfig";
const ProfileView = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [carLength, setCarLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  useEffect(() => {
    select(auth.currentUser.email, "Owners").then((item) => {
      setUser(item.data());
      if (item.data().carList) {
        setCarLength(item.data().carList.length);
      }
      if (item.data().orderList) {
        setOrderLength(item.data().orderList.length);
      }
    });
  }, []);
  const handleLogout = () => {
    auth.signOut()
    navigation.popToTop()

  };
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
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Number of Cars:</Text>
        <Text style={styles.detailValue}>{carLength}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Number of Orders:</Text>
        <Text style={styles.detailValue}>{orderLength}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{user.phone}</Text>
      </View>
      <Pressable
        style={[styles.button, styles.topMargin]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};
export default ProfileView;