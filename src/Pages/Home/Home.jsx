import React from 'react'
import './Home.css'
import HomeLeftBar from '../../Components/HomeLeftBar/HomeLeftBar'
import HomeMiddleBar from '../../Components/HomeMiddleBar/HomeMiddleBar'
import Player from '../../Components/Player/Player'
 

const Home = () => {
  return (
    <div className='home'>
    <div className="home-leftbar">
      <HomeLeftBar/>
    </div>

    <div className="home-middlebar">
      <HomeMiddleBar/>
    </div>

    <div className="home-player">
        <Player/>
    </div>
    </div>
  )
}

export default Home
