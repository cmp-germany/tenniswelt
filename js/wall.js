$(document).ready(function() {
  $('.element-right').click(function() {
    //var parent = $(this).parents("wall-widget--filter-switch");
    console.log(parent);
    $(this).parent().parent().removeClass('is-selected-left');
    $(this).parent().parent().addClass('is-selected-right');
  });

  $('.element-left').click(function() {
    $(this).parent().parent().addClass('is-selected-left');
    $(this).parent().parent().removeClass('is-selected-right');
  });

  $('.select-toggle').click(function() {
    $(this).parent().parent().toggleClass('is-selected-left is-selected-right');
  });
});
