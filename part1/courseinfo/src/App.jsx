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
  <p>Number of exercises {first + second + third}</p>
);

const App = () => {
    const course = "Half Stack application development";
    const parts = [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ];

  return (
    <div>
      <Header title={course} />
      <Content
        part1Name={parts[0].name}
        part1Exercise={parts[0].exercises}
        part2Name={parts[1].name}
        part2Exercise={parts[1].exercises}
        part3Name={parts[2].name}
        part3Exercise={parts[2].exercises}
      />

      <Total
        first={parts[0].exercises}
        second={parts[1].exercises}
        third={parts[2].exercises}
      />
    </div>
  );
};

export default App;
