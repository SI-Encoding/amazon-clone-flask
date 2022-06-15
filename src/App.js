import './App.css';
import HeaderTop from './components/header/HeaderTop'
import HeaderBottom from './components/header/HeaderBottom'
import Login from './components/login/Login'
import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><HeaderTop/><HeaderBottom/></>}/> 
        <Route path="login" element={<Login/>}/>
      </Routes>  
    </div>
  );
}

export default App;
