import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCuqufFnpfbgPCW8EzvOW5cQHRNRHU22yk",
    authDomain: "audiomeet-267e9.firebaseapp.com",
    databaseURL: "https://audiomeet-267e9-default-rtdb.firebaseio.com",
    projectId: "audiomeet-267e9",
    storageBucket: "audiomeet-267e9.appspot.com",
    messagingSenderId: "827192635073",
    appId: "1:827192635073:web:0282b0450c3e68215f6e40",
    measurementId: "G-X6YSM6D7CW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export const auth = firebaseApp.auth()
export default firebaseApp;

 //la auth es auth(), la database es firestore()
