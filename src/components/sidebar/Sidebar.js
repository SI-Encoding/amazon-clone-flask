import React from 'react'
import './Sidebar.css'
import Avatar from '../../assets/amazon-profile-icon.png'
import GrayArrow from '../../assets/amazon-gray-arrow-icon.png'
import DarkArrow from '../../assets/amazon-dark-arrow-icon.png'
import GrayDownArrow from '../../assets/amazon-gray-down-arrow-icon.png'
import Globe from '../../assets/amazon-globe-icon.png'
import Flag from '../../assets/amazon-mini-canada-flag.png'
import Cancel from '../../assets/amazon-cancel-icon.png'
export default function Sidebar() {
  return (
    <div className="sidebar-container">
        <img src={Cancel} className='sidebar-cancel'/>
        <div className="sidebar-header">
            <div className='sidebar-avatar'>
                <img src={Avatar}/>
            </div>
            <div className="sidebar-username">
                <b>Hello, sign in</b>
            </div>
        </div>
        <div className="menu-content">
            <div className="menu-unorderedlist">
                <h4>
                    Trending
                </h4>
                <a>Best Sellers</a>
                <a>New Releases</a>
                <a>Movers & Shakers</a>
            
            <div className="menu_divider"></div>
                <h4>
                    Digital Content And Devices
                </h4>
                <a><div>Echo & Alexia <img src={GrayArrow}/></div></a>
                <a><div>Fire Tablets & Fire TV <img src={GrayArrow}/></div></a>
                <a><div> Kindle <img src={GrayArrow}/></div></a>
                <a><div> Audible Audiobooks <img src={GrayArrow}/></div></a>
                <a><div> Amazon Prime Video <img src={GrayArrow}/></div></a>
                <a><div> Amazon Music <img src={GrayArrow}/></div></a>
                <a><div> Appstore for Android <img src={GrayArrow}/></div></a>
                <div className="menu_divider"></div>
                <h4>
                    Shop By Department
                </h4>
                <a><div> Books <img src={GrayArrow}/></div></a>
                <a><div> Video Geams & Prime Gaming <img src={GrayArrow}/></div></a>
                <a><div> Music, Movies & TV Shows <img src={GrayArrow}/></div></a>
                <a><div> Electronics, Computers & Office <img src={GrayArrow}/></div></a>
                <a> Sell All <img src={GrayDownArrow}/></a>
                <h4>
                    Programs & Features
                </h4>
                <a><div> Amazon Prime <img src={GrayArrow}/></div></a>
                <a><div> Savings Programs <img src={GrayArrow}/></div></a>
                <a><div> Gift Cards <img src={GrayArrow}/></div></a>
                <a><div> Boutiques Francophones <img src={GrayArrow}/></div></a>
                <a> See All <img src={GrayDownArrow}/></a>
                <div className="menu_divider"></div>
                <h4>
                 Help & Settings
                </h4>
                <a>Your Account</a>
                <a><img src={Globe} style={{width: '15px', height: '15px', marginLeft: '0', marginRight: '10px'}}/>English</a>
                <a><img src={Flag} style={{width: '20px', height: '15px', marginLeft: '0', marginRight: '5px'}}/>Canada</a>
                <a>Help</a>
                <a>Sign in</a>
            </div>
        </div>


    </div>
  )
}
