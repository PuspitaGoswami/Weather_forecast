$(document).ready(function() {
    var apiKey = '5952fbf8cae4c17ce493168aa8989ee8';

    $('#search-form').submit(function(event) {
  
      event.preventDefault(); // prevent form submission
      var searchTerm = $('#search-input').val();
      localStorage.setItem('searchTerm', searchTerm);
      $('#history ul').append('<li>' + searchTerm + '</li>');
      $('#searchTerm').val(''); // clear the searchTerm input field

      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm + '&appid=' + apiKey,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          var forecast = data.list;
          for (var i = 0; i < forecast.length; i += 8) {
            console.log(forecast[i].dt_txt + ': ' + forecast[i].main.temp + '°F');
          }
        }
      });
    });


  
  });