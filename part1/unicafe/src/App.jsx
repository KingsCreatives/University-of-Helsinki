import { useState } from "react";

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodCount = () => setGood((prev) => prev + 1)
  const handleNeutralCount = () => setNeutral((prev) => prev + 1)
  const handleBadCount = () => setBad((prev) => prev + 1)
  
  return (
    <div>
      <Header title={'give feedback'}/>
      <Button text={'good'} handleClick={handleGoodCount}/>
      <Button text={'neutral'} handleClick={handleNeutralCount}/>
      <Button text={'bad'} handleClick={handleBadCount}/>
      <Header title={'statistics'}/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
};

export default App;
