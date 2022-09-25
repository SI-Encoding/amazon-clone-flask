import React from 'react'
import './HeaderTopLogin.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {set_user} from '../../rootReducer'
import axios from 'axios'

function SignInSignOut({user}) {
    const dispatch = useDispatch()

    const logout = async () => {
        const res = await axios({method:'post', url:'http://localhost:5000/logout', data: {user_id:user.userId}, headers: {"Content-Type": "multipart/form-data"}});
        if(user){
            dispatch({
                type: set_user,
                user: null
            })
        }
    }

    return (
        <Link to={user? '/' : '/login'} onClick={()=> logout()}>
            <a href className="header-menu-signin-nav-signin">{user? 'sign out' : 'Sign in'}</a>
        </Link>
    )
}

function Deactivate() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const deactivateAccount = async () => {
        const res = await axios({method:'put', url:'http://localhost:5000/deactivateUser', data: {user_id:user.userId}, headers: {"Content-Type": "multipart/form-data"}});
        console.log(res)
        if(user){
            dispatch({
                type: set_user,
                user: null
            })
        }
    }

    return (<p className="header-menu-signin-nav-tooltip-footer-link" onClick={()=> deactivateAccount()}>Deactivate&nbsp;your&nbsp;account?</p>)
}

function SignUp() {
    return (
        <div className="header-menu-signin-nav-tooltip-footer">
            New&nbsp;customer? <Link to={'/signup'}>
            <a className="header-menu-signin-nav-tooltip-footer-link">Start&nbsp;here.</a>
        </Link> </div>
    )
}

function ToolTip() {
    const user = useSelector(state => state.user)

    return (
        <div className="header-menu-signin-nav-tooltip">
            <SignInSignOut user={user} />
            {user ? <div className="header-menu-signin-nav-tooltip-footer"><Deactivate /></div> : <SignUp />}
        </div>
    )
}

function HeaderTopLogin() {
    return (
        <div className="header-menu-signin">
            <div className="header-menu-signin-nav-arrow">
                <div className="header-menu-signin-nav-inner-arrow"></div>     
                <ToolTip />
            </div>
        </div>
    )
}

export default HeaderTopLogin
