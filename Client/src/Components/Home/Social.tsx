import firebase from "firebase/compat/app";
import { auth } from "../../Config/firebase";
import axios from "axios";

export const SignInWithSM = (provider: firebase.auth.AuthProvider) =>
  new Promise<firebase.auth.UserCredential>(async (resolve, reject) => {
    const result = await auth.signInWithPopup(provider);
    const user: firebase.User | null = result.user;
    console.log(user);
    if (user) {
      console.log(user)
      console.log(user.email);
      try {
        await axios.post("https://chattered.onrender.com/api/auth/register", user);

        console.log(user);
      } catch (err) {
        console.log(err);
      }
      resolve(result);
    }
  });
