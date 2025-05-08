import logo from './logo.svg';
import './App.css';
import "react-router-dom"
import Login from './screen/Login';
import Home from './screen/Home';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Banker from './screen/Banker';

function App() {
  return (
    
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/transacation' element={<Home/>} />
      <Route path='/accounts' element={<Banker/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
