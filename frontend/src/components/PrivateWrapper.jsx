import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateWrapper = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

export default PrivateWrapper;
