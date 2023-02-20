
  var apiKey = "5952fbf8cae4c17ce493168aa8989ee8";
  var serach_list = JSON.parse(localStorage.getItem('searchTerm')) || [];


   

  $("#search-form").submit(function (event) {
    event.preventDefault(); // prevent form submission
    var searchTerm = $("#search-input").val();
    serach_list.push(searchTerm);
    localStorage.setItem('searchTerm', JSON.stringify(serach_list));
  
    serach_list = JSON.parse(localStorage.getItem('searchTerm'));
   
    $("#searchTerm").val(""); // clear the searchTerm input field

    var today_record;
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" +
        searchTerm +
        "&appid=" +
        apiKey,
      type: "GET",
      dataType: "json",
      success: function (data) {

        var forecast = data.list;
        for (var i = 0; i < forecast.length; i += 8) {
         
          var date = moment.unix(forecast[i].dt).format("MM/DD/YYYY");
          today_record =
            moment.unix(forecast[i].dt).format("MM/DD/YYYY") +
            " " +
            forecast[i].main.temp +
            "°F";
            var icon = $(`<img src='http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png' />`)
            $("#today-weather").append("<h2>" + today_record + "</h2>", icon);
            
        }
          // Append the new search term to the search history list
      const history = document.createElement("li");
      history.classList.add("list-group-item");
      history.dataset.name = searchTerm;
      history.textContent = searchTerm;
      list_item.append(history);
       
      },
      
    });
  });
  var list_item = document.getElementById('list-item');
    
  for(var i=0; i<serach_list.length;i++){

    const history = document.createElement("li");
    history.classList.add("list-group-item");
    history.dataset.name = serach_list[i];
    history.textContent = serach_list[i];
    list_item.append(history);
    // $("#history ul").append("<li>" +  serach_list[i]+ "</li>");
  }
