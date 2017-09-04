window.addEventListener("message", (event) => {
    if (event.data.hasOwnProperty('event')) {
        switch (event.data.event) {
            case ('resize'):
            $('iframe[src*="' + event.origin + '"]').css('height', event.data.height+30);
            break;
        }
    }
}, false);
