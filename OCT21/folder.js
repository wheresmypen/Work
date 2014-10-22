
$(function(){

    var wrapper = $('.tab-wrapper');
    attachTabs(wrapper);


/*
    wrappers.each(function(){

        var wrapper = $(this);
        attachTabs(wrapper);

    })
*/





    function attachTabs(wrapper){
        var tabs = wrapper.find('ul.tabs li');
        var panels = wrapper.find('.panels .panel');

        console.log(tabs);
        console.log(panels);


        tabs.on('click', function(event){

            tabs.removeClass('active');
            panels.removeClass('active');

            var current_tab = this;

            $(current_tab).addClass('active');

            tabs.each(function(idx){
              if(current_tab == this){
                  $(panels.get(idx)).addClass('active');
              }
            })


        })
    }

















})