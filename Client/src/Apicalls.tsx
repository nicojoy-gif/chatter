import axios from "axios";

export const loginCall = async (userCredential: any, dispatch: any) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://chattered.onrender.com/api/auth/login",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
