import React, {useEffect} from 'react'
import './Cart.css'
import {set_product_counter, set_products, set_total_cost, set_total_items} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import calculateTotal from '../../helpers'


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

function ProductQuantityDecrementer({product, quantity}) {
    const dispatch = useDispatch()
    let products = useSelector(state => state.products)
    let total_items = useSelector(state => state.total_items)
    let product_counter = useSelector(state => state.product_counter)

    async function removeFromCart(product) {
        dispatch({
          type: set_total_items,
          total_items: --total_items
        })
        decrementCart(product)
        dispatch({
          type: set_total_cost,
          total_cost: await calculateTotal(products)
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

    return (<div className="cart-container-product-quantity-decrement">
                  {
                    (quantity < 2) ?
                      <span className="cart-product-quantity-decrement">
                        -
                      </span>
                      :
                      <span className="cart-product-quantity-decrement" onClick={() => removeFromCart(product)} disabled={quantity === 1}>
                        -
                      </span>
                  }
    </div>)
}

function ProductQuantityIncrementer({product}) {
    const dispatch = useDispatch()
    let products = useSelector(state => state.products)
    let total_items = useSelector(state => state.total_items)
    let product_counter = useSelector(state => state.product_counter)

    async function addToCart(product) {
        dispatch({
            type: set_total_items,
            total_items: ++total_items
        })
        incrementCart(product)
        dispatch({
          type: set_total_cost,
          total_cost: await calculateTotal(products)
        })
    }

    async function incrementCart(product) {
        if(!(product.id in products)) {
          products[product.id] = [product]
          product_counter[product.id] = 1
        } else {
            products[product.id].push(product)
            product_counter[product.id] += 1
        }
        dispatch({type: set_products, products: products})
        dispatch({type: set_product_counter, product_counter: product_counter})
    }

    return (
        <div className="cart-container-product-quantity-increment">
                  <span className="cart-product-quantity-increment" onClick={() => addToCart(product)}>
                      +
                  </span>
        </div>
    )
}

function ProductQuantity({products, id1}) {
    let product_counter = useSelector(state => state.product_counter)
    let total_items = useSelector(state => state.total_items)

    const dispatch = useDispatch()

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
      dispatch({
          type: set_total_cost,
          total_cost: await calculateTotal(products)
        })
    }

    return (
        <div className="cart-container-product-quantity">
              <div className="cart-product-quantity">
                <ProductQuantityDecrementer product={products[id1][0]} />
                <div className="cart-container-product-quantity-label">
                  <span className="cart-product-quantity-label">
                    {product_counter[id1]}
                  </span>
                </div>
              </div>
                <ProductQuantityIncrementer product={products[id1][0]} />
              <hr className="cart-product-quantity-divider"/>
              <span className="cart-product-quantity-delete" onClick={() => clearFromCart(products[id1][0])}>Delete</span>
            </div>
    )
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

function CartProduct({products, id1}) {
    return (<div className='cart-product' key={products[id1][0].id}>
          <img className='cart-product-image' src={products[id1][0].name && require(`../../assets/${products[id1][0].img}`)} alt={`${products[id1][0].name}`}/>
          <div className='cart-product-info'>
            <ProductHeader product={products[id1][0]}/>
            <ProductStock product={products[id1][0]}/>
            <div>{products[id1][0].description}</div>
            <ProductQuantity products={products} id1={id1} />
          </div>
        </div>)
}

function CartMain({
      products,
      total_items,
      total_cost
}) {
    return (<div className='cart-container-products'>
            <CartHeader/>
        {/* needs if statement here when product is removed*/}
        {Object.entries(products).length !== 0 ? (Object.keys(products).map((key) => (
            products[key][0] &&
            <CartProduct products={products} id1={key} />
        )))
         :
        (<CartEmpty />)
        }
        <div className="cart-container-subtotal-container">
          <SubTotal total_items={total_items} total_cost={total_cost} />
          <span className="cart-margin-subtotal" id="cart-margin-subtotal"/>
        </div>
    </div>)
}

function CheckOut({total_items, total_cost}) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    function checkout() {
      if (user) {
        navigate('/checkout')
      } else {
        navigate('/login')
      }
    }

    return (<div className='cart-container-subtotal-checkout'>
          <div className='cart-subtotal-checkout'>
            <SubTotal total_items={total_items} total_cost={total_cost} />
            <span className="cart-margin-checkout" id="cart-margin-checkout"/>
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