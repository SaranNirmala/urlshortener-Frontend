/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "../../../config";
import { Navigate } from "react-router-dom";

const ResetPassword = () => {
   
    const [data, setData] = useState({
        password:''
    })

    const [resetPassword, setResetPassword] = useState(false);
const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
}

const handleSubmit= async(e) => {
    e.preventDefault();
    const response= await fetch(`${backendURL}/resetPassword`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    })
    const result= await response.json();
    if(response.status === 401){
        alert("password not Updated")
      

    } else{
        alert("password updated successfully")
        setResetPassword(true)
    }
} 

if(resetPassword === true){
    return <Navigate to="/login" />
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
             <input type="password" name="password" value={data.password} onChange={handleChange} placeholder='Enter your Password' />
             <button className='btn'>Submit</button>
             </form>
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

export default ResetPassword;