import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState("");

  useEffect(() => {
    console.log("effect");
    /*axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });*/
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const handleNewNameChange = (event) => {
    console.log("new name click", event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log("phone click", event.target.value);
    setPhone(event.target.value);
  };

  const handleCheckChange = (event) => {
    console.log("check name click", event.target.value);
    setCheck(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("add person click", event.target);

    /*if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }*/

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    console.log(personExists);

    if (personExists) {
      // Если человек существует, спрашиваем подтверждение
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personService
          .update(personExists.id, { ...personExists, number: phone })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : returnedPerson
              )
            );
            setNewName("");
            setPhone("");
          });
      }
      return;
    }
    const newPerson = {
      name: newName,
      number: phone,
    };

    /* axios.post("http://localhost:3001/notes", newPerson).then((response) => {
      console.log(response);
    });*/

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setPhone("");
    });
  };
  const checkName = persons.filter((person) =>
    person.name.toLowerCase().includes(check.toLowerCase())
  );
  console.log("check name", checkName);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Error: ${error.response.data.error}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter check={check} handleCheckChange={handleCheckChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        phone={phone}
        handleNewNameChange={handleNewNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons checkName={checkName} onDelete={handleDelete} />
    </div>
  );
};

export default App;
