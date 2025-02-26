import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getCountries = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}${name}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Country not found or API error");
  }
};

export default { getCountries };