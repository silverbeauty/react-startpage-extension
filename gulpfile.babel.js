import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import startupWebpackConfig from './startup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';
import watchWebpackConfig from './watch/webpack.config';

gulp.task('startup-js', ['clean'], (cb) => {
  webpack(startupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content-js', ['clean'], (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('watch-js', ['clean'], (cb) => {
  webpack(watchWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('diff-dom-js', ['clean'], () => {
  return gulp.src('watch/src/scripts/diff-dom.js')
    .pipe(plugins.rename('diff-dom.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('html2canvas-js', ['clean'], () => {
  return gulp.src('watch/src/scripts/html2canvas.js')
    .pipe(plugins.rename('html2canvas.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('env-js', ['clean'], () => {
  return gulp.src('config/environment.js')
    .pipe(plugins.rename('environment.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('startup-html', ['clean'], () => {
  return gulp.src('startup/src/index.html')
    .pipe(plugins.rename('startup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch-html', ['clean'], () => {
  return gulp.src('watch/src/index.html')
    .pipe(plugins.rename('watch.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('style.css', ['clean'], () => {
  return gulp.src('content/src/style.css')
    .pipe(plugins.rename('style.css'))
    .pipe(gulp.dest('./build'))
});

gulp.task('pop.ico', ['clean'], () => {
  return gulp.src('pop.ico')
    .pipe(plugins.rename('pop.ico'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'event-js', 'content-js', 'startup-js', 'startup-html', 'watch-js', 'diff-dom-js', 'html2canvas-js', 'watch-html', 'style.css', 'pop.ico']);

gulp.task('watch', ['default'], () => {
  gulp.watch('startup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
  gulp.watch('watch/**/*', ['build']);
});

gulp.task('default', ['build']);
