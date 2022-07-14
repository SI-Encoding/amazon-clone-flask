import React from 'react'
import './HeaderTopLogin.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {set_user} from '../../rootReducer'
import axios from 'axios'

function HeaderTopLogin() {
    const user = useSelector(state => state.user)
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
    return (
        <div className="header-menu-signin">
            <div className="header-menu-signin-nav-arrow">
                <div className="header-menu-signin-nav-inner-arrow"></div>     
            <div className="header-menu-signin-nav-tooltip">
                <Link to={user? '/' : '/login'} onClick={()=> logout()}>
                    <a href className="header-menu-signin-nav-signin">{user? 'sign out' : 'Sign in'}</a>
                </Link>
                
                {user ? <div className="header-menu-signin-nav-tooltip-footer">    
                    <p className="header-menu-signin-nav-tooltip-footer-link" onClick={()=> deactivateAccount()}>Deactivate&nbsp;your&nbsp;account?</p> </div>
                    :<div className="header-menu-signin-nav-tooltip-footer">    
                    New&nbsp;customer? <Link to={'/signup'}>
                    <a className="header-menu-signin-nav-tooltip-footer-link">Start&nbsp;here.</a>  
                </Link> </div>}
            </div>
            </div>
        </div>
    )
}

export default HeaderTopLogin