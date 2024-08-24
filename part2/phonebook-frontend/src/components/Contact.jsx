import React from 'react'


const Contact = ({name, number, id, onDelete}) => {

  return (
    <div>
      <li>
        {name} {number}
       <button onClick={() => onDelete(id)}>delete</button>
      </li>
    </div>
  );
}

export default Contact