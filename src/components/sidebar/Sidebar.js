import React from 'react'
import './Sidebar.css'
import Avatar from '../../assets/amazon-profile-icon.png'
export default function Sidebar() {
  return (
    <div className="sidebar-container">
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
                <a>Echo & Alexia</a>
                <a>Fire Tablets & Fire TV</a>
                <a>Kindle</a>
                <a>Audible Audiobooks</a>
                <a>Amazon Prime Video</a>
                <a>Amazon Music</a>
                <a>Appstore for Android</a>
                <div className="menu_divider"></div>
                <h4>
                    Shop By Department
                </h4>
                <a>Books</a>
                <a>Video Geams & Prime Gaming</a>
                <a>Music, Movies & TV Shows</a>
                <a>Electronics, Computers & Office</a>
                <a>Sell All</a>
                <h4>
                    Programs & Features
                </h4>
                <a>Amazon Prime</a>
                <a>Savings Programs</a>
                <a>Gift Cards</a>
                <a>Boutiques Francophones</a>
                <a>See All</a>
                <div className="menu_divider"></div>
                <h4>
                    Help & Settings
                </h4>
                <a>Your Account</a>
                <a>English</a>
                <a>Canada</a>
                <a>Help</a>
                <a>Sign in</a>
            </div>
        </div>


    </div>
  )
}
