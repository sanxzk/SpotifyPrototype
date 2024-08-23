import React from 'react'
import logo from '../../assets/logo.png'
import profile from '../../assets/Profile.png'
import './HomeLeftBar.css'

const HomeLeftBar = () => {
  return (
    <div className='home-leftbar-container'>
       <img src={logo} alt="logoImg" className='home-logo'/>
      <img src={profile} alt="profile-img" className='home-profile'/>
    </div>
  )
}

export default HomeLeftBar;
