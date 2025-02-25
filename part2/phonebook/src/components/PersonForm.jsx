import personService from "../services/personService";

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setErrorMessage,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one`
      )) {
        personService.update(person.id, { ...person, number: newNumber }).then((response) => {
          setPersons(persons.map(p => p.id !== person.id ? p : response.data));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`Phone number updated successfully to the phonebook from ${response.data.name}`);
        });
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setErrorMessage(`Phone number added successfully to the phonebook from ${response.data.name}`);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
