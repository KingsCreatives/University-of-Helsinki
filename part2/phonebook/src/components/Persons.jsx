import React from 'react'

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.map((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ? (
          <p key={persons.indexOf(person)}>
            {person.name} {person.number}
          </p>
        ) : null
      )}
    </div>
  );
}

export default Persons