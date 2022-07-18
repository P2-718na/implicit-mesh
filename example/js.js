var build = require('../')
var mesh = build(function (x,y,z) {
  return x*x + y*y + z*z - 0.2
})
console.log(JSON.stringify(mesh))
