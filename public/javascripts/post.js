!function() {
  'use strict';
  
    //Set up our syntax-highlighting goodness CodeMirror
  var codeMirrorConfig = {
    value: 'print("hello world")',
    mode: {
      name: 'python',
      version: 3,
      singleLineStringErrors: false
      },
    lineNumbers: true,
    lineWrapping: true
  }
    , code = document.getElementById('pyCode')
    , input = document.getElementById('pyInput');
  
  var pyCode = CodeMirror.fromTextArea(code, codeMirrorConfig)
    , pyInput = CodeMirror.fromTextArea(input, codeMirrorConfig);
  
  //HCI
  pyInput.setSize(700, 130);
  
  //Set up POST form submission
  $('#run').click(function(e) {
    $.post('/python', {
      code: pyCode.getValue(),
      input: pyInput.getValue()
    }, function(data) {
      console.log(data);
      $('#results').text(data);
    });
    return false;
  });
}(this);