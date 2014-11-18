$(function() {
    var employees = [];

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


//      Render Employee
//    both adds and edits employee

    function render_edit_box(type, employee, index, id){

        console.log(type, employee, index, id);

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

                update_employee(e, index, id);

            }

//                runs functionality to add new object to database

            else if (type == "add"){
                add_employee(e);
            }


            $('#edit_box').slideUp();


        })




    }

    function update_employee(employee, index, id){

        console.log (employee, index, id);

        updateURL = 'http://69.164.197.6/employees/'+id;

//
//        Function that replaces data in table
//        Needs to be created with PUT request

        $.ajax({
            type: "POST",
            url: updateURL,
            data: employee
        })
//        WHEN SUCCESSFUL CALL IS MADE, PROMISES
//            ARE INVOKED TO RE-RENDER TABLE
            .done(function() {
//              MAKES AN AJAX REQUEST TO GET COMPLETE TABLE DATA FROM DATABASE
                $.ajax({
                    url: 'http://69.164.197.6/employees/',
                    success: function(employees){
//                CALLS FUNCTION TO RE-RENDER DOM WITH COMPLETE TABLE
                        render_employee_table(employees);
                    }
                })
            });

        console.log(employee);
//        render_employee_table(employees);

    }

//          This is the beginning of a large amount of code that renders
//          a google map centered on the address of the point selected
//          the employee object that was clicked and the index
//          number are passed to the function

    function render_map(employee, index){

//          This enables the area for map rendering to appear in the DOM

        $("#map-canvas").fadeIn();

        var address = employee.address;

//          Calls the function that derives a LAT/LNG coordinate from an address

        getGeo(address, locatePoint);

        function getGeo(address, locatePoint) {

//            toggles whether an address has shown a map to this point

            close_toggle++;

            var api = 'https://maps.googleapis.com/maps/api/geocode/json?address=';


//            THIS KEY, PROVIDED BY NATHAN, HAS BEEN DISABLED
            var key = 'AIzaSyDP8RKElzU6BFGV205vH_0wkwWAtiGThus';

//            creates url with google API and address (spaces removed with replace)

            var url = api + address.replace(/\s/g, '+')/* + '&key=' + key*/;

            $.get(url, function(data){

//                   receives an object (DATA) from googlemaps and derives LAT/LNG


                if(data.status && data.status === 'OK'){
                    locatePoint(data.results[0].geometry.location);
                } else {
//                    THIS OUGHT TO THROW AN ERROR OR SEND A DEFAULT LAT/LNG WITH DEFAULT LOCATION
                    locatePoint(data);
                }
            });

        };

//          This function takes LAT/LNG coordinates and returns a map object from another googlemaps API call

        function locatePoint(data){

//            Creates preferences that will be passed to google maps

            var latitude = data.lat;
            var longitude = data.lng;
            var myOptions = {
                zoom: 17,
                center: new google.maps.LatLng(latitude, longitude)
            };

//            calls for and renders map object from Googlemaps

            var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

        };


//        Adds close button to rendered map if the button has not already been added
        if (close_toggle < 2) {
            $("#add").after("<button id='close_map'>CLOSE</button>");
        };

//          REMOVES MAP AND BUTTON WITH A FADEOUT function (nice touch!)
        $("#close_map").click(function(){
            console.log($("#map-canvas"));
            $("#map-canvas").fadeOut();
            $(this).remove();
            close_toggle = 0;
        });

    };

//  This function is called when add employee is clicked


    function add_employee(employee){
//
//        makes a POST call to the database to add new employee
        $.ajax({
            type: "POST",
            url: 'http://69.164.197.6/employees/',
            data: employee
        })
//            WHEN SUCCESSFUL CALL IS MADE, PROMISES
//            ARE INVOKED TO RERENDER TABLE

            .done(function( employees ) {

//                CALLS FUNCTION TO RERENDER DOM WITH COMPLETE TABLE
                renew_table(employees)

                });

//
//            THIS IS LIKELY SOME DATA THAT NEEDS TO BE MOVED
//            TO RENDER TABLE OR SOMEWHERE ELSE
//


        function renew_table(){
//            AN AJAX CALL TO REPOPULATE EMPLOYEES OBJECT WITH WITH COMPLETE DATABASE
//            A SUCCESSFUL CALL TRIGGERS A NEW RENDERING FUNCTION
            $.ajax({
                url: 'http://69.164.197.6/employees/',
                success: function(employees){
                    render_employee_table(employees);
                }
            })
        };


    }

//    Render Table
//    HTML FOR TABLE ROWS, INCLUDING BUTTONS AND ENABLING FUNCTIONS FOR ADDITIONAL FEATURES

    function render_employee_table(data) {


        var html;
        html = "<table>"

        data.forEach(function(e, index){


            html += "<tr>";
            html += "<td>" + e.name + "</td>";
            html += "<td>" + e.phone + "</td>";
            html += "<td>" + e.address + "</td>";
            html += "<td>" + e.id + "</td>";
            html += "<td><button class = 'delete btn btn-default btn-sm' index ='"+ index+"' index2 ='"+ e.id+"'>Del</button></td>";
            html += "<td><button class = 'edit btn btn-default btn-sm' index ='"+index+"' index2 ='"+ e.id+"'>Edit</button></td>";
            html += "<td><button class = 'location btn btn-default btn-sm' index ='"+ index+"' index2 ='"+ e.id+"'>Find Location</button></td>";
            html += "</tr>";

        })

        html += "</table>";

        $('#employee_list').html(html);

//        DELETE BUTTON FOR EACH INDEX

        $('.delete').click(function(){
            console.log($(this).attr("index"), $(this).attr("index2"));
//        PASSES INDEX VALUE TO DELETE FUNCTION
            terminate_employee($(this).attr("index"), $(this).attr("index2"));
        });

//        EDIT BUTTON FOR EACH INDEX

        $('.edit').click(function(){
            console.log('edit clicked');

            $('#edit_box').slideDown();

//            PASSES EDIT INFO TO RENDER EDIT BOX WITH FLAG, EMPLOYEE OBJECT, AND INDEX

            render_edit_box("edit", data[$(this).attr("index")], $(this).attr("index"), $(this).attr("index2"));

        });

//           CALLS ON MAPPING FUNCTION WHILE PASSING EMPLOYEE OBJECT AND INDEX

        $('.location').click(function(){
            console.log($(this).attr('index')+ "---" + data[$(this).attr('index')].id);

            render_map(data[$(this).attr("index")],$(this).attr("index"));

        });


//  Function that removes data from table

        function terminate_employee(index, id){

//            defines endpoint that corresponds to employee data
            goneURL = 'http://69.164.197.6/employees/'+id;

//            MAKES AN AJAX CALL TO DELETE DATA FROM DATABASE AT ID ENDPOINT
            $.ajax({
                url: goneURL,
                type: "DELETE"
            })
//            WHEN SUCCESSFUL CALL IS MADE, PROMISES
//            ARE INVOKED TO RE-RENDER TABLE
                .done(function( deleted_employee ) {
                    console.log(deleted_employee);
//                    MAKES AN AJAX REQUEST TO GET COMPLETE TABLE DATA FROM DATABASE
                    $.ajax({
                        url: 'http://69.164.197.6/employees/',
                        success: function(employees){
//                CALLS FUNCTION TO RE-RENDER DOM WITH COMPLETE TABLE
                            render_employee_table(employees);
                        }
                    })
                });


            render_employee_table(data);

        };

    }





});