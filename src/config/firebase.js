import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig=initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));

const db=getFirestore(firebaseConfig);

export {db};