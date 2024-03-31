import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 

const Home = () => {
    return (
        <View style={styles.container}> 
            <Text>This will be the search page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Home;
