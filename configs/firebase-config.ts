// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "short-vid-gen-74fde.firebaseapp.com",
  projectId: "short-vid-gen-74fde",
  storageBucket: "short-vid-gen-74fde.appspot.com",
  messagingSenderId: "308878296398",
  appId: "1:308878296398:web:9e9bbd07c649cb6f920a1f",
  measurementId: "G-924BQYHX7K"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const storage = getStorage(app);
export const FILE_PATH = "short-vid-gen-files";

export const fileUpload = (fileName: string) => {
    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, `${FILE_PATH}/${fileName}`);
}