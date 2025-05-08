import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./login.css"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav=useNavigate()
  const toastoption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: 'dark',
    draggable: true
  };
const route=process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email,password)
    try{
        console.log(route)
    const resp=await fetch(`${route}/login`,{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
   const data=await resp.json()
   if(data.role=="customer") {
    localStorage.setItem('user',JSON.stringify({data}))
      nav("/transacation")
   }
   else if(data.role=='banker'){
    localStorage.setItem('banker',JSON.stringify({data}))
    nav('/accounts')
   }
   else if(data.err)
   {
    toast.error(data.err,toastoption)
   }
  
    }
    catch(err){
        console.log(err)
    }
};

  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="title">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="button">Login</button>
      
    </form>
    <ToastContainer/>
    </>
  );
};

export default Login;
