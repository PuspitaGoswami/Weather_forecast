var apiKey = "5952fbf8cae4c17ce493168aa8989ee8";
var serach_list = JSON.parse(localStorage.getItem("searchTerm")) || [];

function weather_forecast(search){
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" +
      search +
      "&appid=" +
      apiKey,
    type: "GET",
    dataType: "json",
    success: function (data) {
      
      $("#today-weather").empty();
      $("#forecast").empty();

      var forecast = data.list;

      var today_date = moment.unix(forecast[0].dt).format("MM/DD/YYYY");

      today_record = today_date + " " + forecast[0].main.temp + "°C";
      records = today_date + " " + forecast[0].main.temp + "°C";
      var icon = $(
        `<img src='http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}.png' />`
      );
      var todayEntry = $("<div>")
      .addClass("todayEntry")
      .append(icon)
      .append("<h2>" + search + " - " + today_date + "</h2>")
      .append("<div>" + "Temp: " + forecast[0].main.temp + "°C" + "</div>")
      .append("<div>" + "Wind: " + forecast[0].wind.speed + "KPH" + "</div>")
      .append("<div>" + "Humidity: " + forecast[0].main.humidity + "%" + "</div>");
    $("#today-weather").append(todayEntry);

      for (var i = 1; i < forecast.length; i += 8) {
        var date = moment.unix(forecast[i].dt).format("MM/DD/YYYY");
        records = date;
        var icons = $(
          `<img src='http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png' />`
        );
        var forecastEntry = $("<div>")
          .addClass("forecast-entry")
          .append("<div>" + records + "</div>")
          .append(icons)
          .append("<div>" + "Temp: " + forecast[i].main.temp + "°C" + "</div>")
          .append("<div>" + "Wind: " + forecast[i].wind.speed + "KPH" + "</div>")
          .append("<div>" + "Humidity: " + forecast[i].main.humidity + "%" + "</div>");
        $("#forecast").append(forecastEntry);
      }
    },
  });
}

$("#search-form").submit(function (event) {
  event.preventDefault(); // prevent form submission
  var searchTerm = $("#search-input").val();
  serach_list.push(searchTerm);
  localStorage.setItem("searchTerm", JSON.stringify(serach_list));

  serach_list = JSON.parse(localStorage.getItem("searchTerm"));

  $("#searchTerm").val(""); // clear the searchTerm input field
  $("#search-input").val(""); // clear the search input field

  var today_record;
  var records;
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" +
      searchTerm +
      "&appid=" +
      apiKey,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#today-weather").empty();
      $("#forecast").empty();

      var forecast = data.list;
      console.log(forecast);

      var today_date = moment.unix(forecast[0].dt).format("MM/DD/YYYY");

      today_record = today_date + " " + forecast[0].main.temp + "°C";
      records = today_date + " " + forecast[0].main.temp + "°C";
      var icon = $(
        `<img src='http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}.png' />`
      );

  
      var todayEntry = $("<div>")
      .addClass("todayEntry")
      .append(icon)
      .append("<h2>" + searchTerm + " - " + today_date + "</h2>")
      .append("<div>" + "Temp: " + forecast[0].main.temp + "°C" + "</div>")
      .append("<div>" + "Wind: " + forecast[0].wind.speed + "KPH" + "</div>")
      .append("<div>" + "Humidity: " + forecast[0].main.humidity + "%" + "</div>");
    $("#today-weather").append(todayEntry);
      

      for (var i = 1; i < forecast.length; i += 8) {
        var date = moment.unix(forecast[i].dt).format("MM/DD/YYYY");
        records = date;
        var icons = $(
          `<img src='http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png' />`
        );
        var forecastEntry = $("<div>")
          .addClass("forecast-entry")
          .append("<div>" + records + "</div>")
          .append(icons)
          .append("<div>" + "Temp: " + forecast[i].main.temp + "°C" + "</div>")
          .append("<div>" + "Wind: " + forecast[i].wind.speed + "KPH" + "</div>")
          .append("<div>" + "Humidity: " + forecast[i].main.humidity + "%" + "</div>");
        $("#forecast").append(forecastEntry);
      }
      // Append the new search term to the search history list
     
      const history = document.createElement("li");
      history.classList.add("list-group-item");
      history.dataset.name = searchTerm;
      history.textContent = searchTerm;
      history.addEventListener("click", function () {
          weather_forecast(history.dataset.name);
      });
      list_item.append(history);
    },
  });
});
var list_item = document.getElementById("list-item");

for (var i = 0; i < serach_list.length; i++) {
  const history = document.createElement("li");
  history.classList.add("list-group-item");
  history.dataset.name = serach_list[i];
  history.textContent = serach_list[i];
  history.addEventListener("click", function () {
    weather_forecast(history.dataset.name);
});
  list_item.append(history);
  // $("#history ul").append("<li>" +  serach_list[i]+ "</li>");
}
