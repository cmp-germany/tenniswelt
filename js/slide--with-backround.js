$(document).ready(function (){
  $('.slide--with-background').wrapInner(
    '<div class="slide--with-background__inner-div"></div>'
  );
  $('.slide--with-background__inner-div').height(
    $(this).parent().height()
  );
});
