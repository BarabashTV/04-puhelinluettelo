const Persons = ({ checkName }) => {
  return (
    <ul>
      {checkName.map((person) => (
        <li key={person.name}>
          {person.name}: {person.phone}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
