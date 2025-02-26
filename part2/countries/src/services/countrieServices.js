import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const searchCountries = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    const filteredCountries = response.data.filter(country => 
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    
    return filteredCountries;
  } catch (error) {
    throw new Error("Error fetching countries");
  }
};

const getCountryDetails = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/name/${name}`);
    
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }

    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Country not found or API error");
  }
};

export default { searchCountries, getCountryDetails };