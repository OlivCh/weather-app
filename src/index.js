let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
let time = `${now.getHours()}:${now.getMinutes()}`;
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
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
document.querySelector("#time").innerHTML = `${day}, ${time}`;
document.querySelector("#date").innerHTML = `${date} ${month}, ${year}`;

function showResult() {
  let input = document.querySelector("#input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = input.value;

  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
let button = document.querySelector("#searchButton");
button.addEventListener("click", showResult);

function changeTemp() {
  let changeButton = document.querySelector("span");
  let temp = document.querySelector("#temperature");
  if (changeButton.innerHTML === "| °F") {
    changeButton.innerHTML = "| °C";
    temp.innerHTML = `${temp * (9 / 5) + 32}°F`;
  } else {
    changeButton.innerHTML = "| °F";
    temp.innerHTML = "25°C";
  }
}

let changeButton = document.querySelector("span");
changeButton.addEventListener("click", changeTemp);

// weather changing section
function showTemp(position) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(position.data.main.temp) + "°C";
}

function handlePosition(position) {
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getLocation);
