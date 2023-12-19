import { useState } from 'react';
import { backendURL } from '../../../config';
import './Login.css'
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
    const [data,setData] = useState({
        email:'',
        password:'',
    })

    // eslint-disable-next-line no-unused-vars
    const [loggedIn,setLoggedIn] = useState(false);

const handleChange = (e) =>{
  const {name,value} = e.target;
   setData({...data, [name] : value});
}
 


const handleSubmit = async(e) =>{
    e.preventDefault();
   const response=await fetch(`${backendURL}/login`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
        "Content-Type": "application/json"
    }
   })
   const res=await response.json();
   if(response.status === 401){
    //  alert("Password Invalid")
    toast.error("Password Invalid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
} else if( response.status === 403){
    // alert("Please Register")
    toast.error("Please Register ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
} else {

     alert("Login Successfully")
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
  //  console.log(res);
   setData({
    email:'',
    password:'',
   })
}
if(sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')) && loggedIn) {

    return <Navigate to={'/'} replace />;
  }

    return (
        <div>
        <div style={{
            height:'400px',
            width:'350px',
            backgroundColor:'#242424',
            border:'1px solid ',
            borderRadius:'10px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            flexWrap:'wrap',
            color:'white'
        }}> 
          <form onSubmit={handleSubmit}>
        
            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder='Enter your Email'/> <br />
       
            <input type="password" name="password" value={data.password} onChange={handleChange} placeholder='Enter your Password' />
             <button className='btn'>Submit</button>
          </form>
          <Link to='/forgotPassword'>Forgot your password</Link>
          <Link to='/register'>Are you new? Please register here</Link>
        </div>
        <ToastContainer
         newestOnTop={false}
       position="top-right"
        autoClose={5000}
        hideProgressBar={false}
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

export default Login;