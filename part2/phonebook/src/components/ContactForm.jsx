import React, { useState } from "react";
import InputForm from "./InputForm";
import Notification from "./Notification";
import phoneServices from "../services/phone";

const ContactForm = ({ persons, setPersons}) => {
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
    id: "",
  });

  const [alert, setAlert] = useState('')
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newContactToAdd = {
      name: newContact.name,
      number: newContact.number,
    };

    const person = persons.find(
      (ele) => ele.name.toLowerCase() === newContactToAdd.name.toLowerCase()
    );

    if (person) {
      const confirmUpdate = window.confirm(
        `${newContactToAdd.name} is already added to phonebook. Do you want to update the number?`
      );
      if (confirmUpdate) {
        phoneServices
          .update(person.id, newContactToAdd)
          .then((updatedContact) => {
            phoneServices.getAll().then((updatedContacts) => {
              setPersons(updatedContacts);
            });
          });
      }
    } else {
      phoneServices
        .create(newContactToAdd)
        .then((res) => {
          setPersons([...persons, res])
          setShowNotification(true)
          setAlert(`Added ${newContactToAdd.name}`)
          setTimeout(() => {
            setShowNotification(false)
          }, 5000)
        })
        .catch((err) => console.error(err));
    }
    setNewContact({ name: "", number: "" });
    setShowNotification(false)
  };

  return (
    <div>
      <br />
      {
        showNotification ? <Notification message={alert}/> : null
      }
      <h2>Add a new contact</h2>
      <form onSubmit={handleAddPerson}>
        <InputForm
          name="name"
          label="Name"
          type="text"
          onChange={handleInputChange}
          value={newContact.name}
        />
        <InputForm
          name="number"
          label="Number"
          type="text"
          onChange={handleInputChange}
          value={newContact.number}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ContactForm;
