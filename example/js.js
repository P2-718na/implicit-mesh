var build = require('../')
var mesh = build(function (x,y,z) {
  return x*x + y*y + z*z - 1
})
console.log(JSON.stringify(mesh))
