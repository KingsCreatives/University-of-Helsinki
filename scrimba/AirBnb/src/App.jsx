import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Card from './components/Card'
import data from './data'


function App() {
   const cards = data.map(card => {
      return(
         <Card
           key = {card.id}
           {...card}
         />
      )
   })
  return (
     <div>
        <Nav/>
        <Hero/>
        <section className='cards--list'>
            {cards}
        </section>
     </div>
  )
}

export default App
