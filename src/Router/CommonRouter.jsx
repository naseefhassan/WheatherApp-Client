import { Route, Routes } from "react-router-dom";
import Signup from "../Components/Authentication/Signup";
import Login from "../Components/Authentication/Login";

function CommonRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </>
  );
}

export default CommonRouter;
