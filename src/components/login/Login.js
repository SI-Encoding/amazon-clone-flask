import './Login.css'
import React, {useState} from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
   
    async function signIn(e) {
        e.preventDefault()
        const res = await axios({method:'post', url:'http://localhost:5000/login',data: {username: email, password: password},  headers: {"Content-Type": "multipart/form-data"}})
        console.log(res)
    }
   
    return (
        <div className='login-container'>
            <div className='login-logo-container'>
                <img className='login-logo' src={require('../../assets/amazon-logo-login.png')} alt="amazon-logo"/>
                <span className="login-logo-country">.ca</span>
            </div>
            <div className='login-body'>
                <h1>Sign-In</h1>
                <div className='login-form'>
                    <h5> E-mail address</h5>
                    <input value={email} onChange= {(e) => setEmail(e.target.value)}/>
                    <h5> Password </h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit'  className='login-sign-in' onClick={(e)=> signIn(e)}>Sign In</button>
                </div>
                <p>By signing in, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button  className='login-create-account'>Create Your Amazon Account</button>
            </div>
        </div>       
    )
}

export default Login
