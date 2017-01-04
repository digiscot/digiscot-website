function hashChange() {
    var anchor = window.location.hash;
    $(anchor).trigger('click');
    window.setTimeout(function () {
        //scrollTo(anchor);
    }, 400);

    if(anchor === '#top'){
        $('[data-tags]').show();
    }else{
        $('[data-tags]')
            .hide()
            .filter('[data-tags*="' + anchor.substring(1) + '"]')
                .show();
    }

    $('a[href*="#"]')
        .parent()
        .removeClass('active');
    $('a[href*="' + anchor + '"]')
        .parent()
        .addClass('active');

    $('a.chip[href*="#"]').removeClass('teal lighten-4');
    $('a.chip[href*="' + anchor + '"]').addClass('teal lighten-4');
}

$(document).ready(function () {
    $(".button-collapse").sideNav();
    var headroom = new Headroom(document.querySelector("#header"), {
        offset: 64
    });
    headroom.init();

    var tagroom = null;
    var tagHeader = $('#tag-header');
    if(tagHeader.length > 0){
        tagroom = new Headroom(document.querySelector('#tag-header'), {
            offset: -64
        });
        tagroom.init();
    }

    $(window).on('hashchange', hashChange);

    if (window.location.hash) {
        hashChange();
    }

    $('.collapsible').collapsible({
        onOpen: function (el) {
            window.setTimeout(function () {
                headroom.unpin();
            }, 400);
        }
    });

    $('.parallax').parallax();

    $.localScroll({
        duration: 400,
        hash: true
    });

    if ($('#events').length > 0) {
        $.getJSON("https://www.googleapis.com/calendar/v3/calendars/8ep89c5uh3nekaub1jelb4jdp1epc8t0%40import.calendar.google.com/events?key=AIzaSyD0cYtgDN1PYx5mr9ubdhlLPAtlMrwiBdo")
            .done(function (obj, status, xhr) {
                console.log('Got:', obj, status, xhr);
                displayEvents(obj.items);
            })
            .fail(function (obj, status, xhr) {
                console.error('Failed:', obj, status, xhr);
            });
    }

    function displayEvents(events) {
        var $el = $('#events');
        if (events.length === 0) {
            $el.html('<strong>Sorry but there are currently no events');
            return;
        }

        $el.empty();

        for (var x = 0; x < events.length; x++) {
            var event = events[x];

            var uid = event.iCalUID.replace(/\D/g, '');
            var image = 'https://maps.googleapis.com/maps/api/staticmap';
            image += '?markers=' + event.location;
            image += '&size=300x300';
            image += '&key=AIzaSyD0cYtgDN1PYx5mr9ubdhlLPAtlMrwiBdo';

            var maplink = 'https://www.google.co.uk/maps/search/';
            maplink += encodeURIComponent(event.location);

            var $event = $('<div />').addClass('card horizontal');

            var $image = $('<a />').attr({ 'href': 'maplink', 'title': 'Find on Google Maps' }).addClass('card-image').appendTo($event);
            var $img = $('<img />').attr('src', image).addClass('responsive-img').appendTo($image);

            var $stacked = $('<div />').addClass('card-stacked').appendTo($event);

            var $content = $('<div />').addClass('card-content').appendTo($stacked);
            var $title = $('<span />').addClass('card-title').text(event.summary).appendTo($content);
            var $info = $('<ul />').addClass('fa-ul').appendTo($content);
            var $date = $('<li />').appendTo($info);
            $date.html('<i class="fa fa-li fa-calendar"></i>' + event.start.dateTime + ' - ' + event.end.dateTime);
            var $location = $('<li />').appendTo($info);
            $location.html('<i class="fa fa-li fa-map-marker"></i>' + event.location);
            var $description = $('<div />').html(event.description).appendTo($content);

            var $action = $('<div />').addClass('card-action').appendTo($stacked);
            var $link = $('<a />').addClass('teal-text').attr('href', 'https://www.meetup.com/One-Digital-Meetup/events/' + uid + '/').html('<i class="fa fa-fw fa-meetup"></i> Visit event on meetup.com').appendTo($action);

            $el.append($event);
        }
    }

    var sfOptions = [];

    $('.sf-fade').each(function(i, o){
        var $o = $(o);
        if(!$o.attr('id')){
            $o.attr('id', 'sf-fade-' + i);
        }
        sfOptions.push({
            selector: '#' + $o.attr('id'),
            offset: 100,
            callback: function(el) {
                Materialize.fadeInImage($(el));
            }
        });
    });

    $('.sf-ul').each(function(i, o){
        var $o = $(o);
        if(!$o.attr('id')){
            $o.attr('id', 'sf-ul-' + i);
        }
        sfOptions.push({
            selector: '#' + $o.attr('id'),
            offset: 100,
            callback: function(el) {
                $(el).css('animation', 'slide-in 2s cubic-bezier(0.895, 0.03, 0.685, 0.22), spin-g 1s 2s linear');
                Materialize.showStaggeredList($(el));
            }
        });
    });

    Materialize.scrollFire(sfOptions);

    $('img[data-fallback]').one('error', function(){
        var $this = $(this);
        var fallback = $this.data('fallback');
        $this.attr('src', fallback);
    });
});