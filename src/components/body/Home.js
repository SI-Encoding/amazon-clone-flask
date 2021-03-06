import React from 'react'
import './Home.css'
import {useSelector, useDispatch} from 'react-redux'
import {set_popup, } from '../../rootReducer'
import FeaturedProducts from './FeaturedProducts'


function Home() {
    const popup = useSelector(state => state.popup)
    const dispatch = useDispatch()

    const setPopup = () => {
        dispatch({
            type: set_popup,
            popup: false
        })
    }

    return (
        <>
            <div className="home-container">
                <div className="body-container">
                    <div className="body">
                        <div className="body-hero-arrows">
                            <img className="body-hero-arrow-left" src={require("../../assets/amazon-arrow-left.png")} alt="arrow-left"/> 
                            <img className="body-hero-arrow-right" src={require("../../assets/amazon-arrow-right.png")} alt="arrow-right"/>
                        </div>  
                        <div className="body-hero-containers">
                            <div className="body-hero-container-1">
                                <h1 className="body-hero-heading-1"> Today's deals </h1>   
                                <div className="body-hero-container">
                                    <img className="body-hero-image-1" src={require("../../assets/amazon-product-vacuum.jpg")} alt="vacuum-cleaner"/>
                                    <div className="body-hero">
                                        <span className="body-hero-product">
                                        <span>21</span><span >% off</span></span> <span className="body-discount">Top deal</span>
                                    </div>
                                    <div className="body-price-container">
                                        <span className="body-price">$11.99</span>
                                    </div>
                                    <div className="body-listprice-container">
                                        <span className="body-listprice">List Price</span>
                                        <span className="body-full-price">$12.99</span>
                                    </div>
                                </div>
                            </div>
                            <div className="body-hero-container-2">
                                <h1 className="body-hero-heading-1"> Today's deals </h1>   
                                <div className="body-hero-container">
                                    <img className="body-hero-image-1" src={require("../../assets/amazon-product-vacuum.jpg")} alt="vacuum-cleaner"/>
                                    <div className="body-hero">
                                        <span className="body-hero-product">
                                        <span>21</span><span >% off</span></span> <span className="body-discount">Top deal</span>
                                    </div>
                                    <div className="body-price-container">
                                        <span className="body-price">$11.99</span>
                                    </div>
                                    <div className="body-listprice-container">
                                        <span className="body-listprice">List Price</span>
                                        <span className="body-full-price">$12.99</span>
                                    </div>
                                </div>
                            </div>
                            <div className="body-hero-container-3">
                                <h1 className="body-hero-heading-1"> Today's deals </h1>   
                                <div className="body-hero-container">
                                    <img className="body-hero-image-1" src={require("../../assets/amazon-product-vacuum.jpg")} alt="vacuum-cleaner"/>
                                    <div className="body-hero">
                                        <span className="body-hero-product">
                                        <span>21</span><span >% off</span></span> <span className="body-discount">Top deal</span>
                                    </div>
                                    <div className="body-price-container">
                                        <span className="body-price">$11.99</span>
                                    </div>
                                    <div className="body-listprice-container">
                                        <span className="body-listprice">List Price</span>
                                        <span className="body-full-price">$12.99</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <FeaturedProducts/>
                    <hr style={{height: "20px", border: "none", margin: "0"}}/>
                </div>
            </div>
            {popup && 
                <div className="demo-container">
                    <span className="demo-span">Note: we are not an ecommerce store that sells products. <br/> This web application is just for demonstration purposes. <br/> We are not
                        affiliated with Amazon in anyway.
                    </span>
                    <button className="demo-button" onClick={()=> setPopup()}>ok</button>
                </div>
            }
        </>
    )
}

export default Home