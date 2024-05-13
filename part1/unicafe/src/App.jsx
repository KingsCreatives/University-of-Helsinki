import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
   if(good || bad || neutral){
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    );
   }
   return <p>No feedback given</p>
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodCount = () => setGood((prev) => prev + 1);
  const handleNeutralCount = () => setNeutral((prev) => prev + 1);
  const handleBadCount = () => setBad((prev) => prev + 1);

  const all = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <Header title={"give feedback"} />
      <Button text={"good"} handleClick={handleGoodCount} />
      <Button text={"neutral"} handleClick={handleNeutralCount} />
      <Button text={"bad"} handleClick={handleBadCount} />
      <Header title={"statistics"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
