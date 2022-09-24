import React,{useEffect, useState} from 'react'
import './Product.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {set_total_items, set_products, set_product_counter, set_total_cost} from '../../rootReducer'
import {useNavigate} from 'react-router-dom'

function AddToCart({displayProduct, calculateTotal}) {
  let total_items = useSelector(state => state.total_items)
  let product_counter = useSelector(state => state.product_counter)
  const user = useSelector(state => state.user)

  let products = useSelector(state => state.products)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  async function addMultiToCart(product, e) {

  }

  async function addToCart(product, e) {
      // TODO: Total quantity cap...
      let q = e.target.previousSibling.value;
      for (var i = 0; i < parseInt(q); i++) {
          dispatch({
            type: set_total_items,
            total_items: ++total_items
          })
          updateToCart(product)
      }
  }

  async function CheckoutToCart(product, e) {
    let q = e.target.previousSibling.previousSibling.value;
    for (var i = 0; i < parseInt(q); i++) {
        dispatch({
          type: set_total_items,
          total_items: ++total_items
        })
        updateToCart(product)
    }
    calculateTotal()
  }

  async function updateToCart(product) {
    console.log(product)
    if(!(product.id in products)) {
      products[product.id] = [product]
      product_counter[product.id]= 1
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
function checkout(e) {
  if(user) {
    navigate('/checkout');
  } else {
    CheckoutToCart(displayProduct, e);
    navigate('/login')
  }
}

  return (
      <div className='product-right'>
        <div className='subtotal'>
          <span className="product-product-subtotal product-product-subtotal-margin"> <strong>${displayProduct.price / 100}</strong></span>
          {/* if statement here product.inventory !== 0*/}
          { displayProduct.inventory !== 0 ? <p className="product-product-subtotal product-product-subtotal-margin product-product-subtotal-font-and-color product-product-subtotal-font-and-color">In stock.</p> :
          <p className="product-product-subtotal product-product-subtotal-margin product-product-subtotal-font-and-color product-product-subtotal-font-and-color">Out of stock.</p> }
          <span>Quantity:</span>
          <select className="product-add-to-cart-dropdown">{[1,2,3,4,5].slice(0, displayProduct.inventory < 5 ? displayProduct.inventory : 5).map(opt => (<option value={opt}>{opt}</option>)) }</select>
          <button onClick={(e)=> addToCart(displayProduct, e)}>Add to Cart</button>
          <button className="product-add-to-cart-dropdown-color" onClick={(e)=> checkout(e)}>Buy now</button>
        </div>
      </div>
  )
}

function ProductTitle({displayProduct}) {
  return (<div className="product-product-info-header">
    <h1 className='product-product-title'>
      {displayProduct.name}
    </h1>
  </div>)
}

function ProductPrice({displayProduct}) {
  return (<div className="product-price-container">
    <span className="product-product-subtotal product-product-subtotal-margin"> <strong>${displayProduct.price}</strong></span>
    <div className="empty-div-rename"></div>
  </div>)
}

function ProductDescription({displayProduct}) {
  return (<div>
      <h1 className="product-product-subtotal product-product-subtotal-font ">About this item</h1>
      <li>{displayProduct.description}</li>
    </div>)
}

function ProductImage({displayProduct}) {
  return (
      <img className='product-product-image' src={displayProduct.img && require(`../../assets/${displayProduct.img}`)}
           alt={`${displayProduct.name}`}/>)
}

function ProductInfo({displayProduct}) {
  return (<div className='product-product-info'>
    <ProductTitle displayProduct={displayProduct}/>
    <ProductPrice displayProduct={displayProduct}/>
    <ProductDescription displayProduct={displayProduct}/>
  </div>)
}

function Product() {
  const productId = useSelector(state => state.selectedProduct)
  let products = useSelector(state => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [displayProduct, setDisplayProduct] = useState({})

  useEffect(()=>{ 
    async function fetchProduct() {
      const res = await axios.get(`http://localhost:5000/product?product_id=${productId}`)
        console.log("DATA...");
        console.log(res.data);

        res.data.data.img = "amazon-product-vacuum.jpg";
      setDisplayProduct(res.data.data)

    }
    fetchProduct()
  },[])
  console.log(displayProduct)


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

  return (
    <div className="product-left-and-right" >
      <div className='product-main-container'>
        <div className='product-product' >
          <ProductImage displayProduct={displayProduct}/>
          <ProductInfo displayProduct={displayProduct}/>
        </div>    
      </div>
      <AddToCart displayProduct={displayProduct} calculateTotal={calculateTotal} />
    </div>
  )
}

export default Product