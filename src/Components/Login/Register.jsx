/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { backendURL } from '../../../config';
import './Login.css'
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
    })

    const [loggedIn,setLoggedIn] = useState(false)

const handleChange = (e) =>{
  const {name,value} = e.target;
   setData({...data, [name] : value});
}


const handleSubmit = async(e) =>{
    e.preventDefault();
   const response=await fetch(`${backendURL}/register`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
        "Content-Type": "application/json"
    }
   })
   const res=await response.json();
   if(response.status=== 409){
    //   alert("User already registered")
    toast.error("User already exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }   else{
        //   alert("Registered successfully")
        toast.success('Login Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
       sessionStorage.setItem("user", JSON.stringify(res));
        setLoggedIn(true);
      }
   setData({
    name:'',
    email:'',
    password:'',
   })
}
  
if(sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))){
    return <Navigate to={"/"} replace />
}
    return (
        <div>
        <div style={{
            height:'400px',
            width:'350px',
            backgroundColor:'#242424',
            border:'none',
            borderRadius:'10px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            flexWrap:'wrap',
            color:'white'
        }}> 
          <form onSubmit={handleSubmit}>
          <input type="name" name="name" value={data.name} onChange={handleChange} placeholder='Enter your Name'/> <br />

            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder='Enter your email'/> <br />
         <input type="password" name="password" value={data.password} onChange={handleChange} placeholder='Enter your Password' />
         <button className='btn'>Submit</button>
          </form>
          <Link to='/login'>SignIn</Link>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        </div>
    )
}

export default Register;