import './App.css';
import HeaderTop from './components/header/HeaderTop'
import HeaderBottom from './components/header/HeaderBottom'
import Login from './components/login/Login'

function App() {
  return (
    <div className="App">
        <HeaderTop/>
        <HeaderBottom/>
        <Login/>
    </div>
  );
}

export default App;
