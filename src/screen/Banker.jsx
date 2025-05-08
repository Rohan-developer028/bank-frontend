import React, { useEffect, useState } from "react";
import './Banker.css'
import Log from "./Log";
import { useNavigate } from "react-router-dom";

const Banker=()=>{
 const nav=useNavigate()
    const[info,setInfo]=useState('')
    const[log,setLog]=useState(false)
    const auth=JSON.parse(localStorage.getItem('banker'))

    const load=async() =>{
        const resp=await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser`,{
            method:'get',
            headers:{'Content-Type':'application/json',
              authorization:`bearer ${auth.data.token}`

            }
            })
            const data=await resp.json()
            console.log(data)
            setInfo(data)
    }
  useEffect(
    ()=>{
      if (localStorage.getItem('banker')) {
        load()
      } else {
        nav("/");
      }
    }
  ,[])

  const handlelogout=()=>{
    localStorage.removeItem('banker')
    nav('/login')
  }

    return(
        <>
               <nav className='Nav' onClick={handlelogout}><button>logout</button></nav>

       <div className="container">

  {
    info.length !== 0 ?
      info.map((data, key) => (
        <div key={key} className="customer-card">
          <div>Customer Name:- <strong>{data.name}</strong> </div>
          <div>Customer id:- {data._id}</div>
          <div>Balance:- {data.balance}</div>
          <div><button onClick={()=>setLog(true)} >Transaction log</button></div>
          {log && <Log uid={data._id} log={setLog}/>}

        </div>
      ))
    : <h1 className="no-data">No data</h1>
  }
</div>

        </>
    )
}

export default Banker;