import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { FIRESTORE_DB, FIREBASE_AUTH } from "./firebaseConfig"

export const fetchDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Orders"))
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })
    console.log(data)
    return data
  } catch (error) {
    console.error("Error getting documents", error)
  }
}

export const getAllCarData = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Vehicles"))
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })

    return data
  } catch (error) {
    console.error("Error getting documents", error)
  }
}

export const createOrder = async (vehicle) => {
  try {
    // Get the current user's email
    const userEmail = FIREBASE_AUTH.currentUser.email

    const userDocument = await getDoc(doc(FIRESTORE_DB, "Rentals", userEmail))

    const startDate = Date.now()
    const endDate = +new Date("2024-05-15T23:59:59-04:00") // May 15, 2024 at 11:59:59 PM UTC-4
    const randomStartDate = new Date(
      startDate + Math.random() * (endDate - startDate)
    )
    const randomEndDate = new Date(
      randomStartDate.getTime() + Math.random() * (endDate - randomStartDate)
    )

    const docRef = await addDoc(collection(FIRESTORE_DB, "Orders"), {
      startDate: randomStartDate,
      endDate: randomEndDate,
      rental: userEmail,
      vehicle: vehicle.id,
      status: "PENDING",
    })
    console.log("Document written with ID: ", docRef.id)

    // add vehicle id in userDocument to rentals collection's orderList array
    const orderList = userDocument.data().orderList ?? []
    orderList.push(vehicle.id)
    await updateDoc(doc(FIRESTORE_DB, "Rentals", userEmail), {
      orderList: orderList,
    })

    const ownerItem = await getDocs(
      collection(FIRESTORE_DB, "Owners"),
      where("carList", "in", vehicle.id)
    )

    ownerItem.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          orderList: [...doc.data().orderList, docRef.id],
        })
        console.log("Document updated successfully")
      } catch (error) {
        console.error("Error updating document:", error)
      }
    })
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}
