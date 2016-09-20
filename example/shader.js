var build = require('../shader')
var mesh = build(50, `
  float surface (vec3 p) {
    return length(p) - 0.9;
  }
`)
console.log(JSON.stringify(mesh))
setTimeout(process.exit, 2000)
