import React,{useEffect} from 'react'
import './Order.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

export default function Order() {
    const user = useSelector(state => state.user)

    useEffect(()=> {
        async function getOrders(){
            const res = await axios({method:'get', url:'http://localhost:5000/orders', data: {user_id: user.id},  headers: {"Content-Type": "multipart/form-data"}})
            console.log(res)
        }
        getOrders()
    },[])
    
  return (
    <div>
       <h1 className="Order-header"> Your Orders </h1>
        <span className="Order-subtitle">Orders</span>
        <div className="Order-container">
          <div className="Order-container-item-1">
            <span className="Order-container-item">ORDER PLACED</span> 
            <span className="Order-container-item">July 3, 2022</span> 
          </div>
          <div className="Order-container-item-2">
            <span className="Order-container-item">TOTAL</span> 
            <span className="Order-container-item">CDN$ 28.88</span>
          </div>
          <div className="Order-container-item-3">
            <span className="Order-container-item">SHIP TO</span> 
            <span className="Order-container-item" style={{color: "#197f91"}}>{user.firstName} {user.lastName}</span>
          </div>
          <span className="Order-container-item">ORDER #</span>
        </div>
       <h1 className="Order-header-delivery"> Delivered </h1>
       <div>
        <span className="Order-package">Package was left near the front door or porch</span>
       </div>
       <div className="Order-product-details">
        <img className="Order-product" src={require("../../assets/amazon-product-vacuum.jpg")}/>
          <div className="Order-product-info">
            <span className="Order-product-name">Unisom Sleep Tablets, 80 Count</span>
            <span>Return eligible through</span>
            <button className="Order-buy-again">Buy it again</button>
          </div>
       </div>
    </div>
  )
}
