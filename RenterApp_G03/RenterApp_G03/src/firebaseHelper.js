import { collection ,getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from "./firebaseConfig"

export const fetchDataFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Orders'));
        const data = [];
        querySnapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        console.log(data);
        return data; 
    } catch (error) {
        console.error('Error getting documents', error);
    }
}