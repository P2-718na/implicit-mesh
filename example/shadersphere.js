var build = require('../shader')
var mesh = build(25, `
  float surface (vec3 p) {
    return length(p) - 0.5;
  }
`)
console.log(mesh)
