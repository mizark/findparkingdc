$(document).ready(function(){
	
	$('#submitspot').click(function(){

		if (navigator.geolocation) { 
			navigator.geolocation.getCurrentPosition(function(position) {  

				

                $.ajax({

                  type: "POST",
                  url: "/submitspot" ,
                  dataType: 'json',
                  async: false,
                  data: JSON.stringify({ "latitude": position.coords.latitude, 
                                         "longitude" : position.coords.longitude }),
                  success:  function (){
                              alert("Thanks!"); 
                            },
                  error:  function(){  
                            alert("fail :-(");  
                          }  
                });//end ajax

			    
			}); // end navigator
		} //end if
		else {
	    	alert('W3C Geolocation API is not available');
	  	} //end else
	}); //end click event
})