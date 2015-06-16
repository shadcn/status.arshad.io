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
      return parseInt(boards.length * width) + parseInt((boards.length - 1) * gutter) + 40;
    });
  }

  // Task status.
  $('.status').each(function() {
    if ($(this).val() == 1) {
      $(this).parent('li').addClass('done');
    }
  });

  // Add tooltip.
  $('[data-toggle="tooltip"]').tooltip();

  // Build progress bar.
  $('.board').each(function() {
    // Build projects array.
    var projects = [];
    var total = 0;
    $(this).find('.timer').each(function() {
      var value = $(this).data().value;
      total += value;
      var project = $(this).parent('li').find('.project').data();
      if (typeof(projects[project.name]) !== 'undefined') {
        projects[project.name].value += value;
      }
      else {
        projects[project.name] = {
          project: project,
          value: value
        };
      }
    });

    // Build progress bar.
    var progressBar = $(this).find('.progress');
    for (var projectName in projects) {
      var project = projects[projectName];
      var progress = $('<div class="progress-bar" data-placement="top" data-toggle="tooltip" data-title="' + project.project.name + '"></div>');
      progress.html(project.value + 'h');
      progress.addClass('progress-bar--' + project.project.name);
      progress.width((project.value/total * 100) + '%');
      progressBar.append(progress);
    }

    $('[data-toggle="tooltip"]').tooltip();
  });

  // Collapsible boards
  $('.board__card--collapsible h1').click(function(e) {
    e.preventDefault();
    $(this).parent('.board__card--collapsible').toggleClass('open');
  });
})(jQuery)
