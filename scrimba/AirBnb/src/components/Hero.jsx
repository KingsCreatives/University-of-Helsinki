import React from 'react'

function Hero() {
  return (
    <div className="hero">
        <img src="../src/assets/grid.png" alt="grid displaying different experiences" className='hero--img'/>
        <div className='hero--texts'>
          <h1 className='hero-header left'>Online Experiences</h1>
          <p className='hero--para left'>
            Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
        </p>
        </div>
    </div>
  )
}

export default Hero