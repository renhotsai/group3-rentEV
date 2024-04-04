import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { styles } from "./styles";

const VehicleDetailsView = ({ navigation, route }) => {
  const data = route.params.item;

  const handleEditPress = () => {
    navigation.navigate("EditVehicle", { item: data });
  };

  const renderDetailItem = (label, value) => {
    if (label !== undefined) {
      let outPutValue = value
      if (label === "Availability"){
        console.log(value);
        outPutValue = value ? !value : !value
      }
      return (
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>{label}</Text>
          <Text style={styles.detailValue}>{outPutValue.toString() ? outPutValue.toString
          () : "NA"}</Text>
        </View>
      )
    }
  }

  const renderDetailPair = (label1, value1, label2, value2) => (
    <View style={[styles.detailRow]}>
      {renderDetailItem(label1, value1)}
      {renderDetailItem(label2, value2)}
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FlatList
          data={data.imageUrl}
          style={styles.marginBottom}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.img} />
          )}
        />

        {renderDetailPair(
          "Make",
          data.make + " " + data.model,
          "Trim",
          data.trim
        )}
        {renderDetailPair(
          "Seat Capacity",
          data.seat,
          "License Plate",
          data.licensePlate
        )}
        {renderDetailPair(
          "Availability",
          data.isRent,
          "Price",
          data.price ? "$" + data.price : "NA",
        )}
        {renderDetailPair(
          "Address",
          data.address
        )}

        <Pressable style={[styles.button, styles.topMargin, data.isRent && styles.disabledButton]} disabled={data.isRent} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default VehicleDetailsView;
