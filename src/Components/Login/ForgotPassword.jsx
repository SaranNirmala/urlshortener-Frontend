/* eslint-disable no-unused-vars */
import { useState } from "react";
import { backendURL } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendURL}/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 401) {
      //    alert("Email invalid")
      toast.error("Email Invalid", {
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
      //   alert("We have sent the Link")
      toast.success("We have sent the Link Please check your mail", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setData({
        email: "",
      });
    }
  };

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
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
        <br />
        <button className="btn">Submit</button>
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
  );
};

export default ForgotPassword;
