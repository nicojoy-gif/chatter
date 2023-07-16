import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import logging from "../../Config/logging";
import {Helmet} from 'react-helmet'
import axios from "axios";
interface LogoutProps {}

const LogoutPage: React.FunctionComponent<LogoutProps> = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/logout");
      if (response.status === 200) {
        // Logout successful
       navigate('/login')
        // Perform any additional actions after logout
      } else {
        // Logout failed
        console.log("Logout failed");
      }
    } catch (error) {
      // Handle error
      console.error("Logout error:", error);
    }
  };

  
  
  return (
    <div>
      <Helmet>
        <title>Account Logout Page </title>
        <meta name="description" content='Welcome to my Logout Page ' />
      </Helmet>
      <section className="grid content-center h-screen justify-center">
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 className="mb-5 text-xl text-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Are you sure you want to logout?
          </h5>
          <div className="mx-auto">
            <button
              type="button"
              className="inline-block rounded bg-red-500 px-6 mx-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => navigate("/dash")}
            >
              Cancel
            </button>
            <button
  type="button"
  className="inline-block rounded bg-blur-500 px-6 mx-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
  data-te-ripple-init
  data-te-ripple-color="light"
  onClick={logout}
>
  Logout
</button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LogoutPage;
