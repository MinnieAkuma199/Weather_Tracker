
var inputEL = $('#myinput');
var currentWeatherEl = $("#currentWeather");
var pastCity = JSON.parse(localStorage.getItem("userCity"))?JSON.parse(localStorage.getItem("userCity")):[];
var fiveDayEl = $("#fiveDay");
//creating a function so that i can change coordinates in the global scope
function getWeatherNow(lat, lon) {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=211f702161aca440a9963b1e1017de20";
    $.ajax({
      url: requestUrl,
      method: "GET",
    }).then(function (response) {
        console.log(response);
        // console.log(response.main.temp);
        // console.log(response.wind.speed);
        // console.log(response.main.humidity);
      currentWeather(response.current);
      fiveDayWeather(response.daily);
    });
}

function geomapping(cityname) {
    var requestUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityname + "&limit=1&appid=211f702161aca440a9963b1e1017de20";
    $.ajax({
      url: requestUrl,
      method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response[0].lat);
        console.log(response[0].lon);
        var lat = response[0].lat;
        var lon = response[0].lon;
        getWeatherNow(lat, lon)
    });
}

//function for current weather
function currentWeather(weather) {
  currentWeatherEl.html("") 
  console.log(weather)
  var temp = document.createElement("p");
  temp.textContent = "Temperature: " + weather.temp;
  var wind = document.createElement("p");
  wind.textContent = "Wind: " + weather.wind_speed;
  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + weather.humidity;
  currentWeatherEl.append(temp, wind, humidity);
}

function fiveDayWeather(daily) {
  console.log(daily)
  fiveDayEl.html("");
  for (let i = 1; i < 6; i++) {
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var temp = document.createElement("p");
    temp.textContent = "Temperature: " + daily[i].temp.day;
    var wind = document.createElement("p");
    wind.textContent = "Wind: " + daily[i].wind_speed;
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + daily[i].humidity;
    card.append(temp, wind, humidity); //append different varaibales you declared above to card
    fiveDayEl.append(card) //apend to page
  }
    
}

//need a function to display search history onto page

//storing in local storeage user input
$("#mybutton").click(function (event) {
    event.preventDefault();
    var city = $("#myinput").val();
    pastCity.push(city);
    localStorage.setItem("userCity", JSON.stringify(pastCity));
    geomapping(city)
})
