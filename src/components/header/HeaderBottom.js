import React, {useState} from 'react'
import './HeaderBottom.css'
import Sidebar from '../sidebar/Sidebar.js'

function PopupSidebar({setOpenMenu}) {
    return (<div className="header-menu-left" onClick={()=>setOpenMenu(true)}>
        <img src={require("../../assets/amazon-icons-menu.png")} alt="amazon-menu"/>
        <span className="header-menu-left-typography">All</span>
    </div>
    )
}

function Nav() {
    let arr = ['Best Sellers', 'Customer Service', 'Deals Store', 'New Releases', 'Prime', 'Fashion', 'Sell', 'Electronics', 'Home', 'Books', 'Toys & Games', 'Computers']
    return (<div className="header-menu-content-container">
        {arr.map((item, index) => {
            return <a className="header-menu-content" key={index}>{item}</a>
        })}
        <a className="header-menu-content">Prime</a><img className="header-menu-content-dropdown" src={require("../../assets/amazon-icons-dropdown-arrow-grey.png")} alt="amazon-dropdown"/>
    </div>)
}

function PrimeLogo() {
    return (<img className="header-menu-right-height" src={require("../../assets/amazon-prime.jpg")}/>)
}

function HeaderBottom() {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className="header-menu-container-bottom">
            <PopupSidebar setOpenMenu={setOpenMenu}/>
            <Nav />
            <div className="header-menu-right">
                <PrimeLogo />
            </div>
            {openMenu && <Sidebar setOpenMenu={setOpenMenu}/>}
        </div>
    )
}

export default HeaderBottom
