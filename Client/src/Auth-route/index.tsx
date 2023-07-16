import React from "react";
import { auth } from "../Config/firebase";
import { Navigate } from "react-router-dom";
import logging from "../Config/logging";
interface AuthRouteProps {
  children: string;
}

const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
  const { children } = props;

  if (!auth.currentUser) {
    logging.warn("No user detected, redirecting");
    return <Navigate to="/login" />;
  }
  if (auth.currentUser) {
    return <div>{children}</div>;
  }
  return null;
};

export default AuthRoute;
