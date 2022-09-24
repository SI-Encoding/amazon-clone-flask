import React,{useEffect, useState} from 'react'
import './FeaturedProducts.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {set_selected_product} from '../../rootReducer'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useEffect(()=> {
   const fetchProducts = async ()=> {
     const res = await axios.get('http://localhost:5000/products')
     setProducts(res.data.data);
     console.log(res.data.data);
     res.data.data[0].img = "amazon-product-vacuum.jpg";
   }  
   fetchProducts()
  },[])

  async function selectProduct(product) {
        dispatch({
            type: set_selected_product,
            selectedProduct: product.id,
        })
  }

  return (
        <div className="featured-container">
            <div className="featured-heading">
                <h1>
                    Today's deals
                </h1>
            </div>
            <div className="featured-products">
                { products.map(product => (
                    <div>
                        <Link to={`product/:${product.name}/:${product.id}`} onClick={(e) => selectProduct(product)}>
                            <img className="featured-image" src={require(`../../assets/${product.img}`)} alt={`${product.name}`}/>
                        </Link>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                    )
                )}
            </div>
        </div>
  )
}

export default FeaturedProducts