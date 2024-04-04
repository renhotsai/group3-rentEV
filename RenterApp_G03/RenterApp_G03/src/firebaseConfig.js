import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
export const firebaseConfig = {
  apiKey: "AIzaSyAaK8uR8XOK2mE-kpe28b-DIQifi3iWuNU",
  authDomain: "react-native-rental-project.firebaseapp.com",
  projectId: "react-native-rental-project",
  storageBucket: "react-native-rental-project.appspot.com",
  messagingSenderId: "119088695948",
  appId: "1:119088695948:web:8200da0e9ab5acb40b89a9",
}
// initialize firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
