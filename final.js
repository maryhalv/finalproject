var root = 'http://comp426.cs.unc.edu:3001/';
var name = 'default';
var airlineId = 1001;
var arrive = new Date();
var depart = new Date();
var airport_ids = {};
var plane_id_seat = 1001;
$(document).ready( function(){
    login();
    createSelect();
    });



function createSelect() {
        $('body').empty();
        $('body').append("<h1>Please Select an Airline</h1>");
        $('body').append("<div><p>Employee Id:</p><div>");
        $('body').append("<div><form id = 'test'><input type = 'text'></input></form><div>");
        $('body').append("<div><p>Employee Password:</p><div>");
        $('body').append("<div><form id = 'test'><input type = 'text'></input></form><div>");
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
    $('.dashboard').append('<tr><td><button onclick = "flightInfoPage('+ airlineId + ');">Flights</button></td></tr>');
   $('.dashboard').append('<tr><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getFlights_for_Tickets();">Tickets</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getAirports();">Airports</button></td></tr>');
    //$('.dashboard').append('<tr><td><button onclick = "fun_Map();">Interactive Map</button></td></tr>');
    
}

/*function fun_Map() {
    $('body').empty();
    $('body').append('<h1>Interactive Airport Map</h1>')
     $('body').append('<span class="mappie"><div class = "airport_drop"><form><select id ="airports"></select></form></div><span>');
     $('.mappie').append('<div id = "map"></div>');
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airports',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log('reached');
    let airports = response;
                for(let i = 0; i < airports.length; i++ ) {
                    $('#airports').append("<option>" + airports[i].name + "</option>");
                    console.log(airports[i].id);
                    airport_ids[i] = airports[i].id;
                    var city = airports[i].city;
                    $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=b92f9f9fd01f6586a4ff4febd273ea26&units=imperial',
  type: 'GET',
  dataType: 'json',
   success: (response) => {
let weather = response;

var lat = weather.coord.lat;
var lon = weather.coord.lon;

                    $('#airports').hover(function () {
                        buildMap(lat, lon);
                        });
               }
            });
                }

               }
            
            });
    
}*/

/*var map_interactive;
    function buildMap(latitude, longitude) {
        var lat_ = latitude;
        var long_ = longitude;
    var location= {lat: lat_, lng: long_};
    map_interactive = new google.maps.Map( document.getElementById('map_2'), {zoom: 4, center: location});
 
             var marker = new google.maps.Marker({position: location, map: map_interactive});
        
     //var marker = new google.maps.Marker({position: location, map: map});
        }*/

function getAirportInfo() {
    let airport_name = document.getElementById('airports').value;
    var city = 'NYC';
    //console.log(airport_name);
    $('.weather').empty();
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airports?filter[name]='+ airport_name ,
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    let airport = response;
   
    $('.weather').append('<p> Weather in ' + airport[0].city + ':</p>');
     $('.weather').append('<div class = "map_display"><table class = "weather_table"></table><div>');
     $('.weather_table').empty();
    city = airport[0].city;

$.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=b92f9f9fd01f6586a4ff4febd273ea26&units=imperial',
  type: 'GET',
  dataType: 'json',
   success: (response) => {
let weather = response;

$('.weather_table').append('<tr><td>City</td><td>' + city + '</td></tr>');
   $('.weather_table').append('<tr><td>Temperature</td><td>' + weather.main.temp + '</td></tr>');
    $('.weather_table').append('<tr><td>Temperature</td><td>' + weather.wind.speed + ' mph</td></tr>');
    //$('.weather_table').append('<tr><td>Description</td>' + weather.main.description + '<td></td></tr>');
    $('.weather_table').append('<tr><td class ="coords" >Long: </td><td class = "coords">Long: ' +  weather.coord.lon + '  Lat: ' + weather.coord.lat + '</td><tr>');
    $('.map_display').append('<div id = "map"></div>');
    
    createMap(weather.coord.lat, weather.coord.lon);
    
               }
            });
               }
            });
}

 var map;
    function createMap(latitude, longitude) {
        var lat_ = latitude;
        var long_ = longitude;
    var location= {lat: lat_, lng: long_};
    map = new google.maps.Map( document.getElementById('map'), {zoom: 4, center: location});
    $('.coords').hover(function (){
             var marker = new google.maps.Marker({position: location, map: map});
        });
     //var marker = new google.maps.Marker({position: location, map: map});
        }

function getAirports() {
    $('body').empty();
      $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append('<div><h1>Airports</h1></div>');
    $('body').append('<div><button onclick = "createAirportPage();">Create an Airport</button><div>');
    $('body').append('<div><p>Select an Airport to view the local weather conditions at that location.<p></div>');
      $('body').append('<div class = "airport_drop"><form><select id ="airports"></select></form></div>');
        $('.airport_drop').append('<button onclick = "getAirportInfo();">Select Airport</button>');
        $('body').append('<div class = "weather"></div>');
    
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airports',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log('reached');
    let airports = response;
                for(let i = 0; i < airports.length; i++ ) {
                    $('#airports').append("<option>" + airports[i].name + "</option>");
                    //console.log(airports[i].id);
                    airport_ids[i] = airports[i].id;
                }

               }
            
            });
}

function createAirportPage() {
    $('body').empty();
    $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append("<h1>Create an Airport</h1>");
    
    $('body').append("<div class = 'input'><p>Name <form><input type = 'text' id ='name'></input></form></p></div>");
    //$('body').append("<div><p>Middle Name <form><input type = 'text' id ='middlename'></input></form></p></div>");
    $('.input').append("<p>Code <form><input type = 'text' id ='code'></input></form></p>");
   
    $('.input').append("<button onclick = 'createAirport();'>Create Airport</button>");
}

function createAirport(){
console.log('reached');
    
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airports',
        type: 'POST',
  dataType: 'json',
  xhrFields: { withCredentials: true },
  data: {
    "airport": {
    "name":   document.getElementById('name').value,
    "code":    document.getElementById('code').value
  }
  },
   success: () => {
   console.log('success');
   
$('.input').empty();
$('.input').append('<p>Airport Successfully Created</p>');

   }
        });
}

function getFlights_for_Tickets(){
    //generate all the planes for the flight, then generate the tickest once a plan has been selected
    $('body').empty();
    $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append("<h1>Tickets</h1>");
    $('body').append("<div class = 'create_t'><button onclick='createTickets();'>Create a New Ticket</button></div>");
     $('body').append("<div><table class = 'ticket_display'><tr><th>First Name </th><th>Last Name </th><th>Age </th><th>Gender </th><th>Instance </th><th>Seat </th><th>Edit </th></tr></table></div>");
    
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
 $('.dashboard').append('<tr><td><button onclick = "flightInfoPage('+ airlineId + ');">Flights</button></td></tr>');
   $('.dashboard').append('<tr><td><button onclick = "getFlights(' + airlineId + ');">Seats</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getFlights_for_Tickets();">Tickets</button></td></tr>');
     $('.dashboard').append('<tr><td><button onclick = "getAirports();">Airports</button></td></tr>');
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
        $('body').append("<div><button onclick = 'createFlight();'>Create a New Flight</button></div>");
        //$('.head').append("<div><button onclick = 'flightInfoPage(" + identification + ");'>Change Flight</button></div>");
        $('body').append("<div class = 'first'><p>Displaying Flights for " + name.substring(0, name.length-7)  +  "</p></div>");
           $('.first').append("<p>Flight Number</p>");
         $('.first').append("<form><select id='current_flight' class = 'flights'></select></form>");
           $('.first').append("<button  class = 'get_flight' onclick='getFlightInfo();'>View Flight Info</button>");
           $('body').append("<div class = 'flight_info'></div>");
               $('body').append("<div class = 'change_times'></div>");
         

              $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
               let flights = response;
                for(var i = 0; i < flights.length; i++) {
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

function createFlight() {
   console.log('reached');
    $('body').empty();
    $('body').append("<div><button onclick = 'recreateDashboard();'>Return to Dashboard</button></div>");
    $('body').append("<h1>Create a Flight</h1>");
    
    $('body').append("<div class = 'input'></div>");
    $('.input').append("<p>Arrival Time</p><form><input id = 'departure' type = 'text'></input></form>");
     $('.input').append("<p>Departure Time</p><form><input id ='arrival' type = 'text'></input</form>");
    $('.input').append("<p>Number <form><input type = 'text' id ='number'></input></form></p>");
    $('.input').append("<p>Departure Id <form><input type = 'text' id ='depart_id'></input></form></p>");
    $('.input').append("<p>Arrival Id <form><input type = 'text' id ='arrival_id'></input></form></p>");
   
    
    $('.input').append("<button onclick = 'newFlight();'>Create Flight</button>");
}

function newFlight() {
     console.log('reached');
     let time = document.getElementById('departure').value.toString();
     //time.setHours((document.getElementById('departure').value).substring(0,2), (document.getElementById('departure').value).substring(3));
     let time_2 = document.getElementById('arrival').toString();
     //time_2.setHours((document.getElementById('arrival').value).substring(0,2), (document.getElementById('arrival').value).substring(3));
     
    $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights',
        type: 'POST',
  dataType: 'json',
  xhrFields: { withCredentials: true },
  data: {
    "flight": {
    "departs_at":   time,
    "arrives_at":    time_2,
    "number":        document.getElementById('number').value,
    "departure_id":  parseInt(document.getElementById('depart_id').value),
    "arrival_id":  parseInt(document.getElementById('arrival_id').value)
  }
  },
   success: () => {
    $('.input').empty();
    $('.input').append('<p>New flight successfully creatd.</p>');
        console.log('flight created');
   }
        });
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
        //console.log('found flight');
        $('.flight_info').append("<div><table class ='flight_table' ><tr><th>Flight </th><th>" + flight_number  +"</th></tr></table></div>");
        console.log(flights[i].arrives_at);
           console.log(flights[i].departs_at);
           arrive = flights[i].arrives_at;
           depart = flights[i].departs_at;
        var year = flights[i].departs_at.substring(0,4);
        var month = flights[i].departs_at.substring(5,7); //--remember to add one to this value
        var day = flights[i].departs_at.substring(8,10);
        var time = flights[i].departs_at.substring(11,16);
        var year_2 = flights[i].arrives_at.substring(0,4);
        var month_2 = flights[i].arrives_at.substring(5,7); //--remember to add one to this value
        var day_2 = flights[i].arrives_at.substring(8,10);
         var time_2 = flights[i].arrives_at.substring(11,16);
         
         
        $('.flight_table').append("<tr><td>Departs </td><td>" + month + "/" + day + "/" + year + " " + time +"</td><td></td></tr>");
        $('.flight_table').append("<tr><td>Arrives </td><td>" + month_2 + "/" + day_2 + "/" + year_2  + " " + time_2+ "</td><td></td></tr>");

        //$('body').append("<div class = 'change_times'></div>");
        $('.change_times').empty();
        $('.change_times').append("<p>Change Departure Time </p>");
        $('.change_times').append("<form><select id ='departure'></select></form>");
        for(let x =0; x < 23; x++) {
            if(x < 10) {
                x = "0" + x;
            }
            for(let y = 0; y < 60; y++) {
                if(y < 10) {
                    y = "0" + y;
                }
                $('#departure').append("<option>" + x + ":" + y + "</option>");
            }
        }
         $('.change_times').append("<button onclick= 'changeDepart(" + flights[i].id + ");'>Change</button>");
        $('.change_times').append("<p>Change Arrival Time </p>");
        $('.change_times').append("<form><select id ='arrival'></select></form>");
         for(let x =0; x < 23; x++) {
            if(x < 10) {
                x = "0" + x;
            }
            for(let y = 0; y < 60; y++) {
                if(y < 10) {
                    y = "0" + y;
                }
                $('#arrival').append("<option>" + x + ":" + y + "</option>");
            }
        }
         $('.change_times').append("<button onclick = 'changeArrival(" + flights[i].id + ");'>Change</button>");
        
        
                    }
               }
               }
            
            });
               }
    
function changeDepart(information) {
    console.log(depart + "DEPART TIME");
   // let time = new Date(depart);
    console.log((document.getElementById('departure').value).substring(0,2));
    //why is this adding the hours instead of changing them??
   // time.setHours((document.getElementById('departure').value).substring(0,2), (document.getElementById('departure').value).substring(3));
   let time = document.getElementById('departure').value.toString();
    console.log(time);

   let flight = information;
    console.log(flight);
        $.ajax({
  url: 'http://comp426.cs.unc.edu:3001/flights/' + flight,
  type: 'PUT',
  data: {
    "flight": {
      "departs_at": time
    }
  },
  xhrFields: { withCredentials: true },
   success: () => {
               console.log('departure time changed');
               $('.change_times').empty();
                 $('.flight_table').empty();
               getFlightInfo();
               // $('.change_times').append('<p>Departure time has successfully been changed.</p>');
            }
});
}

function changeArrival(information) {
    console.log(arrive + "ARRIVE TIME");
    let time = document.getElementById('arrival').value.toString();
  
   
   let flight = information;
    console.log(flight);
        $.ajax({
  url: 'http://comp426.cs.unc.edu:3001/flights/' + flight,
  type: 'PUT',
  data: {
    "flight": {
      "arrives_at": time
    }
  },
  xhrFields: { withCredentials: true },
   success: () => {
               console.log('departure time changed');
               $('.change_times').empty();
               $('.flight_table').empty();
                 getFlightInfo();
               //$('.change_times').append('<p>Arrival time has successfully been changed.</p>');
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
           $('body').append("<div class = 'editor'><button onclick='getSeatMap();'>View Seat Map</button></div>");
         

              $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/flights?filter[airline_id]=' + airlineId,
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    //console.log(response);
               let flights = response;
                for(var i = 0; i < flights.length; i++) {
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
    $('.seat_display').empty();
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
                        $('.editor').append("<p>Viewing Seat Map for Plane " + thisplane +"</p>");
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
    plane_id_seat = current_plane;
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
               //$('.seat_info').empty();
               getSeatInfo(plane_id_seat);
               //$('.seat_info').append('<div><p>Information has been added.</p></div>');
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