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

    let city = document.querySelector("#search-city").value;
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
    axios.get(apiUrlCurrent).then(displayWeather);
}

// weather display

function displayWeather(response) {
celsiusTemp = Math.round(response.data.main.temp);
celsiusWind = Math.round(response.data.wind.speed*3.6);
console.log(celsiusWind);

    let currentCity = response.data.name;
    let currentIcon = response.data.weather[0].icon;
    let currentCondition = response.data.weather[0].main;
    let currentHumidity = response.data.main.humidity;
    let h1 = document.querySelector("h1");
    h1.innerHTML = (`${currentCity}`);
    let dispTemp = document.querySelector("#current-temp");
    dispTemp.innerHTML = (`${celsiusTemp}`);
    let dispIcon = document.getElementById("weatherIcon");
    dispIcon.src = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    let dispCondition = document.querySelector("#condition");
    dispCondition.innerHTML = (`${currentCondition}`)
    let dispHumidity = document.querySelector("#humidity");
    dispHumidity.innerHTML = (`${currentHumidity}`);
    let dispWind = document.querySelector("#wind");
    dispWind.innerHTML = (`${celsiusWind}`);
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

}

let celsiusTemp = null;
let celsiusWind = null;

let fConversion = document.querySelector("#convert-to-f");
fConversion.addEventListener("click", convertToF);

