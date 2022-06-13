import React from 'react'
import './HeaderBottom.css'

function HeaderBottom() {
    return (
        <div className="header-menu-container-bottom">
            <div className="header-menu-left">
                <img src={require("../../assets/amazon-icons-menu.png")} alt="amazon-menu"/>
                <span className="header-menu-left-typography">All</span>
            </div>
            <div className="header-menu-content-container">
                <a className="header-menu-content">Best Sellers</a>
                <a className="header-menu-content">Customer Service</a>
                <a className="header-menu-content">Deals Store</a>
                <a className="header-menu-content width-670">New Releases</a>
                <a className="header-menu-content width-840">Prime</a>
                <img className="header-menu-content-dropdown width-840" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
                <a className="header-menu-content width-840">Fashion</a>
                <a className="header-menu-content width-840">Sell</a>
                <a className="header-menu-content width-1252">Electronics</a>
                <a className="header-menu-content width-1252">Home</a>
                <a className="header-menu-content width-1252">Books</a>
                <a className="header-menu-content width-1252">Toys & Games</a>
                <a className="header-menu-content width-1252">Computers</a>
            </div>
            <div className="header-menu-right">
                <img src={require("../../assets/amazon-prime.jpg")} style={{height:"32px"}}/>
            </div>
        </div>
    )
}

export default HeaderBottom