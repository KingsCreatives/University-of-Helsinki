import React from 'react'

const PersonForm = ({addNewPerson, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
          <br />
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm