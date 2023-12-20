const Header = (prop) =>{
  return(
    <div>
      <h1>{prop.course}</h1>
    </div>
  )
}

const Part = (props) =>{
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  )
}

const Content = (props) =>{
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return(
    <div>
       <p><Part name={part1} number={exercises1}/></p>
       <p><Part name={part2} number={exercises2}/></p>  
       <p><Part name={part3} number={exercises3}/></p>  
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
       <p>{props.number}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <h1><Header course={course}/></h1>
      <p><Content/></p>
    </div>
  )
}

export default App