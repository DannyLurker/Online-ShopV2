import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateWrapper = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;