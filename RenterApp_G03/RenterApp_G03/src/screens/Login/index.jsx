import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false); 
    const auth = FIREBASE_AUTH; 

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, form.email, form.password);;       
            // will add navigation
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            alert("Sign in failed: " + error.message); 
        } finally {
            setLoading(false); 
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: 'https://withfra.me/android-chrome-512x512.png' }}
                        style={styles.headerImg}
                        alt="Logo"
                    />
                    <Text style={styles.title}>Rent EV</Text>                       
                    <Text style={styles.subtitle}>
                        #1 Renting EV platform in Canada
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email address</Text>

                        <TextInput 
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            style={styles.inputControl}
                            placeholder="john@example.com"
                            placeholderTextColor="#6b7280"
                            value={form.email}
                            onChangeText={email => setForm({...form, email })}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <TextInput 
                            style={styles.inputControl}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            value={form.password}
                            onChangeText={password => setForm({...form, password })}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={signIn}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 24, 
        flex: 1, 
    }, 
    header: {
        marginVertical: 36, 
    }, 
    headerImg: {
        width: 80, 
        height: 80, 
        alignSelf: 'center', 
    },
    title: {
        fontSize: 27, 
        fontWeight: '700',
        color: '#1e1e1e',
        marginBottom: 6, 
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15, 
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center'
    },
    input: {
        marginBottom: 16, 
    },
    inputLabel: {
        fontSize: 17, 
        fontWeight: '600',
        color: '#222',
        marginBottom: 8
    },
    inputControl: {
        height: 44, 
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12, 
        fontSize: 15, 
        fontWeight: '500',
        color: '#222'
    },
    form: {
        marginBottom: 24,
        flex: 1 
    },
    formAction: {
        marginVertical: 24
    },
    btn: {
        backgroundColor: '#075eec', 
        borderRadius: 8,
        borderWidth: 1, 
        borderColor: '#075eec',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, 
    },
    btnText: {
        fontSize: 18, 
        fontWeight: '600',
        color: '#fff'
    }
})

export default Login; 