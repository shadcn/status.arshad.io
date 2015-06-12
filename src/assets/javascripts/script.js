(function ($) {

  // Set size.
  setCrepidoSize();
  $(window).on('resize', function() {
    setCrepidoSize();
  });

  // Sets the crepido size.
  function setCrepidoSize() {
    $('.crepido').width(function() {
      var boards = $(this).find('.board');
      var width = parseInt(boards.eq(1).width());
      var gutter = parseInt(boards.eq(1).css('marginLeft'));
      return parseInt(boards.length * width) + parseInt((boards.length - 1) * gutter);
    });
  }
})(jQuery)