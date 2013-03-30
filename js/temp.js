$(document).ready(function(){


  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position) {  

      $.ajax({ 
        type: 'GET', 
        url: '/submitspot',
        success: function (data) {

          var point = new google.maps.LatLng(data[0].latitude, 
                                             data[0].longitude);
          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();

          // Initialize the Google Maps API v3
          var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 17,
            center: point,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById('directions-panel'));

          // Place all markers that are close by to user as well as current location
          var marker;
          marker = new google.maps.Marker({
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map:map
          });

          for (var i = 0; i < data.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
              map:map
            });
          }; //end for

          
          // Place all markers that are close by to user as well as current location
          var marker;
          marker = new google.maps.Marker({
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map:map
          });

          var start = position.coords.latitude.toString() + ',' + position.coords.longitude.toString()
          //var start = data[0].latitude.toString() + ',' + data[0].longitude.toString()
          var end = data[1].latitude.toString() + ',' + data[1].longitude.toString()
          var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });

          
          
        

        } //end success event

      }); //end ajax

      
    }); //end navigator
  } //end if
  else {
    alert('W3C Geolocation API is not available');
  } //end else

}) //end document event 



