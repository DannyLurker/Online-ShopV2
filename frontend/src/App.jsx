import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import PrivateWrapper from "./components/PrivateWrapper";
import Spinner from "./components/Spinner";

const NavWrapper = lazy(() => import("./components/NavWrapper"));
const HomePage = lazy(() => import("./components/HomePage"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Product = lazy(() => import("./components/Product"));
const AddProduct = lazy(() => import("./components/AddProduct"));

function App() {
  const [userId, setUserId] = useState(null);
  const [auth, setAuth] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/login`, {
        withCredentials: true,
      });
      setUserId(response.data.userId);
    } catch (e) {
      console.log(`Error: `, e.response?.data || e.message);
      setAuth(false);
    }
  };

  const checkAuth = (userId) => setAuth(userId !== null ? true : false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    checkAuth(userId);
  }, [userId]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<NavWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route element={<PrivateWrapper auth={auth} />}>
                <Route path="/product" element={<Product />} />
                <Route path="/product/add" element={<AddProduct />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
