import * as ELEMENTS from './elements.js';
import { Http } from "./http.js";
import { WeatherData, WEATHER_PROXY_HANDLER } from "./weather-data.js";

export let functions = {
  searchWeather: async () => {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length == 0) {
      return alert('Please enter a city name');
    }
    const APIKEY = '0773d19c21418bec6a46b58f59a38d89';
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APIKEY;
    try {
      let description = '';
      const responseData = await Http.fetchData(url);
      if (responseData.weather[0] && responseData.weather[0].description) {
        description = responseData.weather[0].description.toUpperCase();
      }
      const WEATHER_DATA = new WeatherData(CITY_NAME, description);
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
    }
    catch (error) {
      return console.log(error);
    }
  }
};

