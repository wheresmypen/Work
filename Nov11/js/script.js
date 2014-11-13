// WORKS AS FAR AS DESCRIPTION WITHOUT EXTRAS

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


//    MAIN

    myApp();

    function myApp() {
        $('#employee_list').html(render_employee_table(employees));

        $('#add').click(function(){

            render_edit_box('add');
//            $('#edit_box').removeClass('closed');
            $('#edit_box').slideDown();

        });
    };

    function terminate_employee(index){

        console.log(index);
        employees.splice(index, 1);

        render_employee_table(employees);

    };


    //    Render Employee

    function render_edit_box(type, employee, index){

        var prename="";
        var prephone="";
        var preaddress="";

        if (type == "edit"){

            prename = employee.name;
            prephone = employee.phone;
            preaddress = employee.address;

        };

        var html = '<div><label>name</label><input id="edit_name" value="'
            + prename + '"></div><div><lable>phone</lable><input id="edit_phone" value = "'
            + prephone + '"></div><div><lable>address</lable><input id ="edit_address" value = "'
            + preaddress + '"</div>';

        var button_name = type ==  "add" ? "add it" : "update it";

        html += "<button id='saveit'>" + button_name + "</button>";

        $('#edit_box').html(html);

        $("#saveit").click(function(){


            var e = {
                name : $("#edit_name").val(),
                phone : $("#edit_phone").val(),
                address : $("#edit_address").val()
            };

            if (type == "edit"){

                update_employee(e, index);

            }


            else if (type == "add"){

                add_employee(e);
            }


            $('#edit_box').slideUp();


        })




    }

    function update_employee(employee, index){

        employees[index] = employee;
        render_employee_table(employees);

    }


    function add_employee(employee){
        employees.push(employee);
        var p = render_employee_table(employees);

//
//            THIS ARE IS LIKELY SOME DATA THAT NEEDS TO BE MOVED
//            TO RENDER TABLE OR SOMEWHERE ELSE
//

        $('#employee_list').html(p);
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
            html += "<td><button class = 'delete' index ='"+index+"'>Del</button></td>";
            html += "<td><button class = 'edit' index ='"+index+"'>Edit</button></td>";
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

            render_edit_box("edit", employees[$(this).attr("index")], $(this).attr("index"));

        })

    }





});