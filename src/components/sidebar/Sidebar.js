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
            </div>
            <div className="menu_divider"></div>

        </div>


    </div>
  )
}
