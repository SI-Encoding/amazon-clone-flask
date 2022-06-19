import React from 'react'
import './HeaderTopLogin.css'
import {Link} from 'react-router-dom'

function HeaderTopLogin() {
    return (
        <div className="header-menu-signin">
            <div className="header-menu-signin-nav-arrow">
                <div className="header-menu-signin-nav-inner-arrow">
                </div>
            <div className="header-menu-signin-nav-tooltip">
                <Link to="/login"><a href className="header-menu-signin-nav-signin">Sign in</a></Link>
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