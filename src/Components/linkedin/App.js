import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinkedInApi } from "./config";
import linked from "../../styles/linked.png";

import { NodeServer } from "./config";
const App = () => {
  const initialState = {
    user: {},
    loggedIn: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const code = getCodeFromWindowURL(window.location.href);
      window.opener.postMessage({ type: "code", code }, "*");
      window.close();
    }
    window.addEventListener("message", handlePostMessage);

    return () => {
      window.removeEventListener("message", handlePostMessage);
    };
  }, []);

  const handlePostMessage = (event) => {
    if (event.data.type === "code") {
      const { code } = event.data;
      getUserCredentials(code);
    }
  };

  const getCodeFromWindowURL = (url) => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  const showPopup = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const oauthUrlWithParams = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrlWithParams,
      "Linkedin",
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  const getUserCredentials = (code) => {
    axios
      .get(`${NodeServer.baseURL}${NodeServer.getUserCredentials}?code=${code}`)
      .then((res) => {
        const user = res.data;
        setState({
          user,
          loggedIn: true,
        });
        // Do something with user
      });
  };

  const { loggedIn, user } = state;
  const contentWhenLoggedIn = (
    <>
      <img src={user.profileImageURL} alt="Profile" />
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      <h3>{user.email}</h3>
    </>
  );

  const contentWhenLoggedOut = (
    <>
      <div className="w-6 h-3 absolute top-1/2 transform -translate-y-1/2 left-20">
        <img
          src={linked}
          alt="Sign in with LinkedIn"
          onClick={showPopup}
          className="mt-1"
        />
      </div>
      <button
        className='text-gray-700 w-full py-2 mt-5 bg-white border mx-2 border-gray-300 text-center rounded-md  shadow-sm  focus:outline-none focus:ring"'
        onClick={showPopup}
      >
        Sign in with LinkedIn
      </button>
    </>
  );

  return (
    <div>
      {loggedIn && Object.keys(user).length > 0
        ? contentWhenLoggedIn
        : contentWhenLoggedOut}
    </div>
  );
};

export default App;
