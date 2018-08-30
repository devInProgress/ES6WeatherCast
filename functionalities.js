import * as ELEMENTS from './elements.js';
import { Http } from "./http.js";
import { WeatherData, WEATHER_PROXY_HANDLER } from "./weather-data.js";

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}

export let functions = {
  searchWeather: function () {
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim().toUpperCase();
    if (CITY_NAME.length == 0) {
      alert('Please enter a city name');
    }
    const APIKEY = '0773d19c21418bec6a46b58f59a38d89';
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APIKEY;
    let description = '';
    Http.fetchData(URL)
    .then(responseData => {
      if (responseData.weather[0].description) {
        description = responseData.weather[0].description.toUpperCase();
      }
      const WEATHER_DATA = new WeatherData(CITY_NAME, description);
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      if (responseData.main.temp) {
        WEATHER_PROXY.temperature = responseData.main.temp;
      }
      updateWeather(WEATHER_PROXY);
      })
    .catch(error => {
      ELEMENTS.ELEMENT_WEATHER_CITY.textContent = error;
      ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = '';
      ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = '';

      ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
      ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
      console.error(error)
    });
  }
}
