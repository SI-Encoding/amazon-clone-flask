import './App.css';
import HeaderTop from './components/header/HeaderTop'
import HeaderBottom from './components/header/HeaderBottom'
import Login from './components/login/Login'
import Home from './components/body/Home'
import Product from './components/body/Product'
import Cart from './components/body/Cart'
import HeaderCart from './components/header/HeaderCart'
import Checkout from './components/body/Checkout'
import SignUp from './components/signup/SignUp';
import {Routes, Route } from 'react-router-dom'
import Order from './components/body/Order';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<><HeaderTop/><HeaderBottom/><Home/></>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="product/:name/:id" element={<><HeaderTop/><HeaderBottom/><Product/></>}/>
          <Route path='/cart' element={<><HeaderTop/><HeaderBottom/><HeaderCart/><Cart/></>}/>
          <Route path ='/checkout' element={<Checkout/>}/>
          <Route path ='/orders' element={<><HeaderTop/><HeaderBottom/><Order/></>}/>
      </Routes>  
    </div>
  );
}

export default App;
