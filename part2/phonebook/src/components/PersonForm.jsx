const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  
    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1 // Add unique id for each new person
      }
      
      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
    }
  
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
    )
  }
  
  export default PersonForm