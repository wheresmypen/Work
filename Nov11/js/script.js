// WORKS AS FAR AS ADD BUTTON

$(function() {
    var employees = [
        {

            name: "David",
            phone: "800-555-5555"


        },

        {
            name: "Bob",
            phone: "303-123-4567"
        }


    ]


//    MAIN

    myApp();

    function myApp() {
        $('#employee_list').html(render_employee_table(employees))

        $('#add').click(function(){
            render_edit_box();
        });
    }


//    Render Table

    function render_employee_table(data) {

        var html;
        html = "<table>"

        data.forEach(function(e){

            html += "<tr>";
            html += "<td>" + e.name + "</td>";
            html += "<td>" + e.phone + "</td>";
            html += "</tr>";

        })

        html += "</table>"

        return html;

    }


//    Render Employee

    function render_edit_box(){

       var html = '<div></div><label>name</label><input id="edit_name"></div><div><lable>phone</lable><input id="edit_phone"></div>';

       html += "<button id='addit'>Add It</button>";

        $('#edit_box').html(html);

       $("#addit").click(function(){

           var e = {
               name : $("#edit_name").val(),
               phone : $("#edit_phone").val()
           }

           employees.push(e);
           var p = render_employee_table(employees);
           $('#employee_list').html(p);
           $('#edit_box').html('');
       })



    }


});