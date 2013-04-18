!function() {
  'use strict';
  
  $('#pyForm').submit(function(e) {
    $.post('/python', {
      code: $('#pyCode').val()
    }, function(data) {
      console.log(data);
      $('#result').text(data);
    });
    return false;
  });
}(this);