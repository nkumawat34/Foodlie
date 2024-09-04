import React, { useState } from 'react'
import Menu from '../Assets/menu.jpg'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { add_user } from './UserSlice';
export default function Login() {

    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const signin=()=>{

        axios.post("https://foodlie-backend.onrender.com/api/auth/login",{
            "email": email,
            "password": password
        }).then((data)=>{
           
            dispatch(add_user({name:"",email:email}))
            navigate("/")
            localStorage.setItem('token',data.data.token);
            localStorage.setItem('email',email)
            toast.success("SignUp Successful",{
                position:"bottom-right"
            })
        })
        .catch((err)=>{
            console.log(err)
            toast.error("Error in Signin",{
                position:"bottom-right"
            })
        })

    }
  return (
    <div>

        <div className='flex flex-wrap'>
            <div className='basis-[100%] md:basis-1/2'>
                <img src={Menu}  className='lg-[1000px] w-[100%] sm:h-[100vh]  h-[40vh]'/>
            </div>
            <div className='flex flex-col justify-center md:mt-0 mt-5 ml-[20%] md:ml-0 border-gray-950 basis-1/2 mb-[30px]'>
            <div className='flex justify-center'><IoMdArrowBack size={50} onClick={()=>navigate("/")}/></div>
                <h1 className='text-3xl ml-[30%]'>Welcome to Foodlie</h1>
                <p className='text-grey text-center'>Please login with details here</p>
                <div className='flex  flex-col justify-center items-center mt-4'>
                <label >Email</label>

                <input className='border-2 border-grey-600 rounded-md w-[300px]' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col justify-center items-center mt-4'>
                <label className=''>Password</label>

                <input type="password" className='border-2 border-grey-600 rounded-md w-[300px]' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className='float-right mr-[30%]'>Forgot Password</button>
                </div>
                <div className='flex justify-center mt-3'><button className='bg-red-400 p-2 rounded-md' style={{width:"300px"}} onClick={()=>signin()}>Sign In</button></div>
                <h1 className='text-center mt-3'>Don't have an account?<button className='font-bold ' onClick={()=>navigate("/signup")} >Sign Up </button></h1>
            </div>

        </div>
        <ToastContainer />
    </div>
  )
}
