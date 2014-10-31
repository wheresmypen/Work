
$(function(){

    var table = $('#users');
    var tbody = table.find('tbody');

    var nameField = $('#name');
    var emailField = $('#email');
    var addButton = $('#add');
    var clearAll = $('#clearAll');


    // Check to see if we have existing records
    var userTableData = localStorage.getItem('userTable');
    userTableData = JSON.parse(userTableData);

    if(!userTableData){
        userTableData =[];
    } else {
        userTableData.forEach(function(record){
            tbody.append( makeRow(record) );
        });
    }



    addButton.on('click', function(){

        var name = nameField.val();
        var email = emailField.val();

        if(email.match(/^.+?\@.+\..+?$/)){ // is valid email ?

            var record = {
                name: name
              , email: email
              , ts: Date.now()
            };

            userTableData.push(record);

            save();

            tbody.append( makeRow(record) );

            nameField.val("");
            emailField.val("").css({borderColor: ''});
        } else {
            emailField.css({
                borderColor: 'red'
            });
        }

    });

    tbody.on('click', 'button.remove', function(event){
        var row = $(this).parents('tr');
        var id = row.data('id');

        userTableData = userTableData.filter(function(record){
            return (record.ts !== id);
        });

        save();

        row.remove();
    });

    clearAll.on('click', function(){
        tbody.empty();
        userTableData = [];
        save();
    });


    function save(){
        localStorage.setItem('userTable', JSON.stringify(userTableData));
    }

    function makeRow(record){
        return "<tr data-id='" + record.ts +"'>" +
            "<td>" + record.name + "</td>" +
            "<td>" + record.email + "</td>" +
            "<td><button class='remove btn btn-primary btn-xs'>remove</button></td>" +
            "</tr>";
    }



});