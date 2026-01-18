import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const app=initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));

const db=getFirestore(app);
const auth=getAuth(app);

export {auth,db};