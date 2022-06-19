import React from 'react'
import './HeaderCart.css'

function HeaderCart() {
  return (
    <div className="header-container-cart">
        <div className="header-container-cart-text">
            <span className="header-cart-text" style={{fontWeight: "700"}}>
                Today's Deals
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                Watched Deals
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                Outlet Deals
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                Warehouse Deals
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                Coupons
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                eBook Deals
            </span>
        </div>
        <div className="header-container-cart-text">
            <span className="header-cart-text">
                Subscribe & Save
            </span>
        </div>
    </div>
  )
}

export default HeaderCart