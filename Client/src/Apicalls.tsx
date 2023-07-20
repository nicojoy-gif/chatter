import axios from "axios";

export const loginCall = async (userCredential: any, dispatch: any) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://chattered.onrender.com/api/auth/login",
      userCredential
    );

    // Assuming the login API returns a user object on successful login
    const user = res.data;

    // Check if the user object is valid, which indicates a successful login
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user; // Return the user object on successful login
    } else {
      throw new Error("Invalid response from the login API");
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    throw err; // Throw the error to be caught in the handleLogin function
  }
};
