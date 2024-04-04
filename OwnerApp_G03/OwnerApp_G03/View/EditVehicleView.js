import { Alert, Pressable, Text, TextInput, View, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { add, select, update } from '../Controller/fireDBHelper';
import { auth, db } from '../firebaseConfig';
import RNPickerSelect from 'react-native-picker-select'
import { doc, setDoc } from 'firebase/firestore'
import { styles } from './styles';
import { pickerArrow } from './pickerArrow';

const EditVehicleView = ({ navigation, route }) => {
  const data = route.params.item;
  // for new Vehicle
  const [makeFromUI, setMakeFromUI] = useState("");
  const [modelFromUI, setModelFromUI] = useState("");
  const [trimFromUI, setTrimFromUI] = useState("");
  const [seatFromUI, setSeatFromUI] = useState(data.seat);
  const [licensePlateFromUI, setLicensePlateFromUI] = useState(
    data.licensePlate
  );
  const [capacityFromUI, setCapacityFromUI] = useState(data.capacity);
  const [priceFromUI, setPriceFromUI] = useState(data.price);
  const [addressFromUI, setAddressFromUI] = useState(data.address);
  const [imageUrlFromUI, setImageUrlFromUI] = useState([]);

  // option array
  const [apiData, setApiData] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);

  // option default
  const [defaultMake, setDefaultMake] = useState(route.params.item.make);
  const [defaultModel, setDefaultModel] = useState(route.params.item.model);
  const [defaultTrim, setDefaultTrim] = useState(route.params.item.trim);

  const makePickers = (items) => {
    const temp = [];
    items.forEach((item) => {
      const pickerOption = {
        label: item,
        value: item,
      };
      temp.push(pickerOption);
    });
    return temp;
  };

  useEffect(() => {
    const temp = apiData.filter((item, index) => {
      const firstIndex = apiData.findIndex((obj) => obj.make === item.make);
      return index === firstIndex;
    });
    const list = [];
    temp.forEach((item) => {
      list.push(item.make);
    });
    setMakes(makePickers(list));
  }, [apiData]);

  useEffect(() => {
    // setDefaultModel("")
    const data = [];
    apiData.forEach((item) => {
      if (item.make === makeFromUI) {
        data.push(item);
      }
    });

    const temp = data.filter((item, index) => {
      const firstIndex = data.findIndex((obj) => obj.model === item.model);
      return index === firstIndex;
    });
    const list = [];
    temp.forEach((item) => {
      list.push(item.model);
    });
    setModels(makePickers(list));
  }, [makeFromUI]);

  useEffect(() => {
    // setDefaultTrim("")
    const data = [];
    apiData.forEach((item) => {
      if (item.make === makeFromUI && item.model === modelFromUI) {
        data.push(item);
      }
    });

    const temp = data.filter((item, index) => {
      const firstIndex = data.findIndex((obj) => obj.trim === item.trim);
      return index === firstIndex;
    });
    const list = [];
    temp.forEach((item) => {
      list.push(item.trim);
    });
    setTrims(makePickers(list));
    if (temp[0] !== undefined) {
      console.log(`${JSON.stringify(temp[0])}`);
      const temp2 = [];
      temp[0].images.forEach((item) => {
        temp2.push(item.url_thumbnail);
      });
      setImageUrlFromUI(temp2);
    }
  }, [modelFromUI]);

  const vehicleDataFromAPI = () => {
    const apiURL = "https://renhotsai.github.io/Vehicles/";
    fetch(apiURL)
      .then((response) => {
        if (response.ok) {
          const jsonData = response.json();
          return jsonData;
        } else {
          console.error(
            `Unsuccessful response from server. Status code: ${response.status}`
          );
        }
      })
      .then((apiData) => {
        if (apiData !== undefined) {
          setApiData(apiData);
        }
      })
      .catch((err) => {
        console.error(`error: ${err}`);
      });
  };

  useEffect(() => {
    vehicleDataFromAPI();
  }, []);

    const editVehicle = async () => {
      // Input validation
      if (
        !makeFromUI ||
        !modelFromUI ||
        !trimFromUI ||
        !seatFromUI ||
        !licensePlateFromUI ||
        !capacityFromUI ||
        !priceFromUI ||
        !addressFromUI
      ) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      //Verify
      const updateVehicle = {
        make: makeFromUI,
        model: modelFromUI,
        trim: trimFromUI,
        seat: seatFromUI,
        licensePlate: licensePlateFromUI,
        capacity: capacityFromUI,
        price: priceFromUI,
        address: addressFromUI,
        isRent: false,
        imageUrl: imageUrlFromUI,
      };
      try {
        await setDoc(doc(db, "Vehicles", data.id), updateVehicle);
        Alert.alert("Success!");
        navigation.navigate("Main");
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={imageUrlFromUI}
            style={styles.marginBottom}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.img} />
            )}
          />

          <Text style={styles.label}>Make</Text>
          <RNPickerSelect
            value={
              defaultMake !== ""
                ? defaultMake
                : makes.length > 0
                ? makes[0].value
                : ""
            }
            onValueChange={(value) => {
              setMakeFromUI(value);
              setDefaultMake(value);
            }}
            items={makes}
            style={{
              inputIOS: {
                ...styles.input,
                ...styles.pickerStyle,
              },
              iconContainer: {
                ...styles.pickerContainer,
              },
            }}
            Icon={pickerArrow}
          />
          <Text style={styles.label}>Model</Text>
          <RNPickerSelect
            value={
              defaultModel !== ""
                ? defaultModel
                : models.length > 0
                ? models[0].value
                : ""
            }
            onValueChange={(value) => {
              setModelFromUI(value);
              setDefaultModel(value);
            }}
            items={models}
            style={{
              inputIOS: {
                ...styles.input,
                ...styles.pickerStyle,
              },
              iconContainer: {
                ...styles.pickerContainer,
              },
            }}
            Icon={pickerArrow}
          />
          <Text style={styles.label}>Trim</Text>
          <RNPickerSelect
            value={
              defaultTrim !== ""
                ? defaultTrim
                : trims.length > 0
                ? trims[0].value
                : ""
            }
            onValueChange={(value) => {
              setTrimFromUI(value);
              setDefaultTrim(value);
            }}
            items={trims}
            style={{
              inputIOS: {
                ...styles.input,
                ...styles.pickerStyle,
              },
              iconContainer: {
                ...styles.pickerContainer,
              },
            }}
            Icon={pickerArrow}
          />

          <Text style={styles.label}>Seats</Text>
          <TextInput
            placeholder="Seats"
            onChangeText={setSeatFromUI}
            value={seatFromUI.toString()}
            style={styles.input}
          />
          <Text style={styles.label}>License Plate</Text>
          <TextInput
            placeholder="License Plate"
            onChangeText={setLicensePlateFromUI}
            value={licensePlateFromUI}
            style={styles.input}
          />
          <Text style={styles.label}>Capacity</Text>
          <TextInput
            placeholder="Capacity"
            onChangeText={setCapacityFromUI}
            value={capacityFromUI}
            style={styles.input}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="Price"
            onChangeText={setPriceFromUI}
            value={priceFromUI}
            style={styles.input}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Address"
            onChangeText={setAddressFromUI}
            value={addressFromUI}
            style={[styles.input, styles.marginBottom]}
          />

          <Pressable style={styles.button} onPress={editVehicle}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
};

export default EditVehicleView

