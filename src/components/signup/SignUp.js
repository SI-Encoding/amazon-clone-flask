import './SignUp.css'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

function LoginLink() {
    return (
        <Link to="/" className="login-container-link">
            <div className='login-logo-container'>
                <img className='login-logo' src={require('../../assets/amazon-logo-login.png')} alt="amazon-logo"/>
                <span className="login-logo-country">.ca</span>
            </div>
        </Link>
    )
}

function InputField({label, value, onChange, placeholder}) {
    return (
        <>
            <h5>{label}</h5>
            <input className="signup-input" value={value} onChange={onChange} placeholder={placeholder} />
        </>
    )
}

function PasswordField({password, setPassword, confirmPassword, setConfirmPassword}) {
    return (
        <>
            <h5> Password </h5><input className="signup-input signup-input-margin" type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters"/><span className="signup-pasword">Passwords must consist of at least 6 characters. </span><h5 style={{marginTop: "12px"}}> Password again </h5><input className="signup-input" type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </>
    )
}

function SignUpForm({signUpError, setSignUpError}) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile_number, setMobileNumber] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault()
        try {
            const res = await axios({method:'post', url:'http://localhost:5000/register', data: {email: email, password: password, first_name:firstName, last_name:lastName, address:address,  mobile_number:mobile_number },  headers: {"Content-Type": "multipart/form-data"}})
            console.log(res.data)
            if(res.status = 200){
                setSignUpError(false)
                navigate('/login')
            }
        } catch(error) {
            setSignUpError(true)
        }
    }

    useEffect(()=> {console.log('firstname',firstName); console.log('lastname', lastName)},[firstName, lastName])

    function checkAllFields() {
        if (!firstName || !lastName || !email || !mobile_number || !password || !confirmPassword || password !== confirmPassword) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='login-form'>
            <InputField label="Your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
            <InputField label="Your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
            <InputField label="Your email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <InputField label="Your mobile number" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile number" />
            <InputField label="Your address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City and postal code" />
            <PasswordField password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
            <button type='submit' className='login-sign-in signup-input-button' disabled={!checkAllFields()} onClick={(e)=> signUp(e)}>Create account</button>
        </div>
    )
}


function SignUp() {
    const [signUpError, setSignUpError] = useState(false)
    const navigate = useNavigate();

    return (
        <div className='login-container'>
            <LoginLink />
            <div className='login-body'>
                    <div>
                        <h1 className="signup-header">Create account</h1>
                        {signUpError && <span className="login-error">Sorry! Please correctly enter all the required fields.</span>}
                        <SignUpForm signUpError={signUpError} setSignUpError={setSignUpError} />
                        <p>Already have an account?</p>
                        <button className='login-create-account' onClick={(e)=> {navigate('/login')}}>Sign in</button>
                    </div>
            </div>
        </div>       
    )
}

export default SignUp
