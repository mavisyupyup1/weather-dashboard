var searchCityEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityname");
var getWeatherBtn = document.querySelector("#get-weather-btn");
var displayCurrentWeatherEl =document.querySelector(".current-container")
var displayForecastEl = document.querySelector(".forecast-container");


var formSubmitHandler = function(event){
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName){
        getWeatherByCity(cityName);
        cityInputEl.value="";
        displayCurrentWeatherEl.textContent="" ;
        displayForecastEl.textContent="";
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
var lon=data.coord.lon;
var lat=data.coord.lat;
var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly&appid=edb3e86f7793d7328b162e4bdd86e417"
fetch(oneCallApiUrl).then(function(response){
    response.json().then(function(oneCallData){
        console.log(oneCallData);
        displayWeather(data,oneCallData);
    })
})
         
        });
    } else{
        alert("Error: City Name Not Found.")
    }
    })
    .catch(function(error){
        alert("Unable to connect to OpenWeather.")
    });
   
};

var displayWeather =function(weather,oneCallWeather){

//     WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
var cityDisplayName =  weather.name;
var currentDate = moment.unix(weather.dt).format("MM/DD/YYYY");
var cityDisplayNameEl = document.createElement("h2");
var iconCode = weather.weather[0].icon;
var iconUrl = `<img src="https://openweathermap.org/img/w/${iconCode}.png" />`;
cityDisplayNameEl.innerHTML = cityDisplayName +" ("+ currentDate + ")" + iconUrl;
displayCurrentWeatherEl.appendChild(cityDisplayNameEl);
var temperature = weather.main.temp;
var wind =  weather.wind.speed;
var humidity = weather.main.humidity;
var temperatureEl = document.createElement("p");
temperatureEl.textContent = "Temp: "+ temperature + " °F";
displayCurrentWeatherEl.appendChild(temperatureEl);

var windEl = document.createElement("p");
windEl.textContent = "Wind: "+ wind + " MPH";
displayCurrentWeatherEl.appendChild(windEl);

var humidityEl = document.createElement("p");
humidityEl.textContent = "Humidity: "+ humidity + " %";
displayCurrentWeatherEl.appendChild(humidityEl);

for (var i=2;i<7;i++){


    var cityForecast = {
date:moment.unix(oneCallWeather.daily[i].dt).format("MM/DD/YYYY"),
icon:oneCallWeather.daily[i].weather[0].icon,
temp:oneCallWeather.daily[i].temp.day,
wind:oneCallWeather.daily[i].wind_speed,
humidity:oneCallWeather.daily[i].humidity,
};
var iconUrl = `<img src="https://openweathermap.org/img/w/${cityForecast.icon}.png"/>`;

//var forecastCardEl = document.querySelector(".card-"+[i])
var forecastDateDisplay = document.createElement("card")
forecastDateDisplay.className = "card bg-primary"
forecastDateDisplay.innerHTML= cityForecast.date + iconUrl
+ cityForecast.temp+cityForecast.wind+cityForecast.humidity;
displayForecastEl.appendChild(forecastDateDisplay);

}


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
};

getWeatherBtn.addEventListener("click",formSubmitHandler);