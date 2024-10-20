const Filter = ({ check, handleCheckChange }) => {
  return (
    <div>
      Filter shown with <input value={check} onChange={handleCheckChange} />
    </div>
  );
};

export default Filter;
