import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios';
import { CiAirportSign1 } from "react-icons/ci";
export default function Login() {
    const [userDetails,setUserDetails]=useState({
        email:"",
        password:"",
    });
    const navigate=useNavigate();
    const handleSubmit=()=>{
        axios.post('http://localhost:8000/login',userDetails).then((res)=>{
            console.log(res);
            if(res.data=='OK'){
                navigate('/posts');
            }
            else{
                alert("Invalid userName or password");
                window.location.reload();
            }
        })
        
    }
    
  return (
    <div class="flex flex-col items-center justify-center h-screen ">
            <div className='flex flex-row mb-4 font-bold gap-2'>
                <h1 className='text-2xl'>Welcome to Posts</h1>
                <CiAirportSign1  size={40} color='red'/>
            </div>
            <div class="bg-white p-10 rounded-3xl">
                <div className='p-1'>
                    <div className='flex justify-center mb-5'>
                        <h1 className='text-2xl font-bold'>Login Page</h1>
                    </div>
                    <div className='flex flex-row'>
                        <input onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} className='text-center h-7 w-full rounded-xl text-sm border-2 border-black' required="true" name="email" type='email' placeholder='Enter Email'/>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <input onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} className='text-center h-7 w-full rounded-xl text-sm border-2 border-black' required='true' name="password" type='password' placeholder='Enter Password'/>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button onClick={(e)=>handleSubmit(e)} className='bg-[#4ddbff] rounded-xl w-full' type='submit'>Submit</button>
                    </div>
                    <div className='mt-3 flex flex-row text-sm justify-between text-md'>
                        <p>Donot have an account?</p>
                        <Link className='text-[#f34848]' to='/register'>Register</Link>
                    </div>
                </div>
            </div>
    </div>
  )
}
