import './Login.css'
import React, {useState} from 'react'
import axios from 'axios'
import {set_user} from '../../rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [verifyError, setVerifyError] = useState(false)
    const [verify, setVerify] = useState(false)
    const [mobile_number, setMobileNumber] = useState("")
    const [entered_code, setEnteredCode] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    async function signIn(e) {
        e.preventDefault()
        try {
            const res = await axios({method:'post', url:'http://localhost:5000/login', data: {email: email, password: password},  headers: {"Content-Type": "multipart/form-data"}})
            console.log(res.data)
            if(res.status = 200){
                setMobileNumber(res.data.mobile_number)
                localStorage.setItem('session_token', res.data.session_token)
                setVerify(true)
                setLoginError(false)
            } else {
                alert("Sorry, your account has been deactivated!")
            }
        } catch(error){
            setLoginError(true)
        }
    }

    async function verifyAccessCode(e) {
        e.preventDefault()
        try {
        const res = await axios({method:'post', url:'http://localhost:5000/2fa', data: {email: email, sms_code: entered_code, session_token: localStorage.getItem('session_token')},  headers: {"Content-Type": "multipart/form-data"}});
        if (res.status = 200) {
            dispatch({
                type: set_user,
                user: {
                    userId: res.data.user_id,
                    firstName: res.data.firstName,    
                    lastName: res.data.lastName,  
                    email: res.data.email,
                    address: res.data.address
                }
            })
            setVerifyError(false)
            navigate(-1)
        }} catch(error){
            setVerifyError(true)
        }
    }
   
    async function signOut(e) {
        e.preventDefault()

        const res = await axios({method:'post', url:'http://localhost:5000/logout', data: {user_id:user.userId}, headers: {"Content-Type": "multipart/form-data"}});

        if(user) {
            dispatch({
                type: set_user,    
                user: null
            })
        }
    }

    return (
        <>
        { user? 
            <>
                <div className='login-container'> 
                    <div className="login-logged-in">
                        <h1 className="login-header">Sorry! It looks like you are already signed in</h1>
                        <div className='login-form'>
                            <button className='login-sign-in' onClick={(e)=> signOut(e)}>Sign Out</button>
                        </div>
                    </div>
                </div> 
            </>
            :
            <>
                <div className='login-container'>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <div className='login-logo-container'>
                            <img className='login-logo' src={require('../../assets/amazon-logo-login.png')} alt="amazon-logo"/>
                            <span className="login-logo-country">.ca</span>
                        </div>
                    </Link>
                <div className='login-body'>
                    {verify?
                        <div>
                            <h1 className="login-header">Enter Access Code Sent to {mobile_number}</h1>
                            <div className='login-form'>
                            <h5>Access Code</h5>
                            {verifyError && <span className="login-error">Sorry! The access code is incorrect</span>}
                            <input value={entered_code} onChange= {(e) => setEnteredCode(e.target.value)}/>
                            <button type='submit'  className='login-sign-in' disabled={!entered_code} onClick={(e)=> verifyAccessCode(e)}>Verify Access Code</button>
                        </div>
                        </div>
                            :
                        <div>
                        <h1 className="login-header">Sign-In</h1>
                        {loginError && <span className="login-error">Sorry! Either this account does not exist or you entered the wrong username and password</span>}
                        <div className='login-form'>
                            <h5> E-mail address</h5>
                            <input value={email} onChange= {(e) => setEmail(e.target.value)}/>
                            <h5> Password </h5>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type='submit' className='login-sign-in' disabled={!email || !password} onClick={(e)=> signIn(e)}>Sign In</button>
                        </div>
                        <p>By signing in, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                        <button  className='login-create-account' onClick={(e)=> {navigate('/signup')}}>Create Your Amazon Account</button>
                        </div>
                    }
                </div>
            </div> 
            </>}   
            </>
        )
    }

export default Login
