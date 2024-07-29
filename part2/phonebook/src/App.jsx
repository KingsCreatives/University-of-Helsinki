import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";
import phoneServices from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState('')
  

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

  const handleDeleteContact = async (id) => {
    const contactToDelete = persons.find(ele => ele.id === id)
    const confirmDelete = window.confirm(`Delete ${contactToDelete.name}`);
    if (confirmDelete) {
      try {
        await phoneServices.removeItem(id);
        setPersons(persons.filter((person) => person.id !== id));
      } catch (err) {
        console.error("Error deleting contact:", err);
      }
    }
  }


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
              id={person.id}
              onDelete={()=> handleDeleteContact(person.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
