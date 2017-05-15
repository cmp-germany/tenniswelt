$.ajaxSetup({ cache: false })

$(document).ready(function () {
  $('div[data-module]').each(function myself () {
    var moduleName = $(this).attr('data-module')
    $.get({
      url: './modules/' + moduleName,
      success: function (data) {
        $(this).append(data)
        var additionalJs = $(this).attr('data-additional-js')
        if (additionalJs) {
          $.getScript(additionalJs)
        }
        $(this).find('div[data-module]').each(myself)
      }.bind(this)
    })
  })
})

window.LOCALDATA = true
