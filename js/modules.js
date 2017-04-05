$.ajaxSetup({ cache: false });

$(document).ready(function() {
  $("div[data-module]").each(function(){
    var moduleName = $(this).attr("data-module")
    $.get({
      url: './modules/' + moduleName,
      success: function(data) {
        $(this).append(data);
        var additionalJs = $(this).attr('data-additional-js');
        if (additionalJs) {
          $.getScript(additionalJs);
        }
      }.bind(this)
    });
  });
});

window.LOCALDATA = true;
