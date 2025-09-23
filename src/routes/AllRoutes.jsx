import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, Products } from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};
