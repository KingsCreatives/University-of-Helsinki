import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("")

  const addNewPerson = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <Filter filter={filter} setFilter={handleFilterChange}/>
      <br />
      <PersonForm
      name={newName}
      number={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  );
};

export default App;
