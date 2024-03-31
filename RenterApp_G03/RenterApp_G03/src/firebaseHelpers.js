import { initializeApp } from 'firebase/app'; 
import { firebaseConfig } from './config';
import { firebaseConfig } from './config';
import auth from '@react-native-firebase/auth'; 

const app = initializeApp(firebaseConfig); 


export const signIn = async (email, password) => {
    try {
        const userCredential = await auth().signIn(email, password); 
        // User signed in successfully
        console.log('User signed in:', userCredential.user.uid);
    } catch (error) {
        console.error("Sign-in error: ", error.message); 
    }
};