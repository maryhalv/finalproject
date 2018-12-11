var root = 'http://comp426.cs.unc.edu:3001/';
var name = 'default';
var airlineId = 1001;
$(document).ready( function(){
    login();
    createSelect();
    });



function createSelect() {
        $('body').empty();
        $('body').append("<h1>Please Select an Airline</h1>");
        $('body').append("<div><form id = 'test'><select id = 'airlines'></select></form><div>");
        
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airlines',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log(response);
               let all_airlines = response;
                for(var i = 0; i < all_airlines.length; i++) {
                    //console.log(all_airlines[i].name);
                $('#airlines').append("<option class ='" + all_airlines[i].id + "'>" + all_airlines[i].name + ": " + all_airlines[i].id + "</option>");
                
               }
               }
            
            });
       
      // console.log(document.getElementById('airlines').value);
        $('body').append("<div><button onclick = 'createDashboard();'>Create Dashboard</button><div>");
        
}

function createDashboard() {
 
  name = document.getElementById('airlines').value;
 airlineId = name.substring(name.length-5);
 
    $('body').empty();
   $('body').append("<h1>" + name.substring(0, name.length-7) + " Flight Editor</h1>");
    $('body').append("<div><button onclick='createSelect();'>Change Airline</button><div>");
       $('body').append("<div><table class = 'dashboard'></table><div>");
    $('.dashboard').append('<tr><td><button onclick = "flightInfoPage('+ airlineId + ');">Flights</button></td><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getFlights_for_Tickets();">Tickets</button></td><td><button onclick = "getFlights();">TBD</button></td></tr>');
}

function getFlights_for_Tickets(){
    //generate all the planes for the flight, then generate the tickest once a plan has been selected
    $('body').empty();
    $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append("<h1>Tickets</h1>");
    $('body').append("<div class = 'create_t'><button onclick='createTickets();'>Create a New Ticket</button></div>");
     $('body').append("<div><table class = 'ticket_display'><tr><th>First Name</th><th>Last Name</th><th>Age</th><th>Gender</th><th>Instance</th><th>Seat</th><th>Edit</th></tr></table></div>");
    
$.ajax({
            url: 'http://comp426.cs.unc.edu:3001/tickets',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log('reached');
                
               let tickets = response;
               //console.log(airlineId);
                for(var i = 0; i < tickets.length; i++) {
                    
                    if(tickets[i] !== null) {
                   $('.ticket_display').append("<tr class = '" + tickets[i].id +"'></tr>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].first_name + "</td>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].last_name + "</td>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].age + "</td>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].gender + "</td>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].instance_id + "</td>");
                   $('.' + tickets[i].id + '').append("<td>" + tickets[i].seat_id + "</td>");
                    $('.' + tickets[i].id + '').append("<td><p class = 'deleting' onclick = 'deleteTicket(" + tickets[i].id + ");'>Delete</p></td>");
                    }
               }
               }
            
            });
}

function deleteTicket(identification) {
    var deleting = identification;
     $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/tickets/' + deleting,
        type: 'DELETE',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: () => {
   console.log('deleted');
   getFlights_for_Tickets();
   }
        });
}

function createTickets() {
    console.log('reached');
    $('body').empty();
    $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append("<h1>Create a Ticket</h1>");
    
    $('body').append("<div class = 'input'><p>First Name <form><input type = 'text' id ='firstname'></input></form></p></div>");
    //$('body').append("<div><p>Middle Name <form><input type = 'text' id ='middlename'></input></form></p></div>");
    $('.input').append("<p>Last Name <form><input type = 'text' id ='lastname'></input></form></p>");
    $('.input').append("<p>Age <form><input type = 'text' id ='age'></input></form></p>");
    $('.input').append("<p>Gender <form><input type = 'text' id ='gender'></input></form></p>");
    //$('body').append("<div><p>Is Purchased? <form><input type = 'text' id='purchased'></input></p></div>");
    //$('body').append("<div><p>Price <form><input type = 'text' id ='price'></input></form></p></div>");
    $('.input').append("<p>Instance <form><input type = 'text' id ='instance'></input></form></p>");
    $('.input').append("<p>Seat <form><input type = 'text' id ='seat'></input></form></p>");
    
    $('.input').append("<button onclick = 'createTicket();'>Create Ticket</button>");
    

}
function createTicket(){
    console.log('reached');
    
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/tickets',
        type: 'POST',
  dataType: 'json',
  xhrFields: { withCredentials: true },
  data: {
    "ticket": {
    "first_name":   document.getElementById('firstname').value,
    "last_name":    document.getElementById('lastname').value,
    "age":          parseInt(document.getElementById('age').value),
    "gender":       document.getElementById('gender').value,
    "instance_id":  parseInt(document.getElementById('instance').value),
    "seat_id":      document.getElementById('seat').value
  }
  },
   success: () => {
   console.log('success');
   $('.input').empty();
   getFlights_for_Tickets();
   }
        });
}

function recreateDashboard() {

    $('body').empty();
   $('body').append("<h1>" + name.substring(0, name.length-7) + " Flight Editor</h1>");
   $('body').append("<div><button onclick='createSelect();'>Change Airline</button><div>");
       $('body').append("<div><table class = 'dashboard'></table><div>");
    $('.dashboard').append('<tr><td><button onclick = "flightInfoPage(' + airlineId + ');">Flights</button></td><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getFlights_for_Tickets();">Tickets</button></td><td><button onclick = "getFlights();">TBD</button></td></tr>');
}


function getSeats() {
      $('body').empty();
        $('body').append("<h1>Seats</h1>");
       
        
}

function flightInfoPage(identification) {
    
//console.log("id = " + identification);
airlineId = identification;
//console.log(airlineId);
     $('body').empty();
         $('body').append("<div><button onclick='recreateDashboard();'>Return to Dashboard</button><div>");
        $('body').append("<h1 class = 'head'>Flights</h1>");
        $('.head').append("<div><button onclick = 'flightInfoPage(" + identification + ");'>Change Flight</button></div>");
        $('body').append("<div class = 'first'><p>Displaying Planes for " + name.substring(0, name.length-7)  +  "</p></div>");
           $('.first').append("<p>Flight Number</p>");
         $('.first').append("<form><select id='current_flight' class = 'flights'></select></form>");
           $('.first').append("<button onclick='getFlightInfo();'>View Flight Info</button>");
           $('body').append("<div class = 'flight_info'></div>");
         

              $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
               let flights = response;
                for(var i = 0; i < flights.length; i++) {
                    console.log(airlineId);
                    if(flights[i].airline_id === airlineId) {
                        //console.log('reached');
                $('.flights').append("<option>" + flights[i].number + "</option>");
                    }
               }
               }
            
            });
        
        //functionality to add flights
        //delete fights
        //
}
function getFlightInfo(){
    
    let flight_number = document.getElementById('current_flight').value;
    $('.flight_info').empty();
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log(response);
               let flights = response;
                for(var i = 0; i < flights.length; i++) {
                    if(flights[i].number === flight_number) {
        console.log('found flight');
        $('.flight_info').append("<div><table class ='flight_table' ><tr><th>Flight </th><th>" + flight_number  +"</th></tr></table></div>");
        var year = flights[i].departs_at.substring();
        $('.flight_table').append("<tr><td>Departs At </td><td>" + flights[i].departs_at.toString()  +"</td></tr>");
        $('.flight_table').append("<tr><td>Arrives At </td><td>" + flights[i].arrives_at.toString()  +"</td></tr>");
                    }
               }
               }
            
            });
    
    
}
function getFlights(identification) {
    
//console.log("id = " + identification);
airlineId = identification;
//console.log(airlineId);
     $('body').empty();
         $('body').append("<div><button onclick='recreateDashboard();'>Return to Dashboard</button><div>");
        $('body').append("<h1 class = 'head'>Seats</h1>");
        $('.head').append("<div><button onclick = 'getFlights(" + identification + ");'>Change Plane</button></div>");
        $('body').append("<div class = 'first'><p>Displaying Planes for " + name.substring(0, name.length-7)  +  "</p></div>");
           $('.first').append("<p>Flight and Plane Number</p>");
         $('.first').append("<form><select id='current_flight' class = 'flights'></select></form>");
           $('.first').append("<button onclick='getSeatMap();'>View Seat Map</button>");
         

              $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights?filter[airline_id]=' + airlineId,
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log(response);
               let flights = response;
                for(var i = 0; i < flights.length; i++) {
                    //console.log(flights[i].airline_id);
                  //console.log(flights[i].airline_id);
                   // console.log(airlineId);
                 //  console.log(flights[i].airline_id === airlineId);
                    //if(flights[i].airline_id === airlineId) {
                        //console.log('reached');
                $('.flights').append("<option>Flight: " + flights[i].id + " Plane: "  +flights[i].plane_id + "</option>");
                    //}
               }
               }
            
            });
        
        //functionality to add flights
        //delete fights
        //
}

function getSeatMap() {
   
    $('.editor').empty();
    var thisplane = document.getElementById('current_flight').value;
    thisplane = thisplane.substring(thisplane.length - 5);
   console.log(thisplane);
    
    
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/planes',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
   // console.log(response);
               let planes = response;
                for(var i = 0; i < planes.length; i++) {
                   if(JSON.stringify(planes[i].id) === thisplane) {
                       var seatmap = planes[i].seatmap_url;
                        $('body').append("<div class = 'editor'><p>Viewing Seat Map for Plane " + thisplane +"</p></div>");
                        $('.editor').append("<button onclick='seatEditor(" + thisplane + ");'>View Seats</button>");
                        $('body').append("<div class ='seat_display'><img src = '" + seatmap + "' alt= 'SeatMap'><img></div>");
                    }
               }
               }
            
            });
    
}

function seatEditor(plane_num) {
    //need to get all seat associated with the plane
    var plane = plane_num;
    //console.log(plane);
    $('.first').empty();
   $('.editor').empty();
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/seats',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
  data: {
    "seat": {
    "plane_id" : plane
    }
  },
   success: (response) => {
  $('.editor').append("<p>Select a Seat to view its information</p>");
    $('.editor').append("<form><select id='view_seats'></select></form>");
     $('.editor').append("<button class='get_seat' onclick = 'getSeatInfo(" + plane + ");'>Get Info</button>");
     $('.editor').append("<div class='seat_info'></div>");
               let seats = response;
                for(var i = 0; i < seats.length; i++) {
                   if(JSON.stringify(seats[i].plane_id) === JSON.stringify(plane)) {
                    $('#view_seats').append("<option>" + seats[i].row + seats[i].number + " </option>");
                   }
                    }
               }
            
            });
    
}

function getSeatInfo(current_plane){
    var current_seat = document.getElementById('view_seats').value;
    var row;
    var number;
    var plane = current_plane;
    //remember seat consists of row and letter number
       
    $('.seat_info').empty();
    if(current_seat.length === 2) {
        row = current_seat[0];
        number = current_seat[1];
    } else {
        row  = current_seat.substring(0,2);
        number = current_seat[2];
        }
 //$('.seat_info').append("<p>Seat "+ row + number + "</p>");
 $('.seat_info').append("<div><table class = 'seat_table'><th>Seat</th><th>" + row + number +"</th></table></div>");
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/seats?filter[plane_id]=' + plane,
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
 
  
               let seats = response;
               console.log(seats);
                for(var i = 0; i < seats.length; i++) {
                   if(seats[i].row == row && seats[i].number == number && seats[i].plane_id == plane) {
                    var cabin = seats[i].cabin;
                    var window;
                    var aisle;
                    var exit;
                    var id = seats[i].id;
                    if(seats[i].is_window === false) {
                        window = "no";
                        
                    } else {
                        window = 'yes';
                    }
                     if(seats[i].is_aisle === false) {
                        aisle = "no";
                    } else {
                        aisle = 'yes';
                    }
                     if(seats[i].is_exit === false) {
                        exit = "no";
                    } else {
                        exit = 'yes';
                    }
                  console.log('found seat');
                  $('.seat_table').append("<tr><td>Cabin</td><td>" + cabin + "</td></tr>");
                   $('.seat_table').append("<tr><td>Window seat?</td><td>" + window + "</td></tr>");
                    $('.seat_table').append("<tr><td>Aisle seat?</td><td>" + aisle + "</td></tr>");
                     $('.seat_table').append("<tr><td>Exit? </td><td>" + exit + "</td></tr>");
                     if(seats[i].info === null || seats[i].info === undefined) {
                       $('.seat_table').append("<tr><td>Information</td><td>No information provided.</td></tr>");
                  } else {
                   $('.seat_table').append("<tr><td>Information </td><td>" + seats[i].info + "</td></tr>");
                  }
                  
                    $('.seat_info').append("<p>Add/Update Information: </p><form><input id ='added_info' type = 'text'></input></form><button onclick = 'addInfo(" + id + ");'>Add Information</button>");
                   }
                    }
               }
            
            });
   
    $(".seat_display").empty();
}

function addInfo(identification) {
    var id = JSON.stringify(identification);
    var info =document.getElementById('added_info').value;
    console.log(info);
    console.log(id);
    //var current_seat = document.getElementById('view_seats').value;
     $.ajax({
  url: 'http://comp426.cs.unc.edu:3001/seats/' + id,
  type: 'PUT',
  data: {
    "seat": {
      "info": info
    }
  },
  xhrFields: { withCredentials: true },
   success: () => {
               console.log('information has been added');
               $('.seat_info').empty();
               $('.seat_info').append('<div><p>Information has been added.</p></div>');
            }
});
}


function login() {
    $.ajax({
  url: 'http://comp426.cs.unc.edu:3001/sessions',
  type: 'POST',
  data: {
    "user": {
      "username": "maryhalv",
      "password": "730083027"
    }
  },
  xhrFields: { withCredentials: true },
   success: () => {
               //console.log('success');
            }
});
}