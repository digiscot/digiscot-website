---
layout: page
title: Lost Woods
permalink: /lostwoods/
---

<div class="container">
  <div class="row">
    <div class="col-md-6" id="map-canvas"></div>
    <div class="col-md-6"><img src="http://img2.wikia.nocookie.net/__cb20110514155723/zelda/images/3/3f/Skull_Kid_Artwork_%28Ocarina_of_Time%29.png"></div>
    </div>
</div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBczbNIYsrrbOLxudm2oZq9t1xzLLpA2cg"></script>

<script type="text/javascript">
  function initialize() {
    var mapOptions = {
      center: {lat: -34.397, lng: 150.644}, 
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  }
  initialize();
</script>
