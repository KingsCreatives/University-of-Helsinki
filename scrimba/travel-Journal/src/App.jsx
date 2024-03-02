import { useState } from 'react'
import Nav from './components/Nav'
import Card from './components/Card'
import travelData from './data'

function App() {
  
   const data = travelData.map(item => {
      return(
         <Card
           key = {item.id}
           {...item}
         />
      )
   })

  return (
     <div className='container'>
        <Nav/>
        <section className='cards'>
            {data}
        </section>
     </div>
  )
}

export default App
