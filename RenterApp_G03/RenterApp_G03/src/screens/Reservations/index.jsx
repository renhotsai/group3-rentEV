import React from 'react'; 
import { View, Text, StyleSheet, Button } from 'react-native'; 

const Reservations = () => {
    
    return (
        <View style={styles.container}> 
            <Text>This will be the Reservations page</Text>
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

export default Reservations;