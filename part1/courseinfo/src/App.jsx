const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
);

const Content = ({
  part1Name,
  part1Exercise,
  part2Name,
  part2Exercise,
  part3Name,
  part3Exercise,
}) => {
  return (
    <div>
      <Part name={part1Name} exercise={part1Exercise} />
      <Part name={part2Name} exercise={part2Exercise} />
      <Part name={part3Name} exercise={part3Exercise} />
    </div>
  );
};

const Total = ({ first, second, third }) => (
  <p>Number of exercises{first + second + third}</p>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header title={course} />
      <Content
        part1Name={part1}
        part1Exercise={exercises1}
        part2Name={part2}
        part2Exercise={exercises2}
        part3Name={part3}
        part3Exercise={exercises3}
      />
      <Total first={exercises1} second={exercises2} third={exercises3} />
    </div>
  );
};

export default App;
