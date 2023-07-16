import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import config from "./config";
import { getFunctions } from "firebase/functions";

const Firebase = firebase.initializeApp(config.firebase);

export const functions = getFunctions(Firebase);
export const Proiders = {
  google: new firebase.auth.GoogleAuthProvider(),
};
export const auth = Firebase.auth();

export default Firebase;
