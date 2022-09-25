import React, {useEffect} from 'react'
import './Cart.css'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import calculateTotal from '../../helpers'
import ProductQuantity from './ProductQuantity'

function CartHeader() {
    return (
        <div className="cart-container-shopping-cart">
        <h2 className='cart-title-shopping-cart'>Shopping Cart</h2>
        <span className="cart-title-price">Price</span>
    </div>)
}

function ProductHeader({product}) {
    return (<div className="cart-product-info-header"><p className='cart-product-title cart-product-title-font'>{product.name}</p><span className="cart-product-title cart-product-title-margin">${product.price}</span></div>)
}

function ProductStock({product}) {
    return (<div className="cart-container-product-stock">
        {product.inventory !== 0 ? <p className="cart-product-stock cart-product-stock-style">In stock</p> : <p className="cart-product-stock cart-product-stock-style">Out of stock</p>}
        <p className="cart-container-product-author">Sold by<span className="cart-product-author">{product.seller}</span></p>
    </div>)
}

function CartEmpty() {
    return (<div className="cart-container-empty">
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
        </div>)
}

function SubTotal({total_items, total_cost}) {
    return (<span className="cart-container-subtotal">Subtotal ({total_items} items): <span className="cart-subtotal">${(total_cost)}</span></span>)
}

function CartProduct({product, quantity}) {
    return (<div className='cart-product' key={product.id}>
          <img className='cart-product-image' src={product.name && require(`../../assets/${product.img}`)} alt={`${product.name}`}/>
          <div className='cart-product-info'>
            <ProductHeader product={product}/>
            <ProductStock product={product}/>
            <div>{product.description}</div>
            <ProductQuantity product={product} quantity={quantity}/>
          </div>
        </div>)
}

function CartMain({products, total_items, total_cost}) {
    let product_counter = useSelector(state => state.product_counter)

    return (<div className='cart-container-products'>
            <CartHeader/>
        {/* needs if statement here when product is removed*/}
        {Object.entries(products).length !== 0 ? (Object.keys(products).map((key) => (
            products[key][0] &&
            <CartProduct product={products[key][0]} quantity={product_counter[key]} />
        )))
         :
        (<CartEmpty />)
        }
        <div className="cart-container-subtotal-container">
          <SubTotal total_items={total_items} total_cost={total_cost} />
        </div>
    </div>)
}

function CheckOut({total_items, total_cost}) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    function checkout() {
      navigate(user ? '/checkout' : '/login')
    }

    return (<div className='cart-container-subtotal-checkout'>
          <div className='cart-subtotal-checkout'>
            <SubTotal total_items={total_items} total_cost={total_cost} />
            <button onClick={()=> checkout()}>Proceed to checkout</button>
          </div>
        </div>)
}

function Cart() {
    let products = useSelector(state => state.products)
    let total_items = useSelector(state => state.total_items)
    let product_counter = useSelector(state => state.product_counter)
    let total_cost = useSelector(state => state.total_cost)

    useEffect(()=>{
      calculateTotal(products)
    },[product_counter,total_cost,products])

  return (
    <div className="cart-container">       
      <div className="cart-body">
        <CartMain products={products} product_counter={product_counter} total_items={total_items} total_cost={total_cost} />
        <CheckOut total_items={total_items} total_cost={total_cost} />
      </div>
    </div>
  )
}

export default Cart