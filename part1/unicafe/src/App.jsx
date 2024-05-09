import { useState } from 'react'

const Header = ({text}) =>{
  return <h1>{text}</h1>
} 

const Button = ({name, handleClick}) => {
  return <button onClick={handleClick}>{name}</button>
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = ()=>{
    setGood((prev)=> prev + 1)
  }
  const increaseNeutral = ()=>{
    setNeutral((prev)=> prev + 1)
  }
  const increaseBad = ()=>{
    setBad((prev)=> prev + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button name="good" handleClick={increaseGood} />
      <Button name="neutral" handleClick={() => increaseNeutral()} />
      <Button name="bad" handleClick={increaseBad} />
      <Header text="statistics" />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

export default App
