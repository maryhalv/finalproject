var root = 'http://comp426.cs.unc.edu:3001';
$(document).ready( function(){
    login();
    createPage();
    
    
    });

function createPage() {
    $('body').append("<h1>Flight Editor</h1>");
    createSelect();
    $('body').append("<div><table class = 'dashboard'></table><div>");
    $('.dashboard').append('<tr><td><button onclick = "getPlanes();">Planes</button></td><td><button onclick = "getFlights();">Flights</button></td></tr>');
    $('.dashboard').append('<tr><td><button onclick = "getSeats();">Seats</button></td><td><button onclick = "getFlights();">TBD</button></td></tr>');
 
    
}

function createSelect() {

        $('body').append("<div><form><select class = 'airlines'></select></form><div>");
        
        $.ajax({
            url: 'http://comp426.cs.unc.edu:3001/airlines',
  type: 'GET',
  dataType: 'json',
  xhrFields: { withCredentials: true },
   success: (response) => {
    console.log(response.data);
               let all_airlines = response.data;
                for(var i = 0; i < all_airlines.length; i++) {
                    console.log(all_airlines[i].name);
                $('.airlines').append("<option>" + all_airlines[i].name + "</option>");
               }
               }
            
            });
}

function getSeats() {
      $('body').empty();
        $('body').append("<h1>Seats</h1>");
        
        
}
function getFlights() {
     $('body').empty();
        $('body').append("<h1>Flights</h1>");
        //functionality to add flights
        //delete fights
        //
}
function getPlanes(){
    $('body').empty();
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
               console.log('success');
                
            }
});
}
