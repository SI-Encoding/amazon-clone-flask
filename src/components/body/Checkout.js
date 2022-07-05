import React from 'react'
import './Checkout.css'
import {useSelector} from 'react-redux'
import axios from "axios";

function Checkout() {
    const total_items = useSelector(state => state.total_items)
    const total_cost = useSelector(state => state.total_cost)
    const products = useSelector(state => state.products)

    async function submitCheckout(e) {
        e.preventDefault()
            try {
                const res = await axios({method:'post', url:'http://localhost:5000/post_order', data: {products: products},  headers: {"Content-Type": "multipart/form-data"}})
                console.log(res.data)
                if(res.status = 200){

                }
            } catch(error){
                // setLoginError(true)
            }
    }

  return (
    <>
    <div className="checkout-container">
        <img src={require('../../assets/amazon-logo-login.png')} style={{marginLeft: "250px"}}/>
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
            <span className="checkout-total">Order Total: ${total_cost}</span>
        </div>
    </div>
    <div className='checkout-right-container'>
        <div className='subtotal-right'>
            <button onClick={() => {submitCheckout()}} className="checkout-button-2">Place Your Order</button>
        </div>
    </div>
    </div>
    </>
  )
}

export default Checkout