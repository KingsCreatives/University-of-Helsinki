import React from "react";

const Course = ({ course }) => {
  const { name, parts } = course;

  const sum = parts.reduce((prev, cur) => prev + cur.exercises, 0);

  return (
    <div>
      <h1>{name}</h1>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <h3>total of {sum} exercises</h3>
    </div>
  );
};

export default Course;
