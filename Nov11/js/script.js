$(function() {
    var employees = [
        {

            name: "David",
            phone: "800-555-5555",
            address: "123 Pleasant St, Morgantown, WV 26505"


        },

        {
            name: "Bob",
            phone: "303-123-4567",
            address: "1090 Ithica Dr, Boulder, CO 80305"

        }


    ];

//  Flag for closing the map

    var close_toggle = 0;

//    MAIN

    myApp();

//    Loads table and adds initial functionality

    function myApp() {

//        Call to database

        $.ajax({
            url: 'http://69.164.197.6/employees/',
            success: function(employees){
                render_employee_table(employees);
            }
        })
//         Promise with returned data makes table functional
            .done(function( employees ) {
                $('#add').click(function(){

//                    When "add" button clicked calls edit box and passes add flag
                    render_edit_box('add');
                    $('#edit_box').slideDown();

                });

            });

    };

//  Function that removes data from table - functionality broken because rendering of static object removed

    function terminate_employee(index){

        console.log(index);
        employees.splice(index, 1);

        render_employee_table(employees);

    };


    //    Render Employee
//    both adds and edits employee

    function render_edit_box(type, employee, index){

//        creates empty field for form

        var prename="";
        var prephone="";
        var preaddress="";

        if (type == "edit"){

//            when edit flag is called, pre-populates form fields with index data

            prename = employee.name;
            prephone = employee.phone;
            preaddress = employee.address;

        };

//        CREATES AND RENDERS EDIT BOX

        var html = '<div><lable>name</lable><input id="edit_name" value="'
            + prename + '"></div><div><lable>phone</lable><input id="edit_phone" value = "'
            + prephone + '"></div><div><lable>address</lable><input id ="edit_address" value = "'
            + preaddress + '"</div>';

        var button_name = (type ==  "add" ? "add it" : "update it");

        html += "<button id='saveit' class='btn btn-default btn-sm'>" + button_name + "</button>";

        $('#edit_box').html(html);

//        adds functionality to form button

        $("#saveit").click(function(){

//          creates renewed object for adding into table

            var e = {
                name : $("#edit_name").val(),
                phone : $("#edit_phone").val(),
                address : $("#edit_address").val()
            };

            if (type == "edit"){

//              runs functionality to replace edited object

                update_employee(e, index);

            }

//                runs functionality to add new object to database

            else if (type == "add"){
                console.log(e);
                add_employee(e);
            }


            $('#edit_box').slideUp();


        })




    }

    function update_employee(employee, index){

//
//        Function that replaces data in table - functionality broken because rendering of static object removed
//
//        Needs to be created with PUT request

        employees[index] = employee;
        render_employee_table(employees);

    }

    function render_map(employee, index){

        console.log(employee.address);

        $("#map-canvas").show();

        var address = employee.address;

        getGeo(address, locatePoint);

        function getGeo(address, locatePoint) {

            close_toggle++;

            var api = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
            var key = 'AIzaSyDP8RKElzU6BFGV205vH_0wkwWAtiGThus';

            var url = api + address.replace(/\s/g, '+')/* + '&key=' + key*/;

            $.get(url, function(data){
                if(data.status && data.status === 'OK'){
                    locatePoint(data.results[0].geometry.location);
                } else {
                    locatePoint(data);
                }
                console.log(data);
            });

        };

        function locatePoint(data){

            console.log('hello');
            var latitude = data.lat;
            var longitude = data.lng;
            var myOptions = {
                zoom: 17,
                center: new google.maps.LatLng(latitude, longitude)
            };
            console.log('help');
            var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

        };


        if (close_toggle < 2) {
            $("#add").after("<button id='close_map'>CLOSE</button>");
        };


        $("#close_map").click(function(){
            console.log($("#map-canvas"));
            $("#map-canvas").fadeOut();
            $(this).remove();
            close_toggle = 0;
        });


// LINK FOR ADDRESS LOOKUP THAT GIVES LAT&LONG
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

    };


    function add_employee(employee){

        $.ajax({
            type: "POST",
            url: 'http://69.164.197.6/employees/',
            data: employee
        })
            .done(function( employees ) {

                renewtable(employees)

                });

//
//            THIS IS LIKELY SOME DATA THAT NEEDS TO BE MOVED
//            TO RENDER TABLE OR SOMEWHERE ELSE
//


        function renewtable(){
            $.ajax({
                url: 'http://69.164.197.6/employees/',
                success: function(employees){
                    render_employee_table(employees);
                }
            })
        };


    }

//    Render Table

    function render_employee_table(data) {


        var html;
        html = "<table>"

        data.forEach(function(e, index){


            html += "<tr>";
            html += "<td>" + e.name + "</td>";
            html += "<td>" + e.phone + "</td>";
            html += "<td>" + e.address + "</td>";
            html += "<td><button class = 'delete btn btn-default btn-sm' index ='"+index+"'>Del</button></td>";
            html += "<td><button class = 'edit btn btn-default btn-sm' index ='"+index+"'>Edit</button></td>";
            html += "<td><button class = 'location btn btn-default btn-sm' index ='"+index+"'>Find Location</button></td>";
            html += "</tr>";

        })

        html += "</table>";

        $('#employee_list').html(html);

        $('.delete').click(function(){
            console.log('delete clicked');
            terminate_employee($(this).attr("index"));
        });

        $('.edit').click(function(){
            console.log('edit clicked');

            $('#edit_box').slideDown();

            render_edit_box("edit", employees[$(this).attr("index")], $(this).attr("index"));

        });

        $('.location').click(function(){

            render_map(employees[$(this).attr("index")]);

        });

    }





});