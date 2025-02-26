import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import countryService from "./services/countrieServices";

const App = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search.trim()) {
      setLoading(true);
      setError(null);

      countryService
        .getCountries(search)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const countryData = data[0];
            setCountry({
              name: countryData.name.common,
              capital: countryData.capital ? countryData.capital[0] : "No capital",
              population: countryData.population,
              flag: countryData.flags?.svg || countryData.flags?.png,
            });
          } else {
            setError("No country found");
            setCountry(null);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Country not found or API error");
          setCountry(null);
          setLoading(false);
        });
    } else {
      setCountry(null);
      setError(null);
    }
  }, [search]);

  return (
    <div>
      <h1>Country Information App</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {country && !loading && !error && <Country {...country} />}
    </div>
  );
};

export default App;
