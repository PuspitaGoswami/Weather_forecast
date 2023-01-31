$(document).ready(function() {

    $('#search-form').submit(function(event) {
  
      event.preventDefault(); // prevent form submission
      var searchTerm = $('#search-input').val();
      localStorage.setItem('searchTerm', searchTerm);
      alert('Search term saved to local storage: ' + localStorage.getItem('searchTerm'));
    });
  
  });