import React from 'react'

const Contact = ({name, number}) => {
  return (
    <div>
      <li>
        {name} {number}
      </li>
    </div>
  );
}

export default Contact