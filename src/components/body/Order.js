import React,{useState,useEffect} from 'react'
import './Order.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

export default function Order() {
    const user = useSelector(state => state.user)
    const [orders, setOrders] = useState([])

    useEffect(()=> {
        async function getOrders(){
            const res = await axios({method:'get', url:`http://localhost:5000/orders?user_id=${user.userId}`})
            console.log(res.data.data)
            setOrders(res.data.data)
        }
        getOrders()
    },[])

  return (
    <div>
       <h1 className="Order-header"> Your Orders </h1>
        <span className="Order-subtitle">Orders</span>
        {orders.map((order)=> (
            <>
                <div className="Order-container">
                    <div className="Order-container-item-1">
                        <span className="Order-container-item">ORDER PLACED</span> 
                        <span className="Order-container-item">{order.created_date}</span> 
                    </div>
                    <div className="Order-container-item-2">
                        <span className="Order-container-item">TOTAL</span> 
                        <span className="Order-container-item">CDN$ {order.total}</span>
                    </div>
                    <div className="Order-container-item-3">
                        <span className="Order-container-item">SHIP TO</span> 
                        <span className="Order-container-item" style={{color: "#197f91"}}>{user.firstName} {user.lastName}</span>
                    </div>
                    <span className="Order-container-item">ORDER # {order.id}</span>
                </div>
                <h1 className="Order-header-delivery"> Delivered </h1>
                <div>
                    <span className="Order-package">Package was left near the front door or porch</span>
                </div>
                {order.products.map((product)=> (
                    <div className="Order-product-details">
                        <img className="Order-product" src={require("../../assets/amazon-product-vacuum.jpg")}/>
                        <div className="Order-product-info">
                            <span className="Order-product-name">{product.name}</span>
                            <span>Return eligible through</span>
                            <button className="Order-buy-again">Buy it again</button>
                        </div>
                    </div>
                ))}
            </>
        ))}
    </div>
  )
}
