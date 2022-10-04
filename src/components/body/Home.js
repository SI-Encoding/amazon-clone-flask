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

function LeftArrow({prevImage}) {
    return (<img className="body-hero-arrow-left" src={require("../../assets/amazon-arrow-left.png")} alt="arrow-left" onClick={() => prevImage()}/>)
}

function RightArrow({nextImage}) {
    return (<img className="body-hero-arrow-right" src={require("../../assets/amazon-arrow-right.png")} alt="arrow-right" onClick={() => nextImage()}/>)
}

function ListPrice({list_price}) {
    return (<div className="body-listprice-container">
        <span className="body-listprice">List Price</span>
        <span className="body-full-price">{list_price}</span>
    </div>)
}

function ProductTitle({title}) {
    return (<h1 className={`body-hero-heading-${1}`}> {title} </h1>)
}

function ProductImage({image, i}) {
    return (<img className={`body-hero-image-${1}`} src={image} alt="vacuum-cleaner"/>)
}

function ProductBody({percent_off}) {
    return (<div className="body-hero">
        <span className="body-hero-product">
        <span>{percent_off}</span><span >% off</span></span> <span className="body-discount">Top deal</span>
    </div>)
}

function BodyPrice({body_price}) {
    return (<div className="body-price-container"><span className="body-price">{body_price}</span></div>)
}

function ProductTile({image, title, percent_off, body_price, list_price, i}) {
    return (
        <div className={`body-hero-container-${i}`}>
        <ProductTitle title={title}/>
        <div className="body-hero-container">
            <ProductImage image={image} i={i} />
            <ProductBody percent_off={percent_off} />
            <BodyPrice body_price={body_price} />
            <ListPrice list_price={list_price} />
        </div>
    </div>
    )
}

function TodaysDeal({i}) {
    return (<ProductTile image={require("../../assets/amazon-product-vacuum.jpg")} title="Today's Deal" percent_off={"21"} body_price={"$11.99"} list_price={"$12.99"} i={i} />)
}

function DemoPopup() {
    const popup = useSelector(state => state.popup)
    const dispatch = useDispatch()
    const setPopup = () => {
        dispatch({
            type: set_popup,
            popup: false
        })
    }

    return (<div>{popup &&
        <div className="demo-container">
            <span className="demo-span">Note: we are not an ecommerce store that sells products. <br/> This web application is just for demonstration purposes. <br/> We are not
                affiliated with Amazon in anyway.
            </span>
            <button className="demo-button" onClick={()=> setPopup()}>ok</button>
        </div>
    }</div>)
}

function ProductSlider() {
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

    return (<div className="body" id="slider">
        <div className="body-hero-arrows">
            <LeftArrow prevImage={prevImage}/>
            <RightArrow nextImage={nextImage}/>
        </div>
        <div className="body-hero-containers">
            <TodaysDeal i={1} />
            <TodaysDeal i={2} />
            <TodaysDeal i={3} />
        </div>
    </div>)
}

function Home() {
    return (
        <>
            <div className="home-container">
                <div className="body-container"><ProductSlider /><FeaturedProducts/><hr className="body-hr"/></div>
            </div>
            <DemoPopup />
        </>
    )
}

export default Home
