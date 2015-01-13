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
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
        };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  }
  initialize();
    
  function initialize2() {
    geocoder = new google.maps.Geocoder();
 }
  
</script>
