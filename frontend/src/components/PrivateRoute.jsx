import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { authUser } = useSelector((state) => state.user);
  // If the user is authenticated, render the element
  return authUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
