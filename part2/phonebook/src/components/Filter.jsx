const Filter = ({ search, handleSearchChange }) => {
    return (
      <p>Filter show with name <input value={search} onChange={handleSearchChange} /></p>
    )
  }
  
  export default Filter