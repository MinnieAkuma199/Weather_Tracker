
var inputEL = $('#myinput');
var currentWeatherEl = $("#currentWeather");
var pastCity = JSON.parse(localStorage.getItem("userCity"))?JSON.parse(localStorage.getItem("userCity")):[];

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

//function for 5 day weather

//need a function to display search history onto page


//use geomapping api within openweather


//storing in local storeage user input
$("#mybutton").click(function (event) {
    event.preventDefault();
    var city = $("#myinput").val();
    pastCity.push(city);
    localStorage.setItem("userCity", JSON.stringify(pastCity));
    geomapping(city)
})
