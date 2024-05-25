import React from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div>
        Filter shown with <input value={filter} onChange={setFilter}/>
    </div>
  )
}

export default Filter