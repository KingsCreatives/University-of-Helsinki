import React from 'react'

function MainContent() {
  return (
    <main className='container main center'>
        <div>
            <h1 className='main--name'>Laura Smith</h1>
            <h3 className='main--position'>Frontend Developer</h3>
        </div>
        <button className='main--btn'>Email</button>
        <div className='main--about'>
            <h1>About</h1>
            <p>I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.</p>
        </div>
        <div className='main--interest'>
            <h1>Interest</h1>
            <p>Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.</p>
        </div>
    </main>
  )
}

export default MainContent