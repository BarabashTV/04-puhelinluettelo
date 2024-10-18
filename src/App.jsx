import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState("");

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

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      phone: phone,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setPhone("");
  };

  const checkName = persons.filter((person) =>
    person.name.toLowerCase().includes(check.toLowerCase())
  );
  console.log("check name", checkName);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={check} onChange={handleCheckChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={person.name}>
            {person.name}: {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
