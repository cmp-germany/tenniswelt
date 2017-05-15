$(document).ready(function () {
  displayOption()
  $('.radio-event').change(function () {
    displayOption()
  })
})

function displayOption () {
  if ($('#cm').is(':checked')) {
    console.log('asd')
    $('.radio-hide-away').addClass('display-option')
  } else {
    $('.radio-hide-away').removeClass('display-option')
  }
}
