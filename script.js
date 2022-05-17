
//storing in local storeage user input
$("#mybutton").click(function (event) {
    event.preventDefault();
    var city = $("#myinput").val();
    localStorage.setItem("userCity", city);
})
