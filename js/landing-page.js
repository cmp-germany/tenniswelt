var innerDivElements = {
  "slide--with-background": "slide--with-background__inner-div",
  "profile-card": "profile-card__innerDiv clearfix",
  "register-card": "register-card__innerDiv clearfix"
};


$(document).ready(function (){

  for (var key in innerDivElements) {
    if (innerDivElements.hasOwnProperty(key)) {
      $('.' + key).wrapInner( '<div class="' + innerDivElements[key] + '"></div>' );
    }
  }


  // Background: resize the innerDivElement to fit be as big as the container
  $('.slide--with-background__inner-div').height(function (index, oldHeight) {
    return $(this).parent().height();
  });
});
