const Persons = ({ checkName, onDelete }) => {
  return (
    <ul>
      {checkName.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}{" "}
          <button onClick={() => onDelete(person.id, person.name)}>
            Delete
          </button>{" "}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
