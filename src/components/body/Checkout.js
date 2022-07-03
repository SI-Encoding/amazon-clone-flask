import React from 'react'
import './Checkout.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Checkout() {
    const total_items = useSelector(state => state.total_items)
    const total_cost = useSelector(state => state.total_cost)

  return (
    <>
    <div className="checkout-container">
        <Link to="/"><img src={require('../../assets/amazon-logo-login.png')} style={{marginLeft: "250px"}} alt="Amazon-logo"/></Link>
        <span className="checkout-span">.ca</span>
        <h1 className="checkout-heading">Checkout (<span className="checkout-items">{total_items} items</span>)</h1>   
    </div>
    <div className="checkout-body">
    <div className="checkout-body-container">
        <div className="checkout-part">  
            <span className="checkout-list">1</span> <span className="checkout-list-steps">Shipping address</span> <span className="checkout-username">username lastname</span>
        </div> 
        <div className="checkout-part">
            <span className="checkout-list">2</span> <span className="checkout-list-steps">Payment method</span> <span className="checkout-mastercard" style={{marginLeft: "30px"}}>MasterCard</span>
       </div> 
       <div className="checkout-part">
            <span className="checkout-list">3</span> <span className="checkout-list-steps">Review items and shipping</span> <span></span>
        </div>
        <div>
            <button className="checkout-button">Place Your Order</button>
            <span className="checkout-total">Order Total: ${total_cost} </span>
        </div>
    </div>
    <div className='checkout-right-container'>
        <div className='subtotal-right'>
            <button className="checkout-button-2">Place Your Order</button>  
        </div>
    </div>
    </div>
    </>
  )
}

export default Checkout