$(function(){

  var maxChars = 140
   , inputBox = $('#textbox')
   , count = $('#count')
   ;


  inputBox.on('keydown', checkAndUpdateCount);



  function checkAndUpdateCount(event){

    var textInput = inputBox.val();
    var stringSize = textInput.length + 1;
      console.log(stringSize);



    count.text(maxChars-stringSize);
    var remaining = maxChars-stringSize;
//   Make it remove the last character and replace it with most recent

    if (remaining <= 0){
        count.text(0);
        var truncate = textInput.substring(0, maxChars - 1)
        truncate = truncate+String.fromCharCode(event.charCode);
        inputBox.val(truncate);
        }


      console.log(event.keyCode);


  }









})