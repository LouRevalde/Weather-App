async function callApiCity(cityselected, unit) {
  //unit = checkUnit();
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityselected +
    "&units=" +
    unit;

  let apiKey = "fed03514983638a54735d70b1ce10759";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCityTempData);
}

function setCurrent() {
  cityselected = null;
  buttonC.removeEventListener("click", setMetric);
  buttonF.removeEventListener("click", setImperial);
  navigator.geolocation.getCurrentPosition(getPosition);
}

function checkUnit(unit) {
  if (unit === "metric") {
    return (unit = "metric");
  }
  if (unit === "imperial") {
    return (unit = "imperial");
  } else {
    return (unit = "metric");
  }
}

function displayTempC() {
  //unit = checkUnit();

  if (unit === "metric") {
    //unit = "metric";
    callApiCity(cityselected, unit);
    toDegrees();
  } else if (unit === "imperial") {
    unit = "metric";
    callApiCity(cityselected, unit);
    toDegrees();
    return (unit = "metric");
  }
}

function displayTempF() {
  //unit = checkUnit();
  if (unit === "imperial" || unit !== "imperial") {
    unit = "imperial";
    callApiCity(cityselected, unit);
    toFahrenheit();
  }
  return (unit = "imperial");
}

function displayCurrentTempF() {
  if (unit === "metric" || unit !== "metric") {
    unit = "imperial";
    callApiCoords(lat, long, unit);
    toFahrenheit();
  }
}

function displayCurrentTempC() {
  if (unit === "imperial" || unit !== "imperial") {
    unit = "metric";
    callApiCoords(lat, long, unit);
    toDegrees();
  }
}

function getPosition(position) {
  unit = checkUnit();
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log("Latitude: " + lat);
  console.log("Longitude: " + long);
  callApiCoords(lat, long, unit);
}

async function callApiCoords(lat, long, unit) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=" +
    unit;

  let apiKey = "fed03514983638a54735d70b1ce10759";

  //axios.get(`${coordsUrl}&appid=${apiKey}`).then(getLocationName);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCurrentTempData);
  //let coordsUrl = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + long;
}

function displaytemp() {
  if (unit === "metric") {
    toDegrees();
  } else if (unit === "imperial") {
    toFahrenheit();
  }
}

function getCityTempData(response, unit) {
  checkUnit();
  console.log(response.data);
  console.log("Current Temperature: " + response.data.main.temp);
  tempMain = response.data.main.temp;
  tempMax = response.data.main.temp_max;
  tempMin = response.data.main.temp_min;
  pressure = response.data.main.pressure;
  humidity = response.data.main.humidity;
  weathercond = response.data.weather[0].description;

  console.log(tempMax);
  console.log(tempMin);
  console.log(pressure);
  console.log(humidity);
  console.log(weathercond);
  console.log(cityselected);

  displaytemp();
  loadnewAttr(cityselected, "initial", weathercond, "#305050");
  changeIconAttr(newSettings);
  changeIcon();
  showLabels();

  buttonC.addEventListener("click", displayTempC);
  buttonF.addEventListener("click", displayTempF);
}

function getCurrentTempData(response) {
  console.log(response.data);
  console.log("Current Temperature: " + response.data.main.temp);

  tempMain = response.data.main.temp;
  tempMax = response.data.main.temp_max;
  tempMin = response.data.main.temp_min;
  pressure = response.data.main.pressure;
  humidity = response.data.main.humidity;
  weathercond = response.data.weather[0].description;
  currentCity = response.data.name;

  console.log(tempMax);
  console.log(tempMin);
  console.log(pressure);
  console.log(humidity);
  console.log(weathercond);
  console.log(currentCity);

  loadnewAttr(currentCity, "initial", weathercond, "#305050");
  changeIcon();
  changeIconAttr(newSettings);

  if (unit === "metric") {
    toDegrees();
  } else if (unit === "imperial") {
    toFahrenheit();
  }

  buttonC.addEventListener("click", displayCurrentTempC);
  buttonF.addEventListener("click", displayCurrentTempF);
  showLabels();
}

function currentDate(x, daysFormat, monthsFormat) {
  let now = new Date();
  let a = now.getDay();
  let b = now.getDate();
  let c = now.getMonth();
  let d = now.getFullYear();
  x.innerHTML = `${daysFormat[a]} ${b} ${monthsFormat[c]} ${d}`;
}

function setMetric() {
  return (unit = "metric");
}

function setImperial() {
  return (unit = "imperial");
}

function toDegrees() {
  //unit = "metric";
  maintemp.innerHTML = Math.round(tempMain) + "°C";
  tempLow.innerHTML = Math.round(tempMin) + "°C";
  tempHigh.innerHTML = Math.round(tempMax) + "°C";
}

function toFahrenheit() {
  //unit = "imperial";
  maintemp.innerHTML = Math.round(tempMain) + "°F";
  tempLow.innerHTML = Math.round(tempMin) + "°F";
  tempHigh.innerHTML = Math.round(tempMax) + "°F";
}

function currentTime(x) {
  let now = new Date();
  let a = now.getHours();
  let b = now.getMinutes();
  x.innerHTML = `${a}:${b}`;
}

function updateForecastDetails(x) {
  for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = cityselected;
  }
}

function Greeting() {
  changeIconAttr(settings);
  hideTemp();
  hideLabels();
}

function hideTemp() {
  maintemp.style.display = "none";
  tempLow.style.display = "none";
  tempHigh.style.display = "none";
}

function hideLabels() {
  labelLow.style.display = "none";
  labelHigh.style.display = "none";
}

function showLabels() {
  maintemp.style.display = "inline-block";
  tempLow.style.display = "block";
  tempHigh.style.display = "block";
  labelLow.style.display = "block";
  labelHigh.style.display = "block";
}

function changeIconAttr(arr) {
  cityheading.innerHTML = arr[0];
  mainicon.style.opacity = arr[1];
  mainiconlabel.innerHTML = arr[2];
  mainiconlabel.style.color = arr[3];
}

function loadnewAttr(heading, opacity, label, lblcolor) {
  let x = [heading, opacity, label, lblcolor];
  newSettings = x;
}

//learn regex later
function changeIcon() {
  if (weathercond.includes("clear") || weathercond.includes("sun")) {
    mainicon.className = "fa-solid fa-sun";
    mainicon.style.fontSize = "65px";
    mainicon.style.color = "#ffc400";
    //mainiconlabel.style.color = "#ffc400";
  } else if (
    weathercond.includes("cloudy") ||
    weathercond.includes("clouds") ||
    weathercond.includes("overcast")
  ) {
    mainicon.className = "fa-solid fa-cloud";
    mainicon.style.fontSize = "65px";
    mainicon.style.color = "#87cefa";
    //mainiconlabel.style.color = "#87cefa";
  } else if (
    weathercond.includes("few") ||
    weathercond.includes("part") ||
    weathercond.includes("scatter") ||
    weathercond.includes("broke")
  ) {
    mainicon.className = "fa-solid fa-cloud-sun";
    mainicon.style.fontSize = "65px";
    mainicon.style.color = "#ffc400";
    //mainicon.style.color = "#ffc400";
  } else if (
    weathercond.includes("shower") ||
    weathercond.includes("light") ||
    weathercond.includes("medium") ||
    weathercond.includes("moderate")
  ) {
    mainicon.className = "fa-solid fa-cloud-rain";
    mainicon.style.fontSize = "65px";
    mainicon.style.color = "#87cefa";
  }
  //mainiconlabel.style.color = "#87cefa";
  if (
    weathercond.includes("rain") &&
    (weathercond.includes("heavy") ||
      weathercond.includes("storm") ||
      weathercond.includes("thunder") ||
      weathercond.includes("pour"))
  ) {
    mainicon.className = "fa-solid fa-cloud-showers-heavy";
    mainicon.style.fontSize = "65px";
    mainicon.style.color = "#bd98bdc9";
    //mainiconlabel.style.color = "#bd98bdc9";
  }
}

/*function getCity(event) {
  cityselected = citysearch.value.trim();
  console.log(cityselected);
}*/

function submitCity(event) {
  event.preventDefault();
  buttonC.removeEventListener("click", setMetric);
  buttonF.removeEventListener("click", setImperial);
  buttonC.removeEventListener("click", displayCurrentTempC);
  buttonF.removeEventListener("click", displayCurrentTempF);
  cityselected = citysearch.value.trim();
  console.log(cityselected);
  try {
    //unit = checkUnit();
    callApiCity(cityselected, unit);

    updateForecastDetails(forecastdetails);
  } catch (err) {
    console.error(err);
  }
}

//if(clickcity !== undefined || clickcountry !== undefined || clickcity !== "")

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let settings = ["Welcome", "0", "Choose your City", "black"];

let datenow = document.querySelector("#h5-date");
let timenow = document.querySelector("#h5-time");
let cityheading = document.querySelector("h1#city-heading");
let maintemp = document.querySelector(".main-temp");
//let currentTemp = document.querySelectorAll("h1[class=temp]");
let mainicon = document.querySelector("#main-icon");
let mainiconlabel = document.querySelector(".main-icon-sunny");
let forecastdetails = document.querySelectorAll(
  ".content-forecast-details > li"
); //syntax to target children elements from nodelist
let tempLow = document.querySelector("#temp-low");
let tempHigh = document.querySelector("#temp-high");
let citysearch = document.querySelector("#search-box");
//let form = document.querySelector("#search-form");
//let templabels = document.querySelectorAll(".small-heading");
let labelLow = document.querySelector("#low");
let labelHigh = document.querySelector("#high");
//let tempnums = document.querySelectorAll("div > .temp");
let time = new Date();

console.log(time);
console.log(time.toDateString());
currentDate(datenow, days, months);
currentTime(timenow);

let newSettings;

//getting cityoptions for selected country

let cityselected;

Greeting();
//citysearch.addEventListener("input", getCity);

let submit = document.querySelector("#search-form");
submit.addEventListener("submit", submitCity);

let buttonC = document.querySelector("#btn-c");
let buttonF = document.querySelector("#btn-f");
let currentBtn = document.querySelector("#current-btn");

currentBtn.addEventListener("click", setCurrent);
//buttonC.addEventListener("click", setMetric);
//buttonF.addEventListener("click", setImperial);

let unit = "metric";
let lat;
let long;
let tempMain;
let tempMax;
let tempMin;
let pressure;
let humidity;
let weathercond;
let currentCity;