var root = 'http://comp426.cs.unc.edu:3001/';
var name = 'default';
var airlineId = 1001;
$(document).ready( function(){
    login();
    createPage();
    });

function createPage() {
    $('body').append("<h1>Please Select an Airline</h1>");
    createSelect();
}

function createSelect() {
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
 //console.log(document.getElementById('airlines').value);
 
  //var airline = document.getElementById('airlines').value;
  name = document.getElementById('airlines').value;
 airlineId = name.substring(name.length-5);
 //console.log(airlineId);


    $('body').empty();
   $('body').append("<h1>" + name.substring(0, name.length-7) + " Flight Editor</h1>");
       $('body').append("<div><table class = 'dashboard'></table><div>");
    $('.dashboard').append('<tr><td><button onclick = "getPlanes();">Planes</button></td><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getSeats();">Tickets</button></td><td><button onclick = "getFlights();">TBD</button></td></tr>');
}

function recreateDashboard() {
 //console.log(document.getElementById('airlines').value);
 
  //var airline = document.getElementById('airlines').value;
  //name = document.getElementById('airlines').value;
 //airlineId = name.substring(name.length-5);
 //console.log(airlineId);


    $('body').empty();
   $('body').append("<h1>" + name.substring(0, name.length-7) + " Flight Editor</h1>");
       $('body').append("<div><table class = 'dashboard'></table><div>");
    $('.dashboard').append('<tr><td><button onclick = "getPlanes();">Planes</button></td><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getSeats();">TBD</button></td><td><button onclick = "getFlights();">TBD</button></td></tr>');
}


function getSeats() {
      $('body').empty();
        $('body').append("<h1>Seats</h1>");
       
        
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
            url: 'http://comp426.cs.unc.edu:3001/flights',
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
                    if(flights[i].airline_id === airlineId) {
                        //console.log('reached');
                $('.flights').append("<option>Flight: " + flights[i].id + " Plane: "  +flights[i].plane_id + "</option>");
                    }
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
                    //console.log(planes[i].id);
                    //console.log(thisplane);
                    ///console.log(JSON.stringify(planes[i].id) === thisplane);
                    if(JSON.stringify(planes[i].id) === thisplane) {
                        //console.log('reached');
                       //console.log(planes[i].seatmap_url);
                       var seatmap = planes[i].seatmap_url;
                        //yay this works!!
                        $('body').append("<div class = 'editor'><p>Viewing Seat Map for Plane " + thisplane +"</p></div>");
                        $('.editor').append("<button onclick='seatEditor(" + thisplane + ");'>Edit Seats</button>");
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
  // console.log(response);
   //$('.editor').append("<p>Showing Seats for </p>");
  $('.editor').append("<p>Select a Seat to view its information</p>");
    $('.editor').append("<form><select id='view_seats'></select></form>");
     $('.editor').append("<button onclick = 'getSeatInfo(" + plane + ");'>Get Info</button>");
     $('body').append("<div class='seat_info'></div>");
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
 $('.seat_info').append("<p>Seat "+ row + number + "</p>");
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/seats',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
 
  
               let seats = response;
                for(var i = 0; i < seats.length; i++) {
                   if(seats[i].row == row && seats[i].number == number && seats[i].plane_id == plane) {
                    var cabin = seats[i].cabin;
                    var window;
                    var aisle;
                    var exit;
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
                 // $('.editor').append("<div class = 'seat_info'><p>Seat "+ row + number + "</p></div>");
                  $('.seat_info').append("<p>Cabin: "+ cabin+ "</p>");
                   $('.seat_info').append("<p>Window seat?: "+ window+ "</p>");
                   $('.seat_info').append("<p>Aisle seat?: "+ aisle+ "</p>");
                    $('.seat_info').append("<p>Exit?: "+ exit+ "</p>");
                   }
                    }
               }
            
            });
   
    $(".seat_display").empty();
    
    
    
}
function getPlanes(){
    $('body').empty();
    $('body').append("<div><button onclick='recreateDashboard();'>Return to Dashboard</button><div>");
        $('body').append("<h1>Planes</h1>");
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