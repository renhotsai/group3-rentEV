import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Pressable } from "react-native";
import VehicleListView from "./VehicleListView";
import ProfileView from "./ProfileView";


const HomeView = ({navigation}) => {

    const onAddPress = () => {
        navigation.navigate('Add Vehicle')
    }

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name == "Cars") {
                        return <AntDesign name="car" size={24} color="black" />
                    }
                    if (route.name == "Profile") {
                        return <AntDesign name="profile" size={24} color="black" />
                    }
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Cars" component={VehicleListView} options={{
                headerRight: () => (
                    <Pressable onPress={onAddPress}>
                        <AntDesign name="pluscircleo" size={24} color="black" />
                    </Pressable>
                ),
            }} />
            <Tab.Screen name='Profile' component={ProfileView} />
        </Tab.Navigator>
    )
}


export default HomeView