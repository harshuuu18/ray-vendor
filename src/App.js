import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import SideBar from './Components/SideBar';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import DashBoard from './Components/DashBoard';
import AddProduct from './Components/AddProduct';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import App2 from './App2';
import App3 from './App3'
import Login from './auth/Login';
import { useReducer } from 'react';
import { reducer, initialState } from './reducer/userReducer';

export const VendorContext = createContext()

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  var [vendor,setVendor] = useState([])
  var history = useHistory()

  useEffect(()=>{
    
  },[])

  return (
    <VendorContext.Provider value={{state,dispatch}} >
    <BrowserRouter>
      <div className="App">
          
        <App2 />
        
        <ToastContainer />
      </div>
    </BrowserRouter>
    </VendorContext.Provider>
  );
}

export default App;
