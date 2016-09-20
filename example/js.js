var build = require('../')
var mesh = build(128, function (x,y,z) {
  return x*x + y*y + z*z - 0.2
})
console.log(JSON.stringify(mesh))
