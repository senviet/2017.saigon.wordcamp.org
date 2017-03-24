var express = require('express')
var path = require('path')
var fs = require('fs')
var chokidar = require('chokidar')
var build = require('./build.js')

// First build
build();

// Watch
chokidar.watch('src/**/*.scss', {
  ignored: /(^|[\/\\])\../,
  persistent: true
}).on('change', (event, path) => {
  console.log(event, path);
  build();
});

// Server
var app = express();
var port = 8585;
app.use('/', express.static('./dist'));
var uri = 'http://localhost:' + port;
console.log('> Listening at ' + uri + '\n');
app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return;
  }
})
