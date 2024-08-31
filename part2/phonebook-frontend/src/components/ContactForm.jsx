import React, { useState } from "react";
import InputForm from "./InputForm";
import phoneServices from "../services/phone";

const ContactForm = ({ persons, setPersons, showNotification}) => {
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
    id: "",
  });


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
            setPersons(
              persons.map((p) => (p.id === person.id ? updatedContact : p))
            );
            showNotification(`Updated ${updatedContact.name}`);
          })
          .catch((error) => {
            showNotification(
              `Information of ${newContactToAdd.name} has already been removed from the server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      phoneServices
        .create(newContactToAdd)
        .then((res) => {
          setPersons([...persons, res]);
          showNotification(`Added ${res.name}`);
        })
        .catch((err) => {
          showNotification(
            `${err.response.data.error}`
          );
        });
    }
    setNewContact({ name: "", number: "" });
  };

  return (
    <div>
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
