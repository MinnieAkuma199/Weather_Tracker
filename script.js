
var inputEL = $('#myinput');
var currentWeatherEl = $("#currentWeather");

//creating a function so that i can change coordinates in the global scope
function getWeatherNow(lat, lon) {
    var requestUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=84d885b9460d4859c94c8f925e3d5c9b";
    $.ajax({
      url: requestUrl,
      method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response.main.temp);
        console.log(response.wind.speed);
        console.log(response.main.humidity);
    });
}


//MIAMI lat and long below
getWeatherNow(25.7617, -80.1918);

//use geomapping api within openweather


//storing in local storeage user input
$("#mybutton").click(function (event) {
    event.preventDefault();
    var city = $("#myinput").val();
    localStorage.setItem("userCity", city);
})
