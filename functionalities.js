import * as ELEMENTS from './elements.js';
export let functions = {
  searchWeather: () => {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length == 0) {
      return alert('Please enter a city name');
    }
  }
};

