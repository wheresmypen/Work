
$(function(){
    var boxes = $('.box');
    var container = $('.wrapper');

    console.log(container);


    boxes.on('mouseenter', highlight)


    boxes.on('click', scarred);


    boxes.on('mouseleave', unhighlight);


    function highlight(){
        boxes.removeClass('selected');
        $(this).prevAll().addClass('selected');
        $(this).addClass('selected');
    };


    function unhighlight() {
        boxes.removeClass('selected');
        $(this).prevAll().removeClass('selected');
        $(this).removeClass('selected');
    };

    function scarred() {
        boxes.removeClass('clicked');
        $(this).addClass('clicked');
        $(this).prevAll().addClass('clicked');
    }

})