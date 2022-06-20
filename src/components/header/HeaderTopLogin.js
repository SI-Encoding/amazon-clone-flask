import React from 'react'
import './HeaderTopLogin.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {set_user} from '../../rootReducer'

function HeaderTopLogin() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const logout = async () => {
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
                <div className="header-menu-signin-nav-tooltip-footer">    
                    New&nbsp;customer?    
                    <a className="header-menu-signin-nav-tooltip-footer-link">Start&nbsp;here.</a>        
                </div>
            </div>
            </div>
        </div>
    )
}

export default HeaderTopLogin