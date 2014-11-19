$(function() {

  $('a#splash-down').click(function(e){
      e.preventDefault();
      $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);  
    });
    
});