// var inputEL = $("#myinput");
// var currentWeatherEl = $("#currentWeather");
// var pastCity = JSON.parse(localStorage.getItem("userCity"))
//   ? JSON.parse(localStorage.getItem("userCity"))
//   : [];
// var fiveDayEl = $("#fiveDay");
// const today = new Date();
// let todaysdate =
//   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

// let tomorrow = todaysdate;
// //creating a function so that i can change coordinates in the global scope
// function getWeatherNow(lat, lon) {
//   var requestUrl =
//     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//     lat +
//     "&lon=" +
//     lon +
//     "&exclude=minutely,hourly,alerts&units=imperial&appid=211f702161aca440a9963b1e1017de20";
//   $.ajax({
//     url: requestUrl,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     // console.log(response.main.temp);
//     // console.log(response.wind.speed);
//     // console.log(response.main.humidity);
//     currentWeather(response.current);
//     fiveDayWeather(response.daily);
//   });
// }

// function geomapping(cityname) {
//   var requestUrl =
//     "https://api.openweathermap.org/geo/1.0/direct?q=" +
//     cityname +
//     "&limit=1&appid=211f702161aca440a9963b1e1017de20";
//   $.ajax({
//     url: requestUrl,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     console.log(response[0].lat);
//     console.log(response[0].lon);
//     var lat = response[0].lat;
//     var lon = response[0].lon;
//     getWeatherNow(lat, lon);
//   });
// }
// $("#todaysDate").text(todaysdate);

// //function for current weather
// function currentWeather(weather) {
//   currentWeatherEl.html("");
//   console.log(weather);
//   var temp = document.createElement("p");
//   temp.textContent = "Temperature: " + weather.temp + " degrees F";
//   var wind = document.createElement("p");
//   wind.textContent = "Wind: " + weather.wind_speed + "mph";
//   var humidity = document.createElement("p");
//   humidity.textContent = "Humidity: " + weather.humidity + "%";
//   currentWeatherEl.append(temp, wind, humidity);
// }

// function fiveDayWeather(daily) {
//   console.log(daily);
//   fiveDayEl.html("");
//   for (let i = 1; i < 6; i++) {
//     var card = document.createElement("div");
//     card.setAttribute("class", "card");
//     card.setAttribute("id", "styleToPage");
//     card.setAttribute("class", "container-fluid");
//     var header = document.createElement("div");
//     header.setAttribute("class", "card-header");
//     header.textContent = tomorrow;
//     var temp = document.createElement("p");
//     temp.textContent = "Temperature: " + daily[i].temp.day;
//     var wind = document.createElement("p");
//     wind.textContent = "Wind: " + daily[i].wind_speed + "mph";
//     var humidity = document.createElement("p");
//     humidity.textContent = "Humidity: " + daily[i].humidity + "%";
//     card.append(header, temp, wind, humidity); //append different variables you declared above to card
//     fiveDayEl.append(card); //apend to page
//   }
// }

// //need a function to display search history onto page

// //storing in local storeage user input
// $("#mybutton").click(function (event) {
//   event.preventDefault();
//   var city = $("#myinput").val();
//   pastCity.push(city);
//   localStorage.setItem("userCity", JSON.stringify(pastCity));
//   geomapping(city);
// });
var urlstart = "https://api.weatherapi.com/v1/";
var key = "key=55371cca9f7d49c5a27220811221805";
var search = "Denver";
var aqi = "aqi=no";
var alert = "alerts=no";
var forecast = "forecast.json?";
var currSearch = "";
var shList = [];

var wsettings = {
  async: true,
  crossDomain: true,
  url: "",
  method: "GET",
};

function trackCities() {
  $("#shCont").empty();
  search = $("#citySearch").val();
  if (localStorage.getItem("cityList") !== null) {
    shList = JSON.parse(localStorage.getItem("cityList"));
  }
  shList.unshift(search);
  var shSet = new Set(shList);
  shList = [...shSet];
  console.log(shList);
  if (shList.length > 10) {
    shList.pop();
  }
  console.log(search);
  localStorage.setItem("cityList", JSON.stringify(shList));
  for (i = 0; i < shList.length; i++) {
    var searchHistory = $("<div>");
    searchHistory.addClass(
      "col-8 rounded border-2 border-dark bg-success bg-opacity-25 p-2 my-2"
    );
    searchHistory.attr("id", shList[i]);
    searchHistory.text(shList[i]);
    $("#shCont").append(searchHistory);
  }
}

function APIsearch() {
  trackCities();
  wsettings.url =
    urlstart +
    forecast +
    key +
    "&q=" +
    encodeURIComponent(search) +
    "&days=5&" +
    aqi +
    "&" +
    alert;
  console.log(wsettings.url);
  $.ajax(wsettings).done(function (response) {
    console.log(response);
    currSearch = response;
    locweather();
    weatherforecast();
  });
}

function locweather() {
  $("#locntime").text(
    currSearch.location.name + " " + currSearch.location.localtime
  );
  $("#currTemp").text(currSearch.current.temp_f + "\u00B0" + "F");
  $("#currWind").text(currSearch.current.wind_mph + "MPH");
  $("#currHum").text(currSearch.current.humidity + "%");
  $("#currUV").text(currSearch.current.uv);
  $("#currUV").addClass("col-2");
  if (currSearch.current.uv < 3) {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-success");
  } else if (currSearch.current.uv > 6) {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-danger");
  } else {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-warning");
  }
}

function weatherforecast() {
  $("#daycards").empty();
  for (i = 0; i < 5; i++) {
    var card = $('<div class="card w-auto">');
    $("#daycards").append(card);
    var cardbody = $('<div class="card-body">');
    card.append(cardbody);
    var cardTitle = $('<h5 class="card-title">');
    var cardIcon = $("<img>");
    var cardTemp = $('<p class="card-text">');
    var cardWind = $('<p class="card-text">');
    var cardHum = $('<p class="card-text">');
    cardTitle.text(currSearch.forecast.forecastday[i].date);
    var icon = "https:" + currSearch.forecast.forecastday[i].day.condition.icon;
    cardIcon.attr("src", icon);
    cardTemp.text(
      currSearch.forecast.forecastday[i].day.avgtemp_f + "\u00B0" + "F"
    );
    cardWind.text(currSearch.forecast.forecastday[i].day.maxwind_mph + "MPH");
    cardHum.text(currSearch.forecast.forecastday[i].day.avghumidity + "%");
    cardbody.append(cardTitle);
    cardbody.append(cardIcon);
    cardbody.append(cardTemp);
    cardbody.append(cardWind);
    cardbody.append(cardHum);
  }
}

$(document).ready(function () {
  if (localStorage.getItem("cityList") !== null) {
    $("#citySearch").val(shList[0]);
  } else {
    $("#citySearch").val("Denver");
  }
  trackCities();
  APIsearch();
});

$("#searchBtn").on("click", APIsearch);
$("div.col-sm-4").delegate("div.rounded", "click", function () {
  $("#citySearch").val($(this).text());
  console.log($("#citySearch").val());
  $(this).remove();
  APIsearch();
});
