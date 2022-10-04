import React from 'react'
import './HeaderCart.css'

function Deal({key, title, weight=0}) {
    return (
        <div className="header-container-cart-text">
            <span className={`header-cart-text${weight === 1 ? " header-cart-text-weight" : ""}`}>
                {title}
            </span>
        </div>
    )
}

function HeaderCart() {
    let arr = ["Today's Deals", "Watched Deals", "Outlet Deals", "Warehouse Deals", "Coupons", "eBook Deals", "Subscribe & Save"];

  return (
    <div className="header-container-cart">
        {arr.map((item, i) => {return (<Deal key={i} title={item} weight={i === 0 ? 1 : 0} />)})}
    </div>
  )
}

export default HeaderCart
