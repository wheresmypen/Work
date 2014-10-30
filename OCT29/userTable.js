
$(function(){

    var table = $('#users');
    var tbody = table.find('tbody');

    var nameField = $('#name');
    var emailField = $('#email');
    var addButton = $('#add');
    var clearAll = $('#clearAll');


    addButton.on('click', function(){

        var name = nameField.val();
        var email = emailField.val();

        if(email.match(/^.+?\@.+\..+?$/)){ // is valid email ?
            tbody.append( getRow(name, email) );

            nameField.val("");
            emailField.val("").css({borderColor: ''});
        } else {
            emailField.css({
                borderColor: 'red'
            });
        }

    });

    tbody.on('click', 'button.remove', function(event){
        $(this).parents('tr').remove();
    });

    clearAll.on('click', function(){
        tbody.empty();
    });

    function getRow(name, email){
        return "<tr>" +
            "<td>" + name + "</td>" +
            "<td>" + email + "</td>" +
            "<td><button class='remove btn btn-primary btn-xs'>remove</button></td>" +
            "</tr>";
    }



});