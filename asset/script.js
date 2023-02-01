$(document).ready(function() {
    var apiKey = '5952fbf8cae4c17ce493168aa8989ee8';

    $('#search-form').submit(function(event) {
  
      event.preventDefault(); // prevent form submission
      var searchTerm = $('#search-input').val();
      localStorage.setItem('searchTerm', searchTerm);
      $('#history ul').append('<li>' + searchTerm + '</li>');
      $('#searchTerm').val(''); // clear the searchTerm input field

      var today_record;
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm + '&appid=' + apiKey,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          var forecast = data.list;
          for (var i = 0; i < forecast.length; i += 8) {
            console.log(forecast[i].dt_txt + ': ' + forecast[i].main.temp + '°F');
            var date = moment.unix(forecast[i].dt).format('MM/DD/YYYY');
            console.log(date + ': ' + forecast[i].main.temp + '°F');
            today_record =  moment.unix(forecast[0].dt).format('MM/DD/YYYY') +' '+  forecast[0].main.temp + '°F';
            
          }
          $('#today-weather').append('<h2>' + today_record +'</h2>');
        }
      });
    });


  
  });