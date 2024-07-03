import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
      </Routes>
    </>
  );
}

export default UserRouter;
