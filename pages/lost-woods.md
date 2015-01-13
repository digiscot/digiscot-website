---
layout: page
title: Lost Woods
permalink: /lostwoods/
---

<div class="container" id="mainContainer">
  <div class="row">
    <div class="col-md-6" id="map-canvas"></div>
    <div class="col-md-6"> <img src="http://img2.wikia.nocookie.net/__cb20110514155723/zelda/images/3/3f/Skull_Kid_Artwork_%28Ocarina_of_Time%29.png"></div>
    </div>
</div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBczbNIYsrrbOLxudm2oZq9t1xzLLpA2cg"></script>

<script type="text/javascript">
  var address = 'Mansfield Traquair Centre, 15 Mansfield Place, Edinburgh, EH3 6BB, UK';
  var geocoder, map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (result, statusCode){
      window.alert('Status code' + statusCode);
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
          $("#MainContainer").hide();
        }
      });
  }
  initialize();
</script>
