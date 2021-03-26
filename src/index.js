// day and time display

let now = new Date;
let hour = ("0"+now.getHours()).slice(-2);
let minute = ("0"+now.getMinutes()).slice(-2);

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday = weekdays[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = (`${weekday}, ${hour}:${minute}`);

// default location upon page load

    let city = "Vienna";
    let apiKey = "01bc9da346c1591ec92736f4f11269b6";
    let apiEndpointCurrent = "https://api.openweathermap.org/data/2.5/weather";
    let units = "metric";
    let apiUrlCurrent = `${apiEndpointCurrent}?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrlCurrent).then(displayWeather);

// weather display

function displayWeather(response) {
celsiusTemp = Math.round(response.data.main.temp);
celsiusWind = Math.round(response.data.wind.speed*3.6);

    let currentCity = response.data.name;
    let currentCountry = response.data.sys.country;
    let currentCondition = response.data.weather[0].main;
    console.log(currentCondition);
    let currentHumidity = response.data.main.humidity;
    let h1 = document.querySelector("h1");
    h1.innerHTML = (`${currentCity}, ${currentCountry}`);
    let dispTemp = document.querySelector("#current-temp");
    dispTemp.innerHTML = (`${celsiusTemp}`);
    let dispCondition = document.querySelector("#condition");
    dispCondition.innerHTML = (`${currentCondition}`)
    let dispHumidity = document.querySelector("#humidity");
    dispHumidity.innerHTML = (`${currentHumidity}`);
    let dispWind = document.querySelector("#wind");
    dispWind.innerHTML = (`${celsiusWind}`);
    let dispWindTag = document.querySelector("#wind-tag");
    dispWindTag.innerHTML = "km/h"

    fConversion.classList.remove("active");
    cConversion.classList.add("active");
 
    //define icons
    let weatherIcons = {
        "Clear": {
            "day": "fa-sun",
            "night": "fa-moon"
        },
        "Clouds": {
            "day": "fa-cloud",
            "night": "fa-cloud"
        },
        "Rain": {
            "day": "fa-cloud-showers-heavy",
            "night": "fa-cloud-showers-heavy"  
        },
        "Drizzle": {
            "day": "fa-cloud-rain",
            "night": "fa-cloud-rain"
        },
        "Thunderstorm": {
            "day": "fa-bolt",
            "night": "fa-bolt"  
        },
        "Snow": {
            "day": "fa-snowflake",
            "night": "fa-snowflake"           
        },
        "Haze": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Mist": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Smoke": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Dust": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Fog": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Sand": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Ash": {
            "day": "fa-smog",
            "night": "fa-smog" 
        },
        "Squall": {
            "day": "fa-wind",
            "night": "fa-wind" 
        },
        "Tornado": {
            "day": "fa-exclamation-triangle",
            "night": "fa-exclamation-triangle" 
        }
    }

    // change icon
    let weatherIcon = weatherIcons[`${currentCondition}`].day;
    let dispIcon = document.getElementById("weather-icon");
    dispIcon.removeAttribute("class");
    dispIcon.classList.add("fas", `${weatherIcon}`);
}

// current location button response

let getLocationButton = document.querySelector("#current-location-button");
getLocationButton.addEventListener("click", getNavigation)

function getNavigation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "01bc9da346c1591ec92736f4f11269b6";
    let apiEndpointCurrent = "https://api.openweathermap.org/data/2.5/weather";
    let units = "metric";
    let apiUrlCurrent = `${apiEndpointCurrent}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrlCurrent).then(displayWeather);
}

// search form response

let searchCity = document.querySelector(".search-input");
searchCity.addEventListener("submit", displayCityAndWeather);

function displayCityAndWeather(event) {
    event.preventDefault();
    
    let city = document.querySelector("#search-city").value;
    let apiKey = "01bc9da346c1591ec92736f4f11269b6";
    let apiEndpointCurrent = "https://api.openweathermap.org/data/2.5/weather";
    let units = "metric";
    let apiUrlCurrent = `${apiEndpointCurrent}?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrlCurrent).catch(function(error) {
        if (error.response) {
            let message = document.querySelector("#message");
            message.innerHTML = `Sorry, this location couldn't be found! Please try another location in your area.`;
    } else {
    displayWeather();
    }; 
      })
      message.innerHTML = ``; 
      axios.get(apiUrlCurrent).then(displayWeather);
    }

// convert C to F

function convertToF(event) {
    event.preventDefault();
    let currentCTemp = document.querySelector("#current-temp");
    let currentWind = document.querySelector("#wind");
    let currentWindTag = document.querySelector("#wind-tag");
    let fTemp = (celsiusTemp * 9/5) + 32;
    let fWind = (celsiusWind / 1.609);
    currentCTemp.innerHTML = Math.round(fTemp);
    currentWind.innerHTML = Math.round(fWind);
    currentWindTag.innerHTML = "mph";

    cConversion.classList.remove("active");
    fConversion.classList.add("active");
    }

function convertToC(event) {
    event.preventDefault();
    let currentCTemp = document.querySelector("#current-temp");
    let currentWind = document.querySelector("#wind");
    let currentWindTag = document.querySelector("#wind-tag");
    currentCTemp.innerHTML = celsiusTemp;
    currentWind.innerHTML = celsiusWind;
    currentWindTag.innerHTML = "km/h";

    fConversion.classList.remove("active");
    cConversion.classList.add("active");
}

let celsiusTemp = null;
let celsiusWind = null;

let fConversion = document.querySelector("#convert-to-f");
fConversion.addEventListener("click", convertToF);

let cConversion = document.querySelector("#convert-to-c");
cConversion.addEventListener("click", convertToC);