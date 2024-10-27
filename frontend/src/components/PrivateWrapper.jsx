import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateWrapper = ({ auth }) => {
  const authenticate = auth;
  console.log(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticate) {
      navigate("/login");
    }
  }, [auth]);

  return auth ? <Outlet /> : null;
};

export default PrivateWrapper;
