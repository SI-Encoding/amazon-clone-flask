import React from 'react'
import './Sidebar.css'
import Avatar from '../../assets/amazon-profile-icon.png'
import GrayArrow from '../../assets/amazon-gray-arrow-icon.png'
import GrayDownArrow from '../../assets/amazon-gray-down-arrow-icon.png'
import Globe from '../../assets/amazon-globe-icon.png'
import Flag from '../../assets/amazon-mini-canada-flag.png'
import Cancel from '../../assets/amazon-sidebar-cancel-icon.png'

function CloseSideBar({setOpenMenu}) {
    return (<img src={Cancel} className='sidebar-cancel' onClick={()=> {setOpenMenu(false); }}/>)
}

function SideBarHeader() {
    return (
        <div className="sidebar-header">
            <div className='sidebar-avatar'>
                <img src={Avatar}/>
            </div>
            <div className="sidebar-username">
                <b>Hello, sign in</b>
            </div>
        </div>
    )
}

function Trending() {
    return (
        <>
            <h4>Trending</h4><a>Best Sellers</a><a>New Releases</a><a>Movers & Shakers</a>
        </>
    )
}

function DigitalContent() {
    return (
        <>
            <h4>Digital Content And Devices</h4>
            <a><div>Echo & Alexia <img src={GrayArrow}/></div></a>
            <a><div>Fire Tablets & Fire TV <img src={GrayArrow}/></div></a>
            <a><div> Kindle <img src={GrayArrow}/></div></a>
            <a><div> Audible Audiobooks <img src={GrayArrow}/></div></a>
            <a><div> Amazon Prime Video <img src={GrayArrow}/></div></a>
            <a><div> Amazon Music <img src={GrayArrow}/></div></a>
            <a><div> Appstore for Android <img src={GrayArrow}/></div></a>
        </>
    )
}

function ShopByDepartment() {
    return (
        <>
            <h4>Shop By Department</h4>
            <a><div> Books <img src={GrayArrow}/></div></a>
            <a><div> Video Geams & Prime Gaming <img src={GrayArrow}/></div></a>
            <a><div> Music, Movies & TV Shows <img src={GrayArrow}/></div></a>
            <a><div> Electronics, Computers & Office <img src={GrayArrow}/></div></a>
            <a> Sell All <img src={GrayDownArrow}/></a>
        </>
    )
}

function ProgramsAndFeatures() {
    return (
        <>
            <h4>Programs & Features</h4>
            <a><div> Amazon Prime <img src={GrayArrow}/></div></a>
            <a><div> Savings Programs <img src={GrayArrow}/></div></a>
            <a><div> Gift Cards <img src={GrayArrow}/></div></a>
            <a><div> Boutiques Francophones <img src={GrayArrow}/></div></a>
            <a> See All <img src={GrayDownArrow}/></a>
        </>
    )
}

function HelpAndSettings() {
    return (
        <>
            <h4>Help & Settings</h4>
            <a>Your Account</a>
            <a><img className="menu-globe-icon" src={Globe}/>English</a>
            <a><img className="menu-flag-icon" src={Flag}/>Canada</a>
            <a>Help</a>
            <a>Sign in</a>
        </>
    )
}

function Divider() {
    return (<div className="menu_divider"></div>)
}

export default function Sidebar({setOpenMenu}) {
  return (
    <div className="sidebar-container">
        <CloseSideBar setOpenMenu={setOpenMenu} />
        <SideBarHeader />
        <div className="menu-content">
            <div className="menu-unorderedlist">
                <Trending />
                <Divider />
                <DigitalContent />
                <Divider />
                <ShopByDepartment />
                <Divider />
                <ProgramsAndFeatures />
                <Divider />
                <HelpAndSettings />
            </div>
        </div>
    </div>
  )
}
