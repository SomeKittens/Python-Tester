!function() {
  'use strict';
  
  //Set up our syntax-highlighting goodness CodeMirror
  var input = document.getElementById('pyCode');
  var pyCode = CodeMirror.fromTextArea(input, {
    value: 'print("hello world")',
    mode: {
      name: 'python',
      version: 3,
      singleLineStringErrors: false
      },
    lineNumbers: true,
    lineWrapping: true
  });
  
  //Set up POST form submission
  $('#run').click(function(e) {
    $.post('/python', {
      code: pyCode.getValue(),
      input: $('#pyInput').val()
    }, function(data) {
      console.log(data);
      $('#results').text(data);
    });
    return false;
  });
}(this);