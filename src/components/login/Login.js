import './Login.css'
import React, {useState} from 'react'
import axios from 'axios'
import {set_user} from '../../rootReducer'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    async function signIn(e) {
        e.preventDefault()
        try {
            const res = await axios({method:'post', url:'http://localhost:5000/login', data: {username: email, password: password},  headers: {"Content-Type": "multipart/form-data"}})
            if(res.status = 200){
                dispatch({
                    type: set_user,
                    user: res.data.username
                })
                setError(false)
                navigate(-1)
            } 
        } catch(error){
            setError(true)
        }
    }
   
    return (
        <div className='login-container'>
            <Link to="/" style={{textDecoration: 'none'}}>
                <div className='login-logo-container'>
                    <img className='login-logo' src={require('../../assets/amazon-logo-login.png')} alt="amazon-logo"/>
                    <span className="login-logo-country">.ca</span>
                </div>
            </Link>
            <div className='login-body'>
                <h1>Sign-In</h1>
                {error && <span className="login-error">Sorry! Please enter a correct username and password</span>}
                <div className='login-form'>
                    <h5> E-mail address</h5>
                    <input value={email} onChange= {(e) => setEmail(e.target.value)}/>
                    <h5> Password </h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit'  className='login-sign-in' disabled={!email || !password} onClick={(e)=> signIn(e)}>Sign In</button>
                </div>
                <p>By signing in, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button  className='login-create-account'>Create Your Amazon Account</button>
            </div>
        </div>       
    )
}

export default Login
