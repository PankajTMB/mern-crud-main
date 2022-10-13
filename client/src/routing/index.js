import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
import Products from "../views/pages/Products";

export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path=":id" element={<Products />} />
        </Routes>
      </BrowserRouter>
  );
}
