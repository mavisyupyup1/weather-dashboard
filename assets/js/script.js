var searchCityEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityname");
var getWeatherBtn = document.querySelector("#get-weather-btn");
var formSubmitHandler = function(event){
    console.log("Form")
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
            //displayWeather(data,city);
        });
    } else{
        alert("Error: City Name Not Found.")
    }
    })
    .catch(function(error){
        alert("Unable to connect to OpenWeather.")
    });
};
var displayWeather =function(){

}

getWeatherBtn.addEventListener("click",formSubmitHandler);