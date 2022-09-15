import React from 'react'
import './Home.css'
import {useSelector, useDispatch} from 'react-redux'
import {set_popup, } from '../../rootReducer'
import FeaturedProducts from './FeaturedProducts'

let images = new Array(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH7cLZviP-ZUE3vudaLW0PWlrG0bEitXK-Wy10FbYDJD4V-6qG',
    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTIRs5XX-M-tuYMFySCSbXd1Oomv-4z7mgJI6c2_wxIy_CDDKmj',
    'https://thumbs.dreamstime.com/b/tula-russia-january-amazon-logo-iphone-display-214570405.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/NYNY/Fuji_TallHero_NYNY_en_US_1x._CB412256579_.jpg',
    'https://media.istockphoto.com/photos/amazoncom-fulfillment-center-amazon-is-the-largest-internetbased-in-picture-id1154816450?k=20&m=1154816450&s=612x612&w=0&h=IoX69e8h-HarF7SaY5asGGDJ8S0DeLyFIXvqkL1f0xk=',
    'https://media.istockphoto.com/photos/amazon-headquarters-located-in-silicon-valley-picture-id1064235628?k=20&m=1064235628&s=612x612&w=0&h=2FtT_pE987FzbPzWN8B4ZGxi2SJtXXU4Ul3JEGvuw8c='
    )
    
let index = 3;
function Home() {
    const popup = useSelector(state => state.popup)
    const dispatch = useDispatch()

    const setPopup = () => {
        dispatch({
            type: set_popup,
            popup: false
        })
    }

    const prevImage = () => {
        let checkIndex = index;
        if (--checkIndex !== -1) {
        document.getElementById('slider').style.backgroundImage = `url(${images[--index]})`;
        } else {
            index = 6;
            document.getElementById('slider').style.backgroundImage = `url(${images[--index]})`;
        }
    }

    const nextImage = () => {
        let checkIndex = index;
        if (++checkIndex !== 6) {
        document.getElementById('slider').style.backgroundImage = `url(${images[++index]})`;
        } else {
            index = -1;
            document.getElementById('slider').style.backgroundImage = `url(${images[++index]})`;
        }
    }
    return (
        <>
            <div className="home-container">
                <div className="body-container">
                    <div className="body" id="slider">
                        <div className="body-hero-arrows">
                            <img className="body-hero-arrow-left" src={require("../../assets/amazon-arrow-left.png")} alt="arrow-left" onClick={() => prevImage()}/> 
                            <img className="body-hero-arrow-right" src={require("../../assets/amazon-arrow-right.png")} alt="arrow-right" onClick={() => nextImage()}/>
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