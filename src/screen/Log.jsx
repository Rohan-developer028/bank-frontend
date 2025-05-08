import React, { useEffect, useState } from "react";
import './Log.css'



const Log=({uid,log})=>{
    const [tlog,setTlog]=useState('')
    const auth=JSON.parse(localStorage.getItem('banker'))

    const load=async()=>{
        const res=await fetch(`${process.env.REACT_APP_API_BASE_URL}/log`,{
            method:'post',
            headers:{'Content-Type':'application/json',
              authorization:`bearer ${auth.data.token}`

            },
            body:JSON.stringify({id:uid})
        })
        const data= await res.json()
        console.log(data)
        setTlog(data[0])
    }
useEffect(
    ()=>{
        console.log(uid)
        load()
    },[])

    return(
<>
<div className="container2">
<span style={{height:"1%",textAlign:'end'}} onClick={()=>log(false)}>X</span>

<div  className='container4'style={{}} >

  {
    tlog.length !== 0 ?
      tlog.map((data, key) => (
        <div key={key} className="customer-box">
          <div>Customer id:- <strong>{data.user_id}</strong> </div>
          <div>Transaction Type:- {data.transaction_type          }</div>
           {
            data.transaction_type            == 'credit'?
            <div style={{color:"green"}}>amount:- {data.amount}</div>
            :
            <div style={{color:"red"}} >amount:- {data.amount}</div>

          } 
          <div>Date:-{data.created_at.slice(0,10)} Time :-{data.created_at.slice(12,19)} </div>
          

        </div>
      ))
    : <h1 className="no-data" style={{color:"white"}} >No data</h1>
  }
</div>
</div>
</>
    )
}

export default Log;
