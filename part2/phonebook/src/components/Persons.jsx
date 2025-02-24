const Persons = ({ persons, search, handleDelete }) => {
    const personsToShow = search === ''
      ? persons
      : persons.filter(person => 
          person.name.toLowerCase().includes(search.toLowerCase())
        )
  
    return (
      <div>
        {personsToShow.map(person =>
          <div key={person.id}>
            <p>Name: {person.name} Phone: {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
          </div>
        )}
      </div>
    )
  }
  
  export default Persons