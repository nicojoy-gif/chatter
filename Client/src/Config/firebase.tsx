import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {FirebaseApp, getApps, initializeApp} from 'firebase/app'
import "firebase/compat/firestore";
import config from "./config";
import { getFunctions } from "firebase/functions";

export const Firebase = firebase.initializeApp(config.firebase);

let firebaseApp;
firebaseApp = getApps().length === 0 ? initializeApp(config.firebase) : getApps()[0]

 export const functions = getFunctions(Firebase);
export const Proiders = {
  google: new firebase.auth.GoogleAuthProvider(),
};
export const auth = Firebase.auth();

export default firebaseApp as FirebaseApp;
