import { Alert, Pressable, Text, TextInput, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { add, select, update } from '../Controller/fireDBHelper';
import { auth } from '../firebaseConfig';
import RNPickerSelect from 'react-native-picker-select'

const EditVehicleView = ({ navigation, route }) => {

    // for new Vehicle
    const [makeFromUI, setMakeFromUI] = useState("")
    const [modelFromUI, setModelFromUI] = useState("");
    const [trimFromUI, setTrimFromUI] = useState("");
    const [seatFromUI, setSeatFromUI] = useState("");
    const [licensePlateFromUI, setLicensePlateFromUI] = useState("");
    const [capacityFromUI, setCapacityFromUI] = useState("");
    const [priceFromUI, setPriceFromUI] = useState("");
    const [addressFromUI, setAddressFromUI] = useState("");

    // option array
    const [apiData, setApiData] = useState([])
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [trims, setTrims] = useState([])

    // option default
    const [defaultMake, setDefaultMake] = useState(route.params.item.make)
    const [defaultModel, setDefaultModel] = useState(route.params.item.model)
    const [defaultTrim, setDefaultTrim] = useState(route.params.item.trim)

    const makePickers = (items) => {
        const temp = []
        items.forEach(item => {
            const pickerOption = {
                label: item,
                value: item,
            }
            temp.push(pickerOption)
        });
        return temp;
    }



    useEffect(() => {
        const temp = apiData.filter((item, index) => {
            const firstIndex = apiData.findIndex(obj => obj.make === item.make);
            return index === firstIndex;
        })
        const list = []
        temp.forEach(item => {
            list.push(item.make)
        });
        setMakes(makePickers(list))
    }, [apiData])



    useEffect(() => {
        // setDefaultModel("")
        const data = []
        apiData.forEach(item => {
            if (item.make === makeFromUI) {
                data.push(item)
            }
        })

        const temp = data.filter((item, index) => {
            const firstIndex = data.findIndex(obj => obj.model === item.model);
            return index === firstIndex;
        })
        const list = []
        temp.forEach(item => {
            list.push(item.model)
        });
        setModels(makePickers(list))
    }, [makeFromUI])


    useEffect(() => {
        // setDefaultTrim("")
        const data = []
        apiData.forEach(item => {
            if (item.make === makeFromUI && item.model === modelFromUI) {
                data.push(item)
            }
        })

        const temp = data.filter((item, index) => {
            const firstIndex = data.findIndex(obj => obj.trim === item.trim);
            return index === firstIndex;
        })
        const list = []
        temp.forEach(item => {
            list.push(item.trim)
        })
        setTrims(makePickers(list))
        if (temp[0] !== undefined) {
            setSeatFromUI(temp[0].seats_min.toString())
        }
    }, [modelFromUI])


    const vehicleDataFromAPI = () => {
        const apiURL = 'https://renhotsai.github.io/Vehicles/'
        fetch(apiURL).then((response) => {
            if (response.ok) {
                const jsonData = response.json()
                return jsonData
            } else {
                console.error(`Unsuccessful response from server. Status code: ${response.status}`);
            }
        })
            .then((apiData) => {
                if (apiData !== undefined) {
                    setApiData(apiData)
                }
            })
            .catch((err) => {
                console.error(`error: ${err}`);
            })
    }

    useEffect(() => {
        vehicleDataFromAPI()
    }, [])

    const addVehicle = async () => {
        //Verify
        const newVehicle = {
            make: makeFromUI,
            model: modelFromUI,
            trim: trimFromUI,
            seat: seatFromUI,
            licensePlate: licensePlateFromUI,
            capacity: capacityFromUI,
            price: priceFromUI,
            address: addressFromUI,
            isRent: false,
        }
        const vehicle = await add(newVehicle, "Vehicles")
        const owner = await select(auth.currentUser.email, "Owners")
        const ownerData = owner.data()
        ownerData.carList.push(vehicle.id)


        await update(ownerData, "Owners", owner.id)
        Alert.alert("Success!")
        navigation.navigate('Main')
    }

    return (
        <View>
            <RNPickerSelect
                value={defaultMake !== "" ? defaultMake : makes.length > 0 ? makes[0].value : ""}
                onValueChange={(value) => {
                    setMakeFromUI(value)
                    setDefaultMake(value)
                }}
                items={makes}
            />
            <RNPickerSelect
                value={defaultModel !== "" ? defaultModel : models.length > 0 ? models[0].value : ""}
                onValueChange={(value) => {
                    setModelFromUI(value)
                    setDefaultModel(value)
                }}
                items={models}
            />
            <RNPickerSelect
                value={defaultTrim !== "" ? defaultTrim : trims.length > 0 ? trims[0].value : ""}
                onValueChange={(value) => {
                    setTrimFromUI(value)
                    setDefaultTrim(value)
                }}
                items={trims}
            />

            <TextInput placeholder='seats' onChangeText={setSeatFromUI} value={seatFromUI} />
            <TextInput placeholder='License Plate' onChangeText={setLicensePlateFromUI} value={licensePlateFromUI} />
            <TextInput placeholder='Capacity' onChangeText={setCapacityFromUI} value={capacityFromUI} />
            <TextInput placeholder='Price' onChangeText={setPriceFromUI} value={priceFromUI} />
            <TextInput placeholder='Address' onChangeText={setAddressFromUI} value={addressFromUI} />



            <Pressable onPress={addVehicle}>
                <Text>Edit</Text>
            </Pressable>
        </View>
    )
}

export default EditVehicleView

const styles = StyleSheet.create({})