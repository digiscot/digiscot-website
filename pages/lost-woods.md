---
layout: page
title: Lost Woods
permalink: /lostwoods/
---

<div id="map-canvas"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBczbNIYsrrbOLxudm2oZq9t1xzLLpA2cg"></script>

<script type="text/javascript">
  var address = 'Mansfield Traquair Centre, 15 Mansfield Place, Edinburgh, EH3 6BB, UK';
  var geocoder, map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (result, statusCode){
      if(statusCode == google.maps.GeocoderStatus.OK){
        var mapOptions = {
          center: result[0].geometry.location,
          zoom: 11
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        
        var marker = new.google.maps.Marker({
          map:map,
          position: result[0].geometry.location
        });
        }
        else{
          var mapOptions = {
          center: {lat: 55.858, lng: 4.259},
          zoom: 11
          };
          map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
        }
      });
  }
  initialize();
</script>
