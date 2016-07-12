$("div[data-module]").each(function(){
  var moduleName = $(this).attr("data-module")
  $.get({
    url: './modules/' + moduleName,
    success: function(data) {
      $(this).append(data);
    }.bind(this)
  });
});
