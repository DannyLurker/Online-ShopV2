import { useState, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const NavWrapper = lazy(() => import("./components/NavWrapper"));
const HomePage = lazy(() => import("./components/HomePage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavWrapper />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
