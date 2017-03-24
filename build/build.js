var sass = require('node-sass')
var autoprefixer = require('autoprefixer')
var fs = require('fs')
var postcss      = require('postcss')

var outFile = 'dist/main.css'
var srcFile = 'src/main.scss'
module.exports = () => {
  return new Promise((resolve, reject) => {
    sass.render({
      file: srcFile,
      outFile: outFile,
      outputStyle: 'compressed',
      sourceMap: true
    }, function (error, result) { // node-style callback from v3.0.0 onwards
      if (!error) {
        postcss([autoprefixer]).process(result.css).then((result) => {
          result.warnings().forEach(warn => {
            console.warn(warn.toString())
          });
          fs.writeFile(outFile, result.css, (err) => {
            if (err) {
              console.log(error)
              reject(error)
            } else {
              console.log('Built!')
              resolve()
            }
          })
        })
      } else {
        console.log(error)
      }
    })
  })
}
