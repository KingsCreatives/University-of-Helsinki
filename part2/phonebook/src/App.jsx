import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";
import phoneServices from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([]);

   useEffect(() => {
    phoneServices
    .getAll()
    .then(res => {
      setPersons(res)
    })
    .catch(err => {
      console.error(err)
    })
   }, []);
  

  const [filter, setFilter] = useState("");

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <InputForm
          type="text"
          label="filter shown with"
          onChange={handleInputChange}
          value={filter}
        />
      </div>

      <div>
        <ContactForm persons={persons} setPersons={setPersons} />
        <ul>
          {filteredList.map((person) => (
            <Contact
              key={person.id}
              name={person.name}
              number={person.number}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
