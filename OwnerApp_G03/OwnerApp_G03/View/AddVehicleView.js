import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { add, select, update } from '../Controller/fireDBHelper';
import { auth } from '../firebaseConfig';
import RNPickerSelect from 'react-native-picker-select'

const AddVehicleView = ({ navigation, route }) => {

    // for new Vehicle
    const [makeFromUI, setMakeFromUI] = useState("")
    const [modelFromUI, setModelFromUI] = useState("");
    const [trimFromUI, setTrimFromUI] = useState("");
    const [seatFromUI, setSeatFromUI] = useState("");
    const [licensePlateFromUI, setLicensePlateFromUI] = useState("");
    const [capacityFromUI, setCapacityFromUI] = useState("");
    const [priceFromUI, setPriceFromUI] = useState("");
    const [addressFromUI, setAddressFromUI] = useState("");
    const [brandFromUI, setBrandFromUI] = useState("");

    // option array
    const [apiData, setApiData] = useState([])
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [trims, setTrims] = useState([])
    const [seats, setSeats] = useState([])
    
    // option default
    const [defaultMake, setDefaultMake] = useState("")
    const [defaultModel,setDefaultModel] = useState("")
    const [defaultTrim,setDefaultTrim] = useState("")
    const [defaultSeat,setDefaultSeat] = useState("")
    
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
        setDefaultModel("")
        console.log(`make data change ${makeFromUI}`);
        const data = []
        apiData.forEach(item => {
            if (item.make === makeFromUI) {
                // console.log(item.model);
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
        setDefaultTrim("")
        console.log(`model data change`);
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
    }, [modelFromUI])
    
    
    useEffect(() => {
        setDefaultSeat("")
        console.log(`trim data change`);
        const data = []
        apiData.forEach(item => {
            if (item.make === makeFromUI && item.model === modelFromUI && item.trim === trimFromUI) {
                data.push(item)
            }
        })

        const list = []
        data.forEach(item => {
            if (item.seats_min !== null) {
                // console.log(item.seats_min);
                list.push(item.seats_min.toString())
            }
            if (item.seats_max !== null) {
                // console.log(item.seats_max);
                list.push(item.seats_max.toString())
            }
        })

        const temp = list.filter((item, index) => {
            const firstIndex = list.findIndex(obj => obj === item);
            return index === firstIndex;
        })

        console.log(`seat temp:${JSON.stringify(temp)}`);
        setSeats(makePickers(temp))
    }, [trimFromUI])


    const vehicleDataFromAPI = () => {
        const apiURL = 'https://renhotsai.github.io/Vehicles/'
        fetch(apiURL).then((response) => {
            //console.log(`response: ${JSON.stringify(response)}`);
            if (response.ok) {
                const jsonData = response.json()
                return jsonData
            } else {
                console.error(`Unsuccessful response from server. Status code: ${response.status}`);
            }
        })
            .then((apiData) => {
                if (apiData !== undefined) {
                    // console.log(`json data from API is available: ${JSON.stringify(apiData)}`);
                    setApiData(apiData)
                } else {
                    // console.log(`no data from API`);
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
            brand: brandFromUI,
            isRent: false,
        }
        const vehicle = await add(newVehicle, "Vehicles")
        const owner = await select(auth.currentUser.email, "Owners")
        const ownerData = owner.data()
        ownerData.carList.push(vehicle.id)

        // console.log(`start update...`);

        await update(ownerData, "Owners", owner.id)
        Alert.alert("Success!")
        navigation.navigate('Main')
    }

    return (
        <View>
            <RNPickerSelect

                value={ defaultMake !== ""  ? defaultMake : makes.length > 0 ? makes[0].value : "" }
                onValueChange={(value)=>{
                  setMakeFromUI(value)
                  setDefaultMake(value)  
                }}
                items={makes}
            />
            <RNPickerSelect
                value={ defaultModel !== "" ? defaultModel : models.length > 0 ? models[0].value : ""}
                onValueChange={setModelFromUI}
                items={models}
            />
            <RNPickerSelect
                value={ defaultTrim !== "" ? defaultTrim : trims.length > 0 ? trims[0].value : ""}
                onValueChange={setTrimFromUI}
                items={trims}
            />
            <RNPickerSelect
                value={defaultSeat !== "" ? defaultSeat : seats.length > 0 ? seats[0].value : ""}
                onValueChange={setSeatFromUI}
                items={seats}
            />

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