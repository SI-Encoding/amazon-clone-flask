import React,{useState,useEffect} from 'react'
import './Order.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {set_selected_product} from '../../rootReducer'


function OrderDetails({user, order}) {
    return (
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
                <span className="Order-container-item order-container-item-color">{user.firstName} {user.lastName}</span>
            </div>
            <span className="Order-container-item">ORDER # {order.id}</span>
        </div>
    )
}

function PackageStatus({status}) {
    return (<>
        <h1 className="Order-header-delivery"> {status[0]} </h1>
        <div>
            <span className="Order-package">{status[1]}</span>
        </div>
    </>)
}

function ProductDetails({product}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function selectProduct(product) {
        dispatch({
            type: set_selected_product,
            selectedProduct: product.id,
        })
    }

    return (<div className="Order-product-details">
        <img className="Order-product" src={require("../../assets/amazon-product-vacuum.jpg")} alt={product.name}/>
        <div className="Order-product-info">
            <span className="Order-product-name">{product.name}</span>
            <span>Return eligible through</span>
            <button className="Order-buy-again" onClick={()=> {selectProduct(product); navigate(`/product/:${product.name}/:${product.id}`);}}>Buy it again</button>
        </div>
    </div>)
}

function Order({user, order}) {
    return (
        <>
                <OrderDetails user={user} order={order} />
                <PackageStatus status={["Delivered", "Package was left near the front door or porch"]} />
                {order.products.map((product)=> (
                    <ProductDetails product={product} />
                ))}
            </>
    )
}
export default function Orders() {
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
            <Order user={user} order={order} />
        ))}
    </div>
  )
}
