import React, { useEffect, useState } from 'react';
import './Home.css'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
const nav=useNavigate()
  const [Balance,setBalance]=useState(0)
  const [deposit, setDeposit] = useState('');
  const [withdraw, setWithdraw] = useState('');
  const [error, setError] = useState('');
const info=JSON.parse(localStorage.getItem('user'))
console.log(info.data.id);
const toastoption = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  theme: 'dark',
  draggable: true
};

const load= async()=>{
  const resp= await fetch(`${process.env.REACT_APP_API_BASE_URL}/bal`,{
    method:'post',
    headers:{"Content-Type":"application/json",
      authorization:`bearer ${info.data.token}`

    },
      body:JSON.stringify({id:info.data.id})
  }

)
let data=await resp.json()
setBalance(data.bal.balance)

}

useEffect(() => {
  if (localStorage.getItem('user')) {
    load()
  } else {
    nav("/login");
  }
}, []);
  const handleDeposit = async() => {
    if (!/^\d+(\.\d{1,2})?$/.test(deposit)) {
      toast.error('Enter a valid withdraw amount',toastoption);



    } else {
      setError('');
      const resp=await fetch(`${process.env.REACT_APP_API_BASE_URL}/deposit`,{
        method:'post',
        headers:{"Content-Type":"application/json",
          authorization:`bearer ${info.data.token}`

        },
        body: JSON.stringify({ id:info.data.id,amount:deposit })

      })
      let data= await resp.json()
      console.log(data.data.balance)
    setBalance(data.data.balance)
    console.log(Balance)
      setDeposit('')
      toast.success("deposit successfull",toastoption)

    }
  };

  const handleWithdraw =async () => {
    if (!/^\d+(\.\d{1,2})?$/.test(withdraw)) {
     toast.error('Enter a valid withdraw amount',toastoption);
    }
   else if(Balance < withdraw){
    toast.error('insuficent balance',toastoption);

   }
    else {
      setError('');
      const resp=await fetch(`${process.env.REACT_APP_API_BASE_URL}/wihdraw`,{
        method:'post',
        headers:{"Content-Type":"application/json",
          authorization:`bearer ${info.data.token}`

        },
        body: JSON.stringify({ id:info.data.id,amount:withdraw })

      })
      let data= await resp.json()
      console.log(data.data.balance)
    setBalance(data.data.balance)
    console.log(Balance)
      setWithdraw(' ')
    toast.success("withdraw successfull",toastoption)

    
    }
  };

  const handlelogout=()=>{
    localStorage.removeItem('user')
    nav('/')
  }

  return (
    <>
    <nav className='Nav' onClick={handlelogout} ><button>logout</button></nav>
      <h2>Welcome</h2>
        <div className='containe2'>
      
      <div className="containe">
        <div className="box">
          <label>Available Balance: {Balance}</label>
          <input
            type="text"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            placeholder="Enter amount to deposit"
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>

        <div className="box">
          <label>Available Balance: {Balance}</label>
          <input
            type="text"
            value={withdraw}
            onChange={(e) => setWithdraw(e.target.value)}
            placeholder="Enter amount to withdraw"
          />
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Home;


