$(function(){

  var switchBox = $('#littleBox');



    console.log(switchBox);

    switchBox.mouseenter(keepIn);

    function keepIn(event){
        switchBox.addClass('blue');
        switchBox.removeClass('oneShape');
        switchBox.animate({backgroundColor: 'green'});
        console.log("y'ar in the box");


        switchBox.animate({  textIndent: 0 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate(45deg)');
            },
            duration:'slow'
        },'linear');


    }

    switchBox.mouseleave(keepOut);

    function keepOut(event){
        switchBox.addClass('oneShape');
        switchBox.removeClass('blue');
        switchBox.animate({backgroundColor: 'yellow'});
        console.log('you are out of the box, now')



        switchBox.animate({  textIndent: 0 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate(90deg)');
            },
            duration:'slow'
        },'linear');

    }




})