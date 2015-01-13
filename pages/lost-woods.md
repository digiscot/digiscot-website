---
layout: page
title: Lost Woods
permalink: /lostwoods/
---
<div class="row">
<div id="map-canvas" class="col-md-8"></div>
<div class="col-md-4">test</div>
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
