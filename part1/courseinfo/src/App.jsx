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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header title={course} />
      <Content
        part1Name={part1.name}
        part1Exercise={part1.exercises}
        part2Name={part2.name}
        part2Exercise={part2.exercises}
        part3Name={part3.name}
        part3Exercise={part3.exercises}
      />
      <Total first={part1.exercises} second={part2.exercises} third={part3.exercises} />
    </div>
  );
};

export default App;
