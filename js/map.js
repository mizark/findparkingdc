$(document).ready(function(){


  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position) {  

      $.ajax({ 
        type: 'GET', 
        url: '/submitspot',
        success: function (data) {

          var point = new google.maps.LatLng(data[0].latitude, 
                                             data[0].longitude);

          // Initialize the Google Maps API v3
          var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 18,
            center: point,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          // Place all markers that are close by to user
          var marker;
          for (var i = 0; i < data.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
              map:map
            });
          };
        

        } //end success event

      }); //end ajax

      
    }); //end navigator
  } //end if
  else {
    alert('W3C Geolocation API is not available');
  } //end else

}) //end document event