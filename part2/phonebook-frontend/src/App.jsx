import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";
import phoneServices from "./services/phone";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  useEffect(() => {
    phoneServices
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [filter, setFilter] = useState("");

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async (id) => {
    const contactToDelete = persons.find((ele) => ele.id === id);
    const confirmDelete = window.confirm(`Delete ${contactToDelete.name}`);
    if (confirmDelete) {
      try {
        await phoneServices.removeItem(id);
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted ${contactToDelete.name}`);
      } catch (err) {
      showNotification(
        `Error deleting ${contactToDelete.name}: ${err.message}`,
        "error"
      );
      }
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <br />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div>
        <InputForm
          type="text"
          label="filter shown with"
          onChange={handleInputChange}
          value={filter}
        />
      </div>

      <div>
        <ContactForm
          persons={persons}
          setPersons={setPersons}
          showNotification={showNotification}
        />
        <ul>
          {filteredList.map((person) => (
            <Contact
              key={person.id}
              name={person.name}
              number={person.number}
              id={person.id}
              onDelete={() => handleDeleteContact(person.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
