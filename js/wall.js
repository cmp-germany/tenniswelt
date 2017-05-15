$(document).ready(function () {
  $('.element-right').click(function () {
    // var parent = $(this).parents("wall-widget--filter-switch");
    $(this).parent().parent().removeClass('is-selected-left')
    $(this).parent().parent().addClass('is-selected-right')
  })

  $('.element-left').click(function () {
    $(this).parent().parent().addClass('is-selected-left')
    $(this).parent().parent().removeClass('is-selected-right')
  })

  $('.select-toggle-button').click(function () {
    $(this).parent().parent().toggleClass('is-selected-left is-selected-right')
  })

  /* matching auf matching-seite */
  $('.matching__element--right').click(function () {
    // var parent = $(this).parents("wall-widget--filter-switch");
    $(this).parent().removeClass('is-selected-left')
    $(this).parent().addClass('is-selected-right')
  })

  $('.matching__element--left').click(function () {
    $(this).parent().addClass('is-selected-left')
    $(this).parent().removeClass('is-selected-right')
  })

  $('.select-toggle-button--matching').click(function () {
    $(this).parent().toggleClass('is-selected-left is-selected-right')
  })
})
