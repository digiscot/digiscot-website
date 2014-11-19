$(function() {

  $('a').not('.dropdown-toggle').click(function(){
      $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);  
    });

  $('.nav a').not('.dropdown-toggle').click(function(){ 
      if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
      }
    });
    
});