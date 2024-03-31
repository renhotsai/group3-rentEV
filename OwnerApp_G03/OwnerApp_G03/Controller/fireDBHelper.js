import {db} from "../firebaseConfig"
import { collection, getDocs, query, where, deleteDoc, updateDoc } from "firebase/firestore";




const add = async (studentToInsert) => {
    try {
        // insert into database
        // Add a new document with a generated id.
        const insertedDocument = await addDoc(collection(db, "students"), studentToInsert);
        // display success message
        console.log("Document written with ID: ", insertedDocument.id);            
        alert(`done! ${insertedDocument.id}`)
    } catch (err) {
        console.log(err)
    }
}


const delDec = async (studentToDelete) =>{
    try {
        await deleteDoc(doc(db,"collection","id"))
    } catch (err) {
        console.log(err);
    }
}


const update = async (studentToUpdate) =>{
    try {
        const docRef = doc(db,"collection","docId")
        await updateDoc(docRef,studentToUpdate)
    } catch (err) {
        console.log(err);
    }
}


const selectAll = async () => {
    // retrieve data from firestore
    try {
        const querySnapshot = await getDocs(collection(db, "students"));
        
        const resultsFromFirestore = []        
        querySnapshot.forEach((doc) => {              
            console.log(doc.id, " => ", doc.data());
            // make the object to add to the array
            const itemToAdd = {
                id: doc.id, 
                ...doc.data()
            }
            // append to array
            resultsFromFirestore.push(itemToAdd)                                                
        });

        console.log("What is in our final array")
        console.log(resultsFromFirestore)

    } catch (err) {
        console.log(err)
    }
}


const btnGetStudentsPressed = async (name) => {
    const q = query(collection(db, "students"), where("name", "==", name));

    try {
        const querySnapshot = await getDocs(q);

        // 1. make temp array for this results
        let temp = []
        querySnapshot.forEach((doc) => {
            temp.push({
                id:doc.id,
                ...doc.data()
            })
        });
        // 2. update the state variable with the contents of the temp array
        setStudentsList(temp)
    } catch(err) {
        console.log(err);
    }
}