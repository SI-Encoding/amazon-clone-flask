import React,{useEffect, useState} from 'react'
import './Checkout.css'
import {set_product_counter, set_products, set_total_cost, set_total_items} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ReactComponent as VisaLogo} from '../../assets/icons8-visa.svg';
import {ReactComponent as MasterCard} from '../../assets/icons8-mastercard.svg';
import {ReactComponent as Discover} from '../../assets/icons8-discover.svg';
import {ReactComponent as AmericanExpress} from '../../assets/icons8-amex.svg';
import calculateTotal from '../../helpers'
import ProductQuantity from './ProductQuantity'

function ShippingAddress({user}) {
    return (<div className="checkout-part">
        <span className="checkout-list">1</span> <span className="checkout-list-steps">Shipping address</span> <span className="checkout-username">{user.firstName} {user.lastName}</span>
        <div className="checkout-address">
            <label className="checkout-card-information">{user.address}</label>
        </div>
    </div>)
}

function PaymentForm({card_number, expire_date, cvv}) {
    return (<form autoComplete="off">
        <div className="checkout-card-number-input">
            <input className="checkout-input checkout-input-margin" type="text" placeholder="Card Number"
                   id="card-number"
                   value={card_number}/>
            <div className="checkout-card-icons">
                <VisaLogo alt="visa icon"/>
                <MasterCard alt="mastercard icon"/>
                <Discover alt="discover icon"/>
                <AmericanExpress alt="american express icon"/>
            </div>
        </div>
        <div className="checkout-card-number-input">
            <input className="checkout-input checkout-card-number-input-margin" type="text" placeholder="MM/YY"
                   id="card-expire-date"
                   value={expire_date}/>
            <input className="checkout-input" type="text" placeholder="CVC" id="card-cvc"
                   value={cvv}/>
        </div>
    </form>)
}

function Payment({card_number, expiry_date, cvv}) {
    return (<div className="checkout-part checkout-part-padding">
        <span className="checkout-list">2</span> <span className="checkout-list-steps">Payment method</span> <span
        className="checkout-mastercard checkout-master-card-margin">MasterCard</span>
        {/* Enter credit card */}
        <div className="checkout-card-label">
            <label htmlFor="card-number" className="checkout-card-information">Card Information</label>
        </div>
        <PaymentForm card_number={card_number} expire_date={expiry_date} cvv={cvv}/>
    </div>)
}

function Review() {
    return (<div className="checkout-part">
        <span className="checkout-list">3</span> <span className="checkout-list-steps">Review items and shipping</span>
    </div>)
}

function ProductStock({product}) {
    return (
        <div className="cart-container-product-stock">
              {
                product.inventory !== 0 ?
                  <p className="cart-product-stock cart-product-stock-style">
                    In stock
                  </p>
                  :
                  <p className="cart-product-stock cart-product-stock-style">
                    Out of stock
                  </p>
              }
              <p className="cart-container-product-author">
                Sold by
                <span className="cart-product-author">
                  {product.seller}
                </span>
              </p>
            </div>
    )
}

function ProductInfo({product, quantity}) {
    return (
        <div className='cart-product-info'>
            <div className="cart-product-info-header">
              <p className='cart-product-title cart-product-title-font'>
                {product.name}
              </p>
              <span className="cart-product-title cart-product-title-margin">
                ${product.price}
              </span>
            </div>
            <ProductStock product={product}/>
            <p>{product.description}</p>
            <ProductQuantity product={product} quantity={quantity} />
          </div>
    )
}

function Product({product, product_counter, id1}) {
    return (
        <div className='cart-product' key={product.id}>
          <img className='cart-product-image' src={product.name && require(`../../assets/${product.img}`)} alt={`${product.name}`}/>
          <ProductInfo product={product} quantity={product_counter[id1]} />
        </div>
    )
}

function EmptyCart() {
    const navigate = useNavigate()

    return (
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

function Products({products}) {
    let product_counter = useSelector(state => state.product_counter)

    return (
        <div>
            {
                Object.entries(products).length !== 0 ? (Object.keys(products).map((key) => (products[key][0] && <Product product={products[key][0]} product_counter={product_counter} id1={key} />)))
                : (<EmptyCart />)}
        </div>
    )
}

function CheckoutButton({cardNumber, expiryDate, cvv}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let products = useSelector(state => state.products)
    let total_cost = useSelector(state => state.total_cost)
    let user = useSelector(state => state.user)

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
    async function checkout(e) {
      e.preventDefault()
      if (cardNumber.length !== 0 && expiryDate !== 0 && cvv !== 0) {
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
        //<button className="checkout-button" onClick={(e) => checkout(e)}>Place Your Order</button>
        <button className="checkout-button-2" onClick={(e) => checkout(e)}>Place Your Order</button>
    )
}

function Summary({total_items, total_cost}) {
    return (
        <div className='checkout-right-container'>
            <div className='subtotal-right' style={{borderBottom: "1px solid lightgray", paddingBottom: "0px"}}>
                <CheckoutButton/>
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
    )
}

function Checkout() {
    let total_items = useSelector(state => state.total_items)
    let products = useSelector(state => state.products)
    let product_counter = useSelector(state => state.product_counter)
    let total_cost = useSelector(state => state.total_cost)
    let user = useSelector(state => state.user)
    const [cardNumber, setCardNumber] = useState('4242424242424242')
    const [expireDate, setExpireDate] = useState('1111')
    const [cvc, setCvc] = useState('111')
    const dispatch = useDispatch()

    useEffect(()=>{
        calculateTotal(products)
    },[product_counter,total_cost,products])

  return (
    <>
        <div className="checkout-container">
            <Link to="/"><img className="checkout-container-margin" src={require('../../assets/amazon-logo-login.png')} alt="Amazon-logo"/></Link>
            <span className="checkout-span">.ca</span>
            <h1 className="checkout-heading">Checkout (<span className="checkout-items">{total_items} items</span>)</h1>   
        </div>
        <div className="checkout-body">
        <div className="checkout-body-container">
            <ShippingAddress user={user}/>
            <Payment card_number={cardNumber} expiry_date={expireDate} cvv={cvc}/>
            <Review />
            <Products products={products} />
            <div>
                <CheckoutButton  card_number={cardNumber} expiry_date={expireDate} cvv={cvc} />
                <span className="checkout-total">Order Total: ${total_cost} </span>
            </div>
        </div>
        <Summary total_items={total_items} total_cost={total_cost}/>
        </div>
    </>
  )
}

export default Checkout