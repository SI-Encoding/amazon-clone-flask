import {useDispatch, useSelector} from "react-redux";
import {set_product_counter, set_products, set_total_cost, set_total_items} from "../../rootReducer";
import calculateTotal from "../../helpers";
import './ProductQuantity.css';


function CartClearButton({product}) {
    const dispatch = useDispatch()
    let products = useSelector(state => state.products)
    let product_counter = useSelector(state => state.product_counter)
    let total_items = useSelector(state => state.total_items)

    async function clearFromCart(product) {
        products[product.id].pop()
        product_counter[product.id] -= 1
        delete products[product.id]
        delete product_counter[product.id]

        dispatch({type: set_products, products: products})
        dispatch({type: set_product_counter, product_counter: product_counter})
        dispatch({type: set_total_items, total_items: --total_items})
        dispatch({type: set_total_cost, total_cost: await calculateTotal(products)})
    }

    return (
        //<span className="cart-product-quantity-delete" onClick={() => clearFromCart(products[id1][0])}>Delete</span>
        <span id="clear-cart" onClick={() => clearFromCart(product)}>Delete</span>
    )
}


function ProductQuantityDecrementer({product, quantity}) {
    const dispatch = useDispatch()
    let products = useSelector(state => state.products)
    let total_items = useSelector(state => state.total_items)
    let product_counter = useSelector(state => state.product_counter)

    async function removeFromCart(product) {
        dispatch({type: set_total_items, total_items: --total_items})
        decrementCart(product)
        dispatch({type: set_total_cost, total_cost: await calculateTotal(products)})
      }

    async function decrementCart(product) {
        if(!(product.id in products)) {
          product_counter[product.id] = 0
        } else {
            products[product.id].pop()
            product_counter[product.id] -= 1
        }
        dispatch({type: set_products, products: products})
        dispatch({type: set_product_counter, product_counter: product_counter})
    }

    return (
        <div className="container-inc-dec" id="container-decrement">
                  {
                    (quantity < 2) ?
                      <span id="decrement"> - </span>
                      :
                      <span id="decrement" onClick={() => removeFromCart(product)} disabled={quantity === 1}> - </span>
                  }
                </div>
    )
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
        <div className="container-inc-dec" id="container-increment">
                  <span id="increment" onClick={() => addToCart(product)}>
                      +
                  </span>
                </div>
    )
}

function QuantityLabel({quantity}) {
    return (<div className="cart-container-product-quantity-label"><span className="cart-product-quantity-label">{quantity}</span></div>)
}

function ProductQuantity({product, quantity}) {
    return (
        <div className="cart-container-product-quantity">
              <div className="cart-product-quantity">
                <ProductQuantityDecrementer product={product} />
                <QuantityLabel quantity={quantity} />
                <ProductQuantityIncrementer product={product} />
              </div>
              <hr className="cart-product-quantity-divider"/>
              <CartClearButton />
            </div>
    )
}

export default ProductQuantity

