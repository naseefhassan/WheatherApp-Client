import { ErrorMessage, Field, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Api/axios'
import { useState } from 'react';
import * as Yup from "yup";

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const initialValues = {
        email:'',
        password:''
    }

    const validationSchema = Yup.object({
        email:Yup.string().required('Email is required'),
        password:Yup.string().required('Password is required')

    })

  return ( 
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async(values)=>{
        try {
            const response = await axiosInstance.post('/login',values)
            const token = response.data.token
            localStorage.setItem('Jwt',token)
            console.log(token);
            navigate('/')
        } catch (error) {
            if(error.response &&
                error.response.status === 400){
                    setError('Login Errored')
                }
            console.error(error)
        }
    }}>
        {({values,handleSubmit,handleChange,handleBlur})=>(
           <div className="flex justify-center items-center min-h-screen ">
           <div className="m-1 sm:w-7/12 sm:m-auto sm:flex  sm:h-[420px] shadow-xl rounded-xl ">
           <div className="w-full sm:w-1/2 bg-blue-600 rounded-xl">
            <h1 className="text-center text-3xl text-white font-bold p-4">Looks like you're new here!</h1>
            <h1 className="p-4 text-gray-300 font-mono ">"Get access to your Orders, Wishlist and Recommendations"</h1>
           </div>
           <form onSubmit={handleSubmit} className=" relative sm:w-1/2 flex flex-col gap-5 p-5">
               <h1 className="text-center text-2xl font-bold">LOGIN</h1>

              <div>
              <ErrorMessage name="email" component='div' className="text-[12px] text-red-500 p-1"/>
              <Field type='email' id='email' name='email' values={values.email} onChange={handleChange}  onBlur={handleBlur} placeholder='Email' className='p-1 text-center rounded-md border-2 w-full'></Field>
              </div>

              <div>
              <ErrorMessage name="password" component='div' className="text-[12px] text-red-500 p-1"/>
              <Field type='password' id='password' name='password' values={values.password} onChange={handleChange}  onBlur={handleBlur} placeholder='Password' className='p-1 text-center rounded-md border-2 w-full'></Field>
              </div>

               <button type="submit" className="bg-blue-600 p-1 font-mono rounded-md">Login</button>
               <p className="text-red-500 text-center text-[12px]">{error}</p>
               <p className="text-[12px] text-center ">Are you New to Digital? please  
                   <Link to={'/register/'}><span className="text-red-600 cursor-pointer"> Singup</span></Link>
               </p>
           </form>
           </div>
       </div>
        )}
    </Formik>
  )
}

export default Login