import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import { add, select, update } from '../Controller/fireDBHelper';
import { auth } from '../firebaseConfig';

const AddVehicleView = () => {

    const [modelFromUI, setModelFromUI] = useState("");
    const [licensePlateFromUI, setLicensePlateFromUI] = useState("");
    const [capacityFromUI, setCapacityFromUI] = useState("");
    const [priceFromUI, setPriceFromUI] = useState("");
    const [addressFromUI, setAddressFromUI] = useState("");
    const [brandFromUI, setBrandFromUI] = useState("");

    const addVehicle = async () => {
        //Verify
        const newVehicle = {
            model: modelFromUI,
            licensePlate: licensePlateFromUI,
            capacity: capacityFromUI,
            price: priceFromUI,
            address: addressFromUI,
            brand: brandFromUI,
            isRent: false,
        }
        const vehicle = await add(newVehicle, "Vehicles")
        const owner = await select(auth.currentUser.email, "Owners")
        const ownerData = owner.data()
        ownerData.carList.push(vehicle.id)
        
        console.log(`start update...`);

        await update(ownerData,"Owners",owner.id)
    }

    return (
        <View>
            <Text>AddVehicleView</Text>
            <TextInput placeholder='Model' onChangeText={setModelFromUI} value={modelFromUI} />
            <TextInput placeholder='License Plate' onChangeText={setLicensePlateFromUI} value={licensePlateFromUI} />
            <TextInput placeholder='Capacity' onChangeText={setCapacityFromUI} value={capacityFromUI} />
            <TextInput placeholder='Price' onChangeText={setPriceFromUI} value={priceFromUI} />
            <TextInput placeholder='Address' onChangeText={setAddressFromUI} value={addressFromUI} />
            <TextInput placeholder='Brand' onChangeText={setBrandFromUI} value={brandFromUI} />

            <Pressable onPress={addVehicle}>
                <Text>Add</Text>
            </Pressable>
        </View>
    )
}

export default AddVehicleView