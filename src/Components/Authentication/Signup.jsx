/* eslint-disable react/no-unescaped-entities */
import { ErrorMessage, Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axios";
import * as Yup from "yup";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [error ,setError] = useState('')

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
  });

 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const response = await axiosInstance.post("/signup", values);
          const token = response.data.token
          localStorage.setItem('Jwt',token)
          navigate("/");
          resetForm();
        } catch (error) {
          console.error("There was an error signing up!", error);
          if (error.response && error.response.status === 400) {
            setError("Signup Error");
          }
        }
      }}
    >
      {({
        values,
        handleChange: formikHandleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-7/12 m-auto sm:flex sm:h-[420px] shadow-xl rounded-xl">
            <div className="sm:w-1/2 bg-blue-600 rounded-xl">
              <h1 className="text-center text-3xl text-white font-bold p-4">
                Looks like you're new here!
              </h1>
              <h1 className="p-4 text-gray-300 font-serif">
                "Welcome! The first step is often the hardest, but you've made
                it. We're here to support you every step of the way."
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative sm:w-1/2 flex flex-col gap-5 p-5"
            >
              <h1 className="text-center text-2xl font-bold">SIGNUP</h1>
              <div>
                <ErrorMessage
                  name="username"
                  component="p"
                  className=" text-red-500 text-[12px] p-1"
                />
                <Field
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={(e) => {
                    formikHandleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="Username"
                  className="p-1 text-center rounded-md border-2 w-full"
                />
              </div>

              <div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className=" text-red-500 text-[12px] p-1"
                />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    formikHandleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="Email"
                  className="p-1 text-center rounded-md border-2 w-full"
                />
              </div>

              <div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className=" text-red-500 text-[12px] p-1"
                />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={(e) => {
                    formikHandleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className="p-1 text-center rounded-md border-2 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 p-1 font-mono rounded-md"
              >
                Signup
              </button>
              <p className="text-red-500 text-center text-[12px]">{error}</p>
              <p className="text-[12px] text-center">
                If you already have an account, please
                <Link to={"/register/login"}>
                  <span className="text-red-600 cursor-pointer"> Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Signup;
