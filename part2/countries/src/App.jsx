import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import countryService from "./services/countrieServices";
import weatherService from "./services/weatherService";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  function weatherData(countryDetails) {
      // Fetch weather data
      weatherService
      .getWeather(countryDetails.latlng[0], countryDetails.latlng[1])
      .then((weatherData) => {
        setWeather(weatherData);
      })
      .catch((err) => {
        setError("Error fetching weather: " + err.message);
      });
  }
  
  useEffect(() => {
    if (search.trim().length < 1) {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    setLoading(true);
    setSelectedCountry(null);

    countryService
      .searchCountries(search)
      .then((filteredCountries) => {
        setCountries(filteredCountries);
        
        if (filteredCountries.length > 10) {
          setSelectedCountry(null);
        } 
        else if (filteredCountries.length === 1) {
          return countryService.getCountryDetails(filteredCountries[0].name.common);

        }
        
        setLoading(false);
        return null;
      })
      .then((countryDetails) => {
        if (countryDetails) {
          setSelectedCountry({
            name: countryDetails.name.common,
            capital: countryDetails.capital ? countryDetails.capital[0] : "No capital",
            area: countryDetails.area,
            population: countryDetails.population,
            languages: countryDetails.languages,
            flag: countryDetails.flags?.svg || countryDetails.flags?.png,
            latlng: countryDetails.latlng
          });
          // Fetch weather data
          weatherData(countryDetails);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Error: " + err.message);
        setLoading(false);
      });
  }, [search]);

  const handleSelectCountry = (countryName) => {
    setLoading(true);
    countryService
      .getCountryDetails(countryName)
      .then((countryDetails) => {
        if (countryDetails && countryDetails.name) {
          setSelectedCountry({
            name: countryDetails.name.common,
            capital: countryDetails.capital ? countryDetails.capital[0] : "No capital",
            area: countryDetails.area,
            population: countryDetails.population,
            languages: countryDetails.languages,
            flag: countryDetails.flags?.svg || countryDetails.flags?.png,
            latlng: countryDetails.latlng
          });

          // Fetch weather data
          weatherData(countryDetails);
        } 
        setLoading(false);
      })
      .catch((err) => {
        setError("Error: " + err.message);
        setLoading(false);
      });
  };

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
      
      {!loading && countries.length > 10 && search !== '' && (
        <p>Too many matches, please be more specific in your search</p>
      )}
      
      {!loading && countries.length > 1 && countries.length <= 10 && (
        <div>
          <h2>Results:</h2>
          <ul>
            {countries.map(country => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleSelectCountry(country.name.common)}>
                  Show
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedCountry && !loading && <Country {...selectedCountry} weather={weather} />}
    </div>
  );
};

export default App;