import { useState } from "react";
import { db } from "../firebaseConfig"
import { collection, getDocs, query, where, deleteDoc, updateDoc, addDoc, onSnapshot } from "firebase/firestore";




const add = async (itemToInsert) => {
    try {
        console.log(`start add item. ${JSON.stringify(itemToInsert)}`)

        const insertedDocument = await addDoc(collection(db, "Vehicles"), itemToInsert)
        console.log("Document written with ID: ", insertedDocument.id);
        // display success message

    } catch (err) {
        console.log(err)
    }
}


const delDoc = async (studentToDelete) => {
    try {
        await deleteDoc(doc(db, "collection", "id"))
    } catch (err) {
        console.log(err);
    }
}


const update = async (studentToUpdate) => {
    try {
        const docRef = doc(db, "collection", "docId")
        await updateDoc(docRef, studentToUpdate)
    } catch (err) {
        console.log(err);
    }
}


// const selectAll = async () => {
//     // retrieve data from firestore
//     try {
//         const q = query(collection(db, "Vehicles"))

//         const querySnapshot = await getDocs(q);
//         const temp = []
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//             const item = {
//                 id: doc.id,
//                 ...doc.data()
//             }
//             temp.push(item)
//         });
//         vehicles = temp
//         return temp
//     } catch (err) {
//         console.log(err)
//     }
// }



const select = async (name) => {
    const q = query(collection(db, "students"), where("name", "==", name));

    try {
        const querySnapshot = await getDocs(q);

        // 1. make temp array for this results
        let temp = []
        querySnapshot.forEach((doc) => {
            temp.push({
                id: doc.id,
                ...doc.data()
            })
        });
        // 2. update the state variable with the contents of the temp array
        return temp
    } catch (err) {
        console.log(err);
    }
}

export { add, delDoc, update, select }