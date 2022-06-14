import React from 'react'
import './HeaderTop.css'

function HeaderTop() {
  return (
    <>
        <div className="header-menu-container-top">
            <div className="header-menu-left">
                <div className="header-menu-logo-container">
                    <img className ="header-menu-logo" src={require('../../assets/amazon-icons-logo.png')} alt="amazon-logo"/>
                    <span className="header-menu-logo-country">.ca</span>
                </div>
                <img className="header-menu-location" src={require('../../assets/amazon-icons-location.png')} alt="amazon-location"/>
                <div className="header-menu-address">
                    <span className="header-menu-address-top">Hello</span>
                    <span className="header-menu-address-bottom">Select your address</span>
                </div>
            </div>
            <div className="header-menu-center">
                <div className="header-menu-search-bar">
                    <div className="header-menu-category-dropdown">
                        <div className="header-menu-category-container">
                            <p className="header-menu-category-text">All</p>
                            <img className="header-menu-category-img" src={require("../../assets/amazon-icons-dropdown-arrow-black.png")} alt="amazon-dropdown"/>
                        </div>
                    </div>
                    <input className="header-menu-input"/>
                    <div className="header-menu-search-button">
                        <img className="header-menu-search-button-icon" src={require("../../assets/amazon-icons-search.png")} alt="amazon-search"/>
                    </div>
                </div>
            </div>
            <div className="header-menu-right">
                <img className="header-menu-flag" src={require("../../assets/amazon-flag-canada.png")} alt="amazon-flag"/>
                <img className="header-menu-flag-dropdown" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
                <div className="header-menu-address">
                    <span className="header-menu-address-top" style={{marginLeft:"0px", color:"#fff"}}>Hello, Sign in</span>
                    <span className="header-menu-address-bottom">Account & Lists</span>
                </div>
                <img className="header-menu-flag-dropdown" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
                <div className="header-menu-address">
                    <span className="header-menu-address-top" style={{marginLeft:"0px", color:"#fff"}}>Returns</span>
                    <span className="header-menu-address-bottom">& Orders</span>
                </div>
                <div className="header-menu-cart-container"> 
                    <span className="header-menu-cart-quantity">0</span>
                    <img className="header-menu-cart-img" src={require("../../assets/amazon-icons-cart.png")} alt="amazon-cart"/>
                </div>
                <span className="header-menu-address-bottom" style={{marginTop: "15px"}}>Cart</span>
            </div>
        </div>
    </>
  )
}

export default HeaderTop