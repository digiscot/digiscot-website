$( document ).ready(function() {
  $('input[type="number"]').onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
          return false;
      }
  }
  $("#QuestionnaireForm").validate();
});
