import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8wNaUVCHv_96Qd9mr_wn1qEIAvHhvA4g",
  authDomain: "todo-69066.firebaseapp.com",
  databaseURL: "https://todo-69066-default-rtdb.firebaseio.com",
  projectId: "todo-69066",
  storageBucket: "todo-69066.appspot.com",
  messagingSenderId: "597588928078",
  appId: "1:597588928078:web:952c1441ae38cdae74051f",
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

export { firebase };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
