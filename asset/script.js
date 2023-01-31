$(document).ready(function() {

    $('#search-form').submit(function(event) {
  
      event.preventDefault(); // prevent form submission
      var searchTerm = $('#search-input').val();
      localStorage.setItem('searchTerm', searchTerm);
      $('#history ul').append('<li>' + searchTerm + '</li>');
      $('#searchTerm').val(''); // clear the searchTerm input field
    });
  
  });