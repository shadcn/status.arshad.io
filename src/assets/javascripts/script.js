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

  // Add tooltip.
  $('[data-toggle="tooltip"]').tooltip();

  // Build progress bar.
  $('.board').each(function() {
    var progressBar = $(this).find('.progress');
    $(this).find('.timer').each(function() {
      var value = $(this).data().value;
      var projectData = $(this).parent('li').find('.project').data();
      var progress = $('<div class="progress-bar" data-placement="top" data-toggle="tooltip" data-title="' + projectData.project + '"></div>');
      progress.html(value + 'h');
      progress.addClass('progress-bar--' + projectData.name);
      progress.width((value/8 * 100) + '%');
      progressBar.append(progress);
    });
    $('[data-toggle="tooltip"]').tooltip();
  });
})(jQuery)