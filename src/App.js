import './App.css';
import HeaderTop from './components/header/HeaderTop'
import HeaderBottom from './components/header/HeaderBottom'
import Login from './components/login/Login'
import Home from './components/body/Home'
import Product from './components/body/Product'
import Cart from './components/body/Cart'
import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<><HeaderTop/><HeaderBottom/><Home/></>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="product/:name/:id" element={<><HeaderTop/><HeaderBottom/><Product/></>}/>
          <Route path='cart' element={<><HeaderTop/><HeaderBottom/><Cart/></>}/>
      </Routes>  
    </div>
  );
}

export default App;
