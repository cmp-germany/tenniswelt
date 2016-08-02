$(document).ready(function(){
  $('.form-control').on('input', function() {
    if ($(this).val() === '' ) {
      $(this).removeClass('is-dirty');
    }
    else {
      $(this).addClass('is-dirty');
    }
  });
});
