import React, {useState} from 'react'
import './HeaderTop.css'
import HeaderTopLogin from './HeaderTopLogin'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function CompanyLogo() {
    return (<div className="header-menu-logo-container">
        <Link to="/"><img className ="header-menu-logo" src={require('../../assets/amazon-icons-logo.png')} alt="amazon-logo"/></Link>
        <span className="header-menu-logo-country">.ca</span>
    </div>)
}

function Location({user}) {
    return (<>
        <img className="header-menu-location" src={require('../../assets/amazon-icons-location.png')} alt="amazon-location"/>
        <div className="header-menu-address">
            <span className="header-menu-address-top">{user? `Deliver ${user.firstName} ${user.lastName}` : 'Hello '}</span>
            <span className="header-menu-address-bottom">{user? `${user.address}` : 'Select your address'}</span>
        </div>
    </>)
}

function SearchBar() {
    return (
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
    )
}

function Region() {
    return (
        <>
            <img className="header-menu-flag" src={require("../../assets/amazon-flag-canada.png")} alt="amazon-flag"/>
                <img className="header-menu-flag-dropdown" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
        </>
    )
}

function Account({user}) {
    const [loginPopup, setLoginPopup] = useState(false)

    return (
        <>
        <div className="header-menu-address" onClick={()=> setLoginPopup(!loginPopup)}>
            <span className="header-menu-address-top header-menu-address-top-margin" >Hello, {user? `${user.firstName} ${user.lastName}` : 'Sign in'}</span>
            <span className="header-menu-address-bottom">Account & Lists</span>
            {loginPopup && <HeaderTopLogin/>}
        </div>
        <img className="header-menu-flag-dropdown" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
        </>
    )
}

function ReturnsAndOrders({user}) {
    return (
        <div className="header-menu-address">
        <Link to={user? '/orders' : '/login'}>
            <div className="header-menu-top-flex">
                <span className="header-menu-address-top header-menu-address-top-margin">Returns</span>
                <span className="header-menu-address-bottom">& Orders</span>
            </div>
        </Link>
    </div>
    )
}

function CartButton() {
    const total_items = useSelector(state => state.total_items)

    return (
        <>
            <Link to="/cart">
                <div className="header-menu-cart-container">
                    <span className="header-menu-cart-quantity">{total_items}</span>
                    <img className="header-menu-cart-img" src={require("../../assets/amazon-icons-cart.png")} alt="amazon-cart"/>
                </div>
            </Link>
            <span className="header-menu-address-bottom header-menu-address-bottom-margin">Cart</span>
        </>
    )
}

function HeaderTop() {
    const user = useSelector(state => state.user)

  return (
    <>
        <div className="header-menu-container-top">
            <div className="header-menu-left">
                <CompanyLogo />
                <Location user={user} />
            </div>
            <SearchBar />
            <div className="header-menu-right">
                <Region />
                <Account user={user} />
                <ReturnsAndOrders user={user} />
                <CartButton />
            </div>
        </div>
    </>
  )
}

export default HeaderTop