---
layout: page
title: Lost Woods
permalink: /lostwoods/
---
<p> SCVO office locations </p>
<div id="map-canvas"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBczbNIYsrrbOLxudm2oZq9t1xzLLpA2cg"></script>

<script type="text/javascript">
  var orgName = 'Scottish Council for Voluntary Organisations';
  var addresses = [
  'Mansfield Traquair Centre, 15 Mansfield Place, Edinburgh, EH3 6BB, UK',
  'Brunswick House, 51 Wilson St, Glasgow, G1 1UZ, UK',
  'Fairways House, Fairways Business Park, Castle Heather, Inverness, IV2 6AA, UK',
  'Hayweight House, 23 Lauriston Street, Edinburgh, EH3 9DQ, UK'
  ];
  
  function main(){
    var geocoder, map, i;
    var mapOptions = {
      center: {lat: 56.490671, lng: -4.202646},
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      mapTypeControl: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    geocoder = new google.maps.Geocoder();
    
    for(i=0;i<addresses.length;i++){
      geocoder.geocode({'address': addresses[i]}, function(result, statusCode){
        if(statusCode == google.maps.GeocoderStatus.OK){
          var marker = new google.maps.Marker({
            map:map,
            position: result[0].geometry.location,
            title: orgName
          });
          
          /* 
           addresses[i] not working due to asychronous execution of geocoder.geocode
           value of i is 4 (out of bounds) by time geocode returns and creates this infowindow
           solution is to rather than use a volatile index variable instead make this a function and
           pass address in as a parameter
          */
          var infoWindow = new google.maps.InfoWindow({
            content: '<h1>' + orgName + '</h1>' + '<p>' + /*addresses[i]*/'No Skull Kids here ' + '\u2620' + '</p>'
          });
          google.maps.event.addListener(marker, 'click', function(){infoWindow.open(map,marker);});
        }
      });
    }
  }
  
  google.maps.event.addDomListener(window, 'load', main);
  
 </script>
