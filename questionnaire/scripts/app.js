$( document ).ready(function() {
  $('input[type="number"]').keypress(function(event) {
    if ( event.which == 45 || event.which == 189 ) {
        event.preventDefault();
     }
  });
  $("#QuestionnaireForm").validate();
});
