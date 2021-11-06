var searchCityEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityname");
var getWeatherBtn = document.querySelector("#get-weather-btn");
var displayCurrentWeatherEl =document.querySelector(".current-container")
console.log(displayCurrentWeatherEl)
var formSubmitHandler = function(event){
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName){
        getWeatherByCity(cityName);
        cityInputEl.value="";
    }
    else{
        alert("Please enter a city name.")
    }
}
var getWeatherByCity = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=edb3e86f7793d7328b162e4bdd86e417";

    //make a request to the url
    fetch(apiUrl)
    .then(function(response){
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
            displayWeather(data,city);
           
        });
    } else{
        alert("Error: City Name Not Found.")
    }
    })
    .catch(function(error){
        alert("Unable to connect to OpenWeather.")
    });
   
};
var displayWeather =function(weather,searchTerm){

//     WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
var cityDisplayName =  weather.name;
var currentDate = moment.unix(weather.dt).format("MM/DD/YYYY");
var cityDisplayNameEl = document.createElement("h2");
cityDisplayNameEl.textContent =cityDisplayName +" ("+currentDate +")" ;
displayCurrentWeatherEl.appendChild(cityDisplayNameEl);

var temperature = weather.main.temp;
console.log(temperature);
var wind =  weather.wind.speed;
console.log(wind);
var humidity = weather.main.humidity;
console.log (humidity);
var temperatureEl = document.createElement("p");
temperatureEl.textContent = "Temp: "+ temperature + " °F";
displayCurrentWeatherEl.appendChild(temperatureEl);

var windEl = document.createElement("p");
windEl.textContent = "Wind: "+ wind + " MPH";
displayCurrentWeatherEl.appendChild(windEl);

var humidityEl = document.createElement("p");
humidityEl.textContent = "Humidity: "+ humidity + " %";
displayCurrentWeatherEl.appendChild(humidityEl);

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
};

getWeatherBtn.addEventListener("click",formSubmitHandler);