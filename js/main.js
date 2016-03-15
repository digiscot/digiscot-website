$(function() {

  $('a#splash-down').click(function(e){
      e.preventDefault();
      $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);  
    });
  
  console.log(window.location);

  if (window.location.href == 'http://digital.scvo.org.uk/charter/') {
    window.location.href = 'http://charter.scvo.org.uk/';
  }
    
});
