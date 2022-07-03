import React,{useEffect} from 'react'
import './Checkout.css'
import {set_product_counter, set_products, set_total_cost, set_total_items} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Checkout() {
    let total_items = useSelector(state => state.total_items)
    let products = useSelector(state => state.products)
    let product_counter = useSelector(state => state.product_counter)
    let total_cost = useSelector(state => state.total_cost)
    const dispatch = useDispatch()

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
  
    useEffect(()=>{
        calculateTotal()
    },[product_counter,total_cost,products])

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
                <button className="cart-empty-signin">
                  Sign in to your account
                </button> 
              <div className="cart-empty-divider"></div>
                <button className="cart-empty-signup">
                  Sign up now
                </button>
            </div>
          </div> 
        </div>
        </div>
        )
        }
        <div>
                <button className="checkout-button">Place Your Order</button>
                <span className="checkout-total">Order Total: ${total_cost} </span>
            </div>
        </div>
        <div className='checkout-right-container'>
            <div className='subtotal-right'>
                <button className="checkout-button-2">Place Your Order</button>  
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