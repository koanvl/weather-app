//current date
let now = new Date();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];

let currentDay = document.querySelector("#current-date .day");
let currentTime = document.querySelector("#current-date .time");
currentDay.innerHTML = `${days[now.getDay()]}`;


if(now.getMinutes()< 10){
	currentTime.innerHTML = `${now.getHours()}:0${now.getMinutes()}`;
}
else {
	currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
}

//Weather API

let apiKey = "3c252ffd932e3d53580c8c66264e47b0";
let unitMetric = "units=metric";
let url = "https://api.openweathermap.org/data/2.5/weather?";
let inputCity = document.querySelector("#input-city");


function showCity(response){
	let cityName = document.querySelector("#city-name");
	let cityTemp = document.querySelector("#temp-data");
	let CityWeatherText = document.querySelector("#city-weather-text");
	let humidity = document.querySelector("#humidity"); 
	let speedWind = document.querySelector("#wind");
	cityName.innerHTML = response.data.name;
	cityTemp.innerHTML = Math.round(response.data.main.temp);
	CityWeatherText.innerHTML = response.data.weather[0].main;
	humidity.innerHTML = response.data.main.humidity;
	speedWind.innerHTML = response.data.wind.speed;

}
function showPosition(position){	
	let currentLongitude = position.coords.longitude;	
	let currentLatitude = position.coords.latitude;
	let currentCityUrl = `${url}lat=${currentLatitude}&lon=${currentLongitude}&${unitMetric}&appid=${apiKey}`;
	axios.get(currentCityUrl).then(showCity);
	inputCity.value = null;	
}

function showCurrentCityWeather(event){
	event.preventDefault();

	navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityBtn = document.querySelector("#current-city-btn");
currentCityBtn.addEventListener("click", showCurrentCityWeather);


function showCityWeather(event){
	event.preventDefault();
	let inputCity = document.querySelector("#input-city");
	let cityUrl = `${url}q=${inputCity.value}&${unitMetric}&appid=${apiKey}`;
	if (inputCity.value.length !== 0){
		axios.get(cityUrl).then(showCity);
	}
	else {
		alert("Oooops! Enter the name of the city!")
	}
	
}
let formSearchCity = document.querySelector("#form-search-city");
formSearchCity.addEventListener("submit", showCityWeather);






