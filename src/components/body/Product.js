import React,{useEffect, useState} from 'react'
import './Product.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {set_total_items, set_products, set_product_counter, set_total_cost} from '../../rootReducer'
import {useNavigate} from 'react-router-dom'

function Product() {
  const productId = useSelector(state => state.selectedProduct)
  let products = useSelector(state => state.products)
  let total_items = useSelector(state => state.total_items)
  let product_counter = useSelector(state => state.product_counter)
  const user = useSelector(state => state.user)
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

function checkout(e) {
  if(user) { 
    navigate('/checkout');  
  } else {
    CheckoutToCart(displayProduct, e); 
    navigate('/login')
  }
}

  return (
    <div className="product-left-and-right" >
      <div className='product-main-container'>
        <div className='product-product' >
          <img className='product-product-image' src={ displayProduct.img && require(`../../assets/${displayProduct.img}`)} alt={`${displayProduct.name}`}/>
          <div className='product-product-info'>
            <div className="product-product-info-header">
              <h1 className='product-product-title'>
                {displayProduct.name}
              </h1>
            </div>    
            <div style={{marginTop:"15px"}}>    
              <span className="product-product-subtotal" style={{marginLeft: "0", marginRight: "22px", paddingLeft: "5px"}}> <strong>${displayProduct.price}</strong></span>
              <div style={{borderBottom: "1px solid #e7e7e7", marginTop: "20px"}}></div> 
            </div>
            <div>    
              <h1 className="product-product-subtotal" style={{fontSize: "16px!important", lineHeight: "24px!important", fontFamily: "sans serif", fontWeight: "700"}}>About this item</h1> 
              <li>{displayProduct.description}</li>
            </div>    
          </div>
        </div>    
      </div>
      <div className='product-right'>
        <div className='subtotal'>
          <span className="product-product-subtotal" style={{marginLeft: "0", marginRight: "auto", paddingLeft: "5px"}}> <strong>${displayProduct.price / 100}</strong></span>
          {/* if statement here product.inventory !== 0*/}
          { displayProduct.inventory !== 0 ? <p className="product-product-subtotal" style={{marginLeft: "0", marginRight: "auto", paddingLeft: "5px", color: "#007600!important", fontSize: "14px!important",
          lineHeight: "20px!important"}}>In stock.</p> :
          <p className="product-product-subtotal" style={{marginLeft: "0", marginRight: "auto", paddingLeft: "5px", color: "#007600!important", fontSize: "14px!important",
          lineHeight: "20px!important"}}>Out of stock.</p> }
          <span>Quantity:</span>
          <select style={{border: "1px solid #DDD", borderRadius: "4px 4px 4px 4px", padding: "3px"}}>{[1,2,3,4,5].slice(0, displayProduct.inventory < 5 ? displayProduct.inventory : 5).map(opt => (<option value={opt}>{opt}</option>)) }</select>
          <button onClick={(e)=> addToCart(displayProduct, e)}>Add to Cart</button>
          <button style={{background: "#FFA41C" , borderColor: "#FF8F00"}} onClick={(e)=> checkout(e)}>Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default Product