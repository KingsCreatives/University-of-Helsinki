import React from "react";
import { useState } from "react";
import InputForm from "./InputForm";

const ContactForm = ({ persons, setPersons }) => {
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
      id: persons.length + 1,
    };

    if (
      persons.some(
        (ele) => ele.name.toLowerCase() === newContactToAdd.name.toLowerCase()
      )
    ) {
      alert(`${newContactToAdd.name} is already added to phonebook`);
    } else {
      setPersons([...persons, newContactToAdd]);
    }

    setNewContact({ name: "", number: "" });
  };

  return (
    <div>
      <h2>add a new contact</h2>
      <form onSubmit={handleAddPerson}>
        <InputForm
          name="name"
          label="name"
          type="text"
          onChange={handleInputChange}
          value={newContact.name}
        />

        <InputForm
          label="number"
          type="number"
          name="number"
          onChange={handleInputChange}
          value={newContact.number}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default ContactForm;
