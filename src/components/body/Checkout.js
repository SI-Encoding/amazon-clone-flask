import React,{useEffect, useState} from 'react'
import './Checkout.css'
import {set_product_counter, set_products, set_total_cost, set_total_items} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Checkout() {
    let total_items = useSelector(state => state.total_items)
    let products = useSelector(state => state.products)
    let product_counter = useSelector(state => state.product_counter)
    let total_cost = useSelector(state => state.total_cost)
    let user = useSelector(state => state.user)
    const [cardNumber, setCardNumber] = useState('')
    const [expireDate, setExpireDate] = useState('')
    const [cvc, setCvc] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function addToCart(product) {
        dispatch({
          type: set_total_items,
          total_items: ++total_items
        })
        incrementCart(product)
        calculateTotal()
    }

    async function removeFromCart(product) {
        dispatch({
          type: set_total_items,
          total_items: --total_items
        })
        decrementCart(product)
        calculateTotal()
    }

    async function incrementCart(product) {
        if(!(product.id in products)) {
          products[product.id] = [product]
          product_counter[product.id] = 1
        } else {
            products[product.id].push(product)
            product_counter[product.id] += 1
        }
        dispatch({
          type: set_products,
          products: products
      })
        dispatch({
          type: set_product_counter,
          product_counter: product_counter
      })
    }

    async function decrementCart(product) {
        if(!(product.id in products)) {
          product_counter[product.id] = 0
        } else {
            products[product.id].pop()
            product_counter[product.id] -= 1
        }
        dispatch({
          type: set_products,
          products: products
      })
        dispatch({
          type: set_product_counter,
          product_counter: product_counter
      })
    }

    async function clearFromCart(product) {
        products[product.id].pop()
        product_counter[product.id] -= 1
        delete products[product.id]
        delete product_counter[product.id]

        dispatch({
          type: set_products,
          products: products
      })
        dispatch({
          type: set_product_counter,
          product_counter: product_counter
      })
        dispatch({
          type: set_total_items,
          total_items: --total_items
      })
        calculateTotal()
    }

    async function calculateTotal() {
        let total_for_product = 0;
        Object.entries(products).map(item => {
          total_for_product += item[1][0].price * item[1].length;
        })
        dispatch({
          type: set_total_cost,
          total_cost: total_for_product
        })
    }
  
    async function emptyCart() {
        dispatch({
          type: set_products,
          products: {}
      })
        dispatch({
          type: set_product_counter,
          product_counter: {}
      })
        dispatch({
          type: set_total_items,
          total_items: 0
      })
    }

    useEffect(()=>{
        calculateTotal()
    },[product_counter,total_cost,products])

    async function checkout(e) {
      e.preventDefault()
      if (cardNumber.length !== 0 && expireDate !== 0 && cvc !== 0) {
        const res = await axios({method:'post', url:'http://localhost:5000/charge', data: {amount: total_cost, token: "tok_visa"},  headers: {"Content-Type": "application/json"}})
          if (res.status == 200) {
            alert("Purchase has been successful")
            console.log(products)
            const res = await axios({method:'post', url:'http://localhost:5000/order', data: {products: products, user_id: user.userId},  headers: {"Content-Type": "application/json"}})
            .then((res)=> {
              emptyCart()

              navigate("/")
            }).catch(err => console.log(err)) 
          } else {
            console.log(res.status)
          }
      }
    }

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
                <span className="checkout-list">1</span> <span className="checkout-list-steps">Shipping address</span> <span className="checkout-username">{user.firstName} {user.lastName}</span>
                <div className="checkout-address">
                    <label className="checkout-card-information">{user.address}</label>
                </div>
            </div> 
            <div className="checkout-part" style={{paddingBottom: "125px"}}>
                <span className="checkout-list">2</span> <span className="checkout-list-steps">Payment method</span> <span className="checkout-mastercard" style={{marginLeft: "30px"}}>MasterCard</span>
                {/* Enter credit card */}
                <div className="checkout-card-label">
                    <label for="card-number" className="checkout-card-information">Card Information</label>
                </div>
                <form autocomplete="off">
                    <div className="checkout-card-number-input">
                        <input class="checkout-input" type="text" placeholder="Card Number" id="card-number" style={{marginTop: "13px"}} 
                          value={cardNumber} onChange={(e)=> setCardNumber(e.target.value)}/>
                        <div style={{display:"flex"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64px" height="64px">
                          <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"/>
                          <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64px" height="64px">
                          <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFC107" d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"/>
                          <path fill="#FF3D00" d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64px" height="64px">
                          <path fill="#E1E7EA" d="M45,35c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h34c2.2,0,4,1.8,4,4V35z"/>
                          <path fill="#FF6D00" d="M45,35c0,2.2-1.8,4-4,4H16c0,0,23.6-3.8,29-15V35z M22,24c0,1.7,1.3,3,3,3s3-1.3,3-3c0-1.7-1.3-3-3-3S22,22.3,22,24z"/>
                          <path d="M11.2,21h1.1v6h-1.1V21z M17.2,24c0,1.7,1.3,3,3,3c0.5,0,0.9-0.1,1.4-0.3v-1.3c-0.4,0.4-0.8,0.6-1.4,0.6c-1.1,0-1.9-0.8-1.9-2c0-1.1,0.8-2,1.9-2c0.5,0,0.9,0.2,1.4,0.6v-1.3c-0.5-0.2-0.9-0.4-1.4-0.4C18.5,21,17.2,22.4,17.2,24z M30.6,24.9L29,21h-1.2l2.5,6h0.6l2.5-6h-1.2L30.6,24.9z M33.9,27h3.2v-1H35v-1.6h2v-1h-2V22h2.1v-1h-3.2V27z M41.5,22.8c0-1.1-0.7-1.8-2-1.8h-1.7v6h1.1v-2.4h0.1l1.6,2.4H42l-1.8-2.5C41,24.3,41.5,23.7,41.5,22.8z M39.2,23.8h-0.3v-1.8h0.3c0.7,0,1.1,0.3,1.1,0.9C40.3,23.4,40,23.8,39.2,23.8z M7.7,21H6v6h1.6c2.5,0,3.1-2.1,3.1-3C10.8,22.2,9.5,21,7.7,21z M7.4,26H7.1v-4h0.4c1.5,0,2.1,1,2.1,2C9.6,24.4,9.5,26,7.4,26z M15.3,23.3c-0.7-0.3-0.9-0.4-0.9-0.7c0-0.4,0.4-0.6,0.8-0.6c0.3,0,0.6,0.1,0.9,0.5l0.6-0.8C16.2,21.2,15.7,21,15,21c-1,0-1.8,0.7-1.8,1.7c0,0.8,0.4,1.2,1.4,1.6c0.6,0.2,1.1,0.4,1.1,0.9c0,0.5-0.4,0.8-0.9,0.8c-0.5,0-1-0.3-1.2-0.8l-0.7,0.7c0.5,0.8,1.1,1.1,2,1.1c1.2,0,2-0.8,2-1.9C16.9,24.2,16.5,23.8,15.3,23.3z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64px" height="64px">
                          <path fill="#1976D2" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFF" d="M22.255 20l-2.113 4.683L18.039 20h-2.695v6.726L12.341 20h-2.274L7 26.981h1.815l.671-1.558h3.432l.682 1.558h3.465v-5.185l2.299 5.185h1.563l2.351-5.095v5.095H25V20H22.255zM10.135 23.915l1.026-2.44 1.066 2.44H10.135zM37.883 23.413L41 20.018h-2.217l-1.994 2.164L34.86 20H28v6.982h6.635l2.092-2.311L38.767 27h2.21L37.883 23.413zM33.728 25.516h-4.011v-1.381h3.838v-1.323h-3.838v-1.308l4.234.012 1.693 1.897L33.728 25.516z"/>
                        </svg>
                        </div>
                    </div>
                    <div className="checkout-card-number-input">
                        <input class="checkout-input" type="text" placeholder="MM/YY" id="card-expire-date" style={{marginRight: "10px"}}
                          value={expireDate} onChange={(e)=> setExpireDate(e.target.value)}/>
                        <input class="checkout-input" type="text" placeholder="CVC" id="card-cvc"
                          value={cvc} onChange={(e)=> setCvc(e.target.value)}/>
                    </div>
                </form>
            </div> 
            <div className="checkout-part">
                <span className="checkout-list">3</span> <span className="checkout-list-steps">Review items and shipping</span> <span></span>
            </div>
            {Object.entries(products).length !== 0 ? (Object.keys(products).map((key) => (
        products[key][0] &&
        <div className='cart-product' key={products[key][0].id}>
          <img className='cart-product-image' src={products[key][0].name && require(`../../assets/${products[key][0].img}`)} alt={`${products[key][0].name}`}/>
          <div className='cart-product-info'>
            <div className="cart-product-info-header">
              <p className='cart-product-title' style={{fontSize: "18px", lineHeight: "24px", fontFamily: "sans-serif" }}>
                {products[key][0].name}
              </p> 
              <span className="cart-product-title" style={{marginLeft: "auto", marginRight: "22px", color: "#0F1111", fontWeight: 600}}>
                ${products[key][0].price}
              </span>
            </div>
            <div className="cart-container-product-stock">
              {
                products[key][0].inventory !== 0 ?
                  <p className="cart-product-stock" style={{marginLeft: "0", marginRight: "auto", paddingLeft: "5px", color: "#007600", fontSize: "14px", lineHeight: "20px"}}>
                    In stock
                  </p> 
                  : 
                  <p className="cart-product-stock" style={{marginLeft: "0", marginRight: "auto", paddingLeft: "5px", color: "#007600", fontSize: "14px", lineHeight: "20px"}}>
                    Out of stock
                  </p> 
              }
              <p className="cart-container-product-author">
                Sold by 
                <span className="cart-product-author">
                  {products[key][0].seller}
                </span>
              </p>
            </div>
            <div>
              <li>
                {products[key][0].description}
              </li>
            </div>
            <div className="cart-container-product-quantity">
              <div className="cart-product-quantity">
                <div className="cart-container-product-quantity-decrement">
                  {
                    (product_counter[key] < 2) ?
                      <span className="cart-product-quantity-decrement">
                        -
                      </span>
                      : 
                      <span className="cart-product-quantity-decrement" onClick={() => removeFromCart(products[key][0])} disabled={product_counter[key] === 1}>
                        -
                      </span>
                  }
                </div>
                <div className="cart-container-product-quantity-label">
                  <span className="cart-product-quantity-label">
                    {product_counter[key]}
                  </span> 
                </div>
                <div className="cart-container-product-quantity-increment">
                  <span className="cart-product-quantity-increment" onClick={() => addToCart(products[key][0])}>
                      +
                  </span>
                </div>
              </div>
              <hr className="cart-product-quantity-divider"/>
              <span className="cart-product-quantity-delete" onClick={() => clearFromCart(products[key][0])}>Delete</span>
            </div>
          </div>
        </div>
        )
        )
        )
        :  
        (
        <div className="cart-container-empty">
          <div className="cart-empty" >
            <img className="cart-empty-image" src="https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg" alt="empty-cart"/>
            <div> 
              <span className="cart-empty-text">
                Your Amazon Cart is empty
              </span>
              <div>
                <a href className="cart-empty-deals">
                  Shop today's deals
                </a>
              </div>
              <div className="cart-container-empty-registration"> 
                <button className="cart-empty-signin" onClick={()=> navigate("/")}>
                  return home
                </button> 
            </div>
          </div> 
        </div>
        </div>
        )
        }
            <div>
                <button className="checkout-button" onClick={(e) => checkout(e)}>Place Your Order</button>
                <span className="checkout-total">Order Total: ${total_cost} </span>
            </div>
        </div>
        <div className='checkout-right-container'>
            <div className='subtotal-right' style={{borderBottom: "1px solid lightgray", paddingBottom: "0px"}}>
                <button className="checkout-button-2" onClick={(e) => checkout(e)}>Place Your Order</button>  
            </div>
            <div>
                <span className="checkout-list-steps">Order Summary</span>
                <div className="subtotal-right-items-shipping">
                    <div className="subtotal-right-items">
                        <span>Items ({total_items}):</span>
                        <span className="subtotal-right-margin">${total_cost}</span>
                    </div>
                    <div className="subtotal-right-items">
                        <span>Shipping & Handling:</span>
                        <span className="subtotal-right-margin">$0.00</span>
                    </div>
                </div>
                <div className="subtotal-right-tax">
                    <div className="subtotal-right-items">
                        <span>Total before tax:</span>
                        <span className="subtotal-right-margin">$0.00</span>
                    </div>
                    <div className="subtotal-right-items">
                        <span>Estimated tax to be collected:</span>
                        <span className="subtotal-right-margin">$0.00</span>
                    </div>
                </div>
                <div className="subtotal-right-total">
                    <span className="checkout-total">Order Total: ${total_cost} </span>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout