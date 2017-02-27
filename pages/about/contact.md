---
layout: markdown
title: Contact us
excerpt: Have a question or want to talk to us? Here's how to get in touch.
permalink: /about/contact/
fa-icon: fa-bullhorn
submenu: about
---

## Contact us online

<ul class="fa-ul">
    <li>
        <i class="fa-li fa fa-envelope"></i>
        <a href="mailto:digital@scvo.org.uk">digital@scvo.org.uk </a>
    </li>
    <li>
        <i class="fa-li fa fa-twitter"></i>
        <a href="https://twitter.com/digiscot">@digiscot</a>
    </li>
</ul>

## Visiting us IRL

If you're coming to see us then you'll find us in one of these places.

<div class="row">
    <div class="col s12 m4 l4">
        <div class="card small hoverable">
            <div class="card-content">
                <h3>Edinburgh</h3>

                <address>
                    Hayweight House,<br />
                    23 Lauriston Street,<br />
                    Edinburgh,<br />
                    EH3 9DQ
                </address>
            </div>
        </div>
    </div>
    <div class="col s12 m4 l4">
        <div class="card small hoverable">
            <div class="card-content">
                <h3>Glasgow</h3>

                <address>
                    Brunswick House,<br />
                    51 Wilson Street,<br />
                    Glasgow,<br />
                    G1 1UZ
                </address>
            </div>
        </div>
    </div>
    <div class="col s12 m4 l4">
        <div class="card small hoverable">
            <div class="card-content">
                <h3>Inverness</h3>

                <address>
                    Fairways House,<br />
                    Fairways Business Park,<br />
                    Castle Heather,<br />
                    Inverness,<br />
                    IV2 6AA
                </address>
            </div>
        </div>
    </div>
</div>

<div id="map" style="width:100%;height:550px"></div>

<script>
    function initMap() {
        var edinburgh = {lat: 55.9453875, lng: -3.2033319};
        var glasgow = {lat: 55.8584724, lng: -4.2498509};
        var inverness = {lat: 57.453442, lng: -4.2158106};

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(edinburgh);
        bounds.extend(glasgow);
        bounds.extend(inverness);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: edinburgh
        });

        map.fitBounds(bounds);

        var edinburghInfo = new google.maps.InfoWindow({
            content: '<address>Hayweight House,<br />23 Lauriston Street,<br />Edinburgh EH3 9DQ</address>'
        });
        var glasgowInfo = new google.maps.InfoWindow({
            content: '<address>Brunswick House,<br />51 Wilson Street,<br />Glasgow G1 1UZ</address>'
        });
        var invernessInfo = new google.maps.InfoWindow({
            content: '<address>Fairways House,<br />Fairways Business Park,<br />Castle Heather,<br />Inverness IV2 6AA</address>'
        });

        var edinburghMarker = new google.maps.Marker({
            position: edinburgh,
            map: map,
            title: 'Edinburgh'
        });
        edinburghMarker.addListener('click', function(){
            edinburghInfo.open(map, edinburghMarker);
        });

        var glasgowMarker = new google.maps.Marker({
            position: glasgow,
            map: map,
            title: 'Glasgow'
        });
        glasgowMarker.addListener('click', function(){
            glasgowInfo.open(map, glasgowMarker);
        });

        var invernessMarker = new google.maps.Marker({
            position: inverness,
            map: map,
            title: 'Inverness'
        });
        invernessMarker.addListener('click', function(){
            invernessInfo.open(map, invernessMarker);
        });
    }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0cYtgDN1PYx5mr9ubdhlLPAtlMrwiBdo&callback=initMap">
</script>
