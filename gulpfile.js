// Load node modules.
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var frontMatter = require('front-matter');

// Load Gulp plugins.
var gulp = require('gulp');
var data = require('gulp-data');
var webserver = require('gulp-webserver');
var swig = require('gulp-swig');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pages = require('gulp-gh-pages');

// Load config.
var crepido = require('./config');

// Custom renderer for Marked.
var markedRenderer = new marked.Renderer();

// Heading callback for renderer.
markedRenderer.heading = function(text, level) {
  var prefix = '<h' + level + '>';
  // Wrap in a div if h1
  if (level == 1) {
    var cssClasses = ['board__card'];

    // Add collapsible helpers.
    if (text.match("\\[(\\-)\\]", "gi")) {
      cssClasses.push('board__card--collapsible');
      text = text.replace(/\[\-\]\s?/gi, "");
    }

    // Add a custom board name.
    var name = text.toLowerCase().replace(/[^\w]+/g, '-');
    cssClasses.push('board__card--' + name);

    prefix = '<div class="' + cssClasses.join(" ") + '">' + prefix;
  }

  return prefix + text + '</h' + level + '>';
}

// List callback for renderer.
markedRenderer.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';

  // Add Checkboxes
  body = addCheckboxes(body);

  // Create timers
  body = addTimers(body);

  // Create labels.
  body = labelize(body);

  // Add a suffix. See markedRenderer.heading.
  var suffix = '</div>';

  return '<' + type + '>\n' + body + '</' + type + '>' + suffix + '\n';
}

// Gulp 'build' task
gulp.task('build', function() {
  gulp.src('./src/templates/index.html')
    .pipe(data(function() {
      return buildBoards();
    }))
    .pipe(swig())
    .pipe(gulp.dest('public'));
});

// Gulp 'sass' task
gulp.task('sass', function() {
  return gulp.src('src/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

// Gulp 'js' task
gulp.task('js', function(){
  return gulp.src('src/assets/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('public/assets/javascripts'));
});

// Gulp 'assets' task
gulp.task('assets', ['sass', 'js']);

// Gulp 'static' task
gulp.task('static', function () {
  return gulp.src(['src/*.*'], { dot: true })
    .pipe(gulp.dest('public'));
});

// Gulp 'webserver' task: setups the webserver and enable livereload.
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8000
    }));
});

// Gulp 'watch' task
gulp.task('watch', function () {
  gulp.watch(['src/assets/**/*'], ['assets']);
  gulp.watch(['boards/**/*'], ['build']);
  gulp.watch(['src/templates/*'], ['build']);
});

// Gulp 'deploy' task
gulp.task('deploy', ['build', 'assets', 'static'], function() {
  return gulp.src('./public/**/*', { dot: true })
    .pipe(pages({
      remoteUrl: crepido.remoteUrl,
      origin: crepido.origin,
      branch: crepido.branch
    }));
});

// Gulp 'default' task.
gulp.task('default', ['assets', 'static', 'build', 'webserver', 'watch']);

// Builds boards from ./boards/*.md
function buildBoards() {
  crepido.boards = [];

  // Get board files.
  var files = fs.readdirSync('./boards', function(error, files) {
    if (error) { console.log(error); }
  });

  // Filter .md files.
  files.filter(function(file) { return file.substr(-3) === '.md'; })

  files.map(function(file) {
    var content = fs.readFileSync(path.resolve(__dirname, 'boards', file), 'utf8');
    var data = frontMatter(content);
    data.body = marked(data.body, {
      renderer: markedRenderer
    });

    // Create a machine_name.
    data.attributes.machine_name = data.attributes.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    // Set a default picture.
    data.attributes.picture = data.attributes.picture || crepido.picture;
    crepido.boards.push(data);
  });

  return crepido;
}

// Convert [ ] and [x] to checkboxes.
function addCheckboxes(string) {
  return string.replace(new RegExp("\\[([\\s|x])\\]", "gi"), function($0, $1) {
    var value = ($1 == 'x') ? 1 : 0;
    return '<input class="status hidden" type="checkbox" value="' + value + '"/>';
  });
}

// Converts [1/8] to timers.
function addTimers(string) {
  return string.replace(new RegExp("\\[([0-9](.[0-9])?)h\\]", "gi"), function($0, $1) {
    return '<span class="timer" data-value="' + $1 + '"><i class="fa fa-clock-o"></i>' + $1 + 'h</span>';
  });
}

// Converts [string] to <span class="label">string</span>.
function labelize(string) {
  return string.replace(new RegExp("\\[([^\\]]*)\\]", "gi"), function($0, $1) {
    var name = $1.toLowerCase().replace(/[^\w]+/g, '-');
    return '<span class="project label label--' + name + '" data-name="' + name + '" data-project="' + $1 + '"><i class="fa fa-folder-o"></i>' + $1 + '</span>';
  });
}