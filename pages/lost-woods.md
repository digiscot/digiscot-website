---
layout: page-wide
title: Lost Woods
permalink: /lostwoods/
---

<div id="map-canvas"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBczbNIYsrrbOLxudm2oZq9t1xzLLpA2cg"></script>

<script type="text/javascript">
  // PRACTICE CODE WORKING, COMMENTS FOR UPDATING CODE WHEN WE HAVE SF API
  // PUT ARRAY OF ORG NAME & ADDRESSES FROM SF API HERE
  // DECLARE AN ARRAY OF MARKERS & INFO WINDOWS
  var orgName = 'SCVO';
  var address = 'Mansfield Traquair Centre, 15 Mansfield Place, Edinburgh, EH3 6BB, UK';
  var geocoder, map;
    
  function main() {
    geocoder = new google.maps.Geocoder();
    // FOR EACH ADDRESS IN ARRAY LOOP GEOCODER
    geocoder.geocode({'address': address}, function (result, statusCode){
      if(statusCode == google.maps.GeocoderStatus.OK){
        var mapOptions = {
          center: result[0].geometry.location,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          // DISABLED UI AS IT WAS NOT DISPLAYING CORRECTLY - need to fix
          disableDefaultUI: true,
          mapTypeControl: true
        };
        
        // MOVE THIS MAP UP TOP WITH DEFAULT OPTIONS AFTER WE GET SF API
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        
        // POPULATE ARRAY OF MARKERS
        var marker = new google.maps.Marker({
          map:map,
          position: result[0].geometry.location,
          title: orgName
        });
        
        // POPULATE ARRAY OF INFOWINDOWS
        var infoWindow = new google.maps.InfoWindow({
          content: '<h1>' + orgName + '</h1>' + '<p>' + address + '</p>'
        });
        google.maps.event.addListener(marker, 'click', function(){infoWindow.open(map,marker);});
      }
      else{
        // REMOVE THIS AFTER SF API
        var mapOptions = {
        center: {lat: 55.858, lng: 4.259},
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        mapTypeControl: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
      }
    });
  }
  main();
 </script>
