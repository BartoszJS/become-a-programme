// // Import the functions you need from the SDKs you need

// // Import the functions you need from the SDKs you need
// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCnY5IBb_aKT6LgxtxDcMPFq44X0vxc3r4",
//   authDomain: "fir-bap.firebaseapp.com",
//   projectId: "fir-bap",
//   storageBucket: "fir-bap.appspot.com",
//   messagingSenderId: "302554862351",
//   appId: "1:302554862351:web:a2b26426dec4a22770647a",
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();
// const auth = getAuth();

// export default app;
// export { auth, db };

// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAit7bnvLun2tz8PQS-ioN5g0341IeniPg",
  authDomain: "become-a-programmer-39701.firebaseapp.com",
  projectId: "become-a-programmer-39701",
  storageBucket: "become-a-programmer-39701.appspot.com",
  messagingSenderId: "285568736899",
  appId: "1:285568736899:web:9e4c2fdc5a160bf2a505b6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
