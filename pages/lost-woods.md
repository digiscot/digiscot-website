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
  var orgName = 'Scottish Council for Voluntary Organisations';
  var addresses = [
  'Mansfield Traquair Centre, 15 Mansfield Place, Edinburgh, EH3 6BB, UK',
  'Brunswick House, 51 Wilson St, Glasgow, G1 1UZ, UK',
  'Fairways House, Fairways Business Park, Castle Heather, Inverness, IV2 6AA, UK'];
  var geocoder, map;
  var mapOptions = {
    center: {lat: 55.950, lng: 3.183},
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    mapTypeControl: true
  };
    
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  /*function geoCodeAndMark(addresses) {
    geocoder = new google.maps.Geocoder();
    // FOR EACH ADDRESS IN ARRAY LOOP GEOCODER
    
    geocoder.geocode({'address': address}, function (result, statusCode){
      if(statusCode == google.maps.GeocoderStatus.OK){
        
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
  main();*/
 </script>
