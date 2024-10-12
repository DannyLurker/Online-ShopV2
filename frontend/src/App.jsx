import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavWrapper from "./components/NavWrapper";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavWrapper />}>
            {/* <Route path="/" element={<HomePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
