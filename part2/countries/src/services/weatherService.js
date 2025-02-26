import axios from "axios";

const apiKey = import.meta.env.VITE_API_WEATHER_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (lat, lon) => {
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  return axios.get(url).then(response => response.data);
};

export default { getWeather };