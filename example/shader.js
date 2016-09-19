var mat4 = require('gl-mat4')
var normals = require('angle-normals')
var regl = require('regl')()
var camera = require('regl-camera')(regl, {
  center: [0,0,0],
  distance: 5
})
var build = require('../shader')

var draw = { sphere: sphere(regl) }
regl.frame(() => {
  regl.clear({ color: [0,0,0,1], depth: true })
  camera(() => {
    draw.sphere()
  })
})

function sphere (regl) {
  var model = []
  var mesh = build(25, `
    float surface (vec3 p) {
      return length(p) - 0.5;
    }
  `)
  console.log(mesh)
  return regl({
    frag: `
      precision mediump float;
      varying vec3 vnorm, vpos;
      void main () {
        /*
        float l = max(dot(vec3(0.2,1,-0.3),vnorm)*0.8,
          dot(vec3(-0.3,-1,-0.2),vnorm)*0.05);
        gl_FragColor = vec4(l,l,l,1);
        */
        gl_FragColor = vec4(0,1,1,1);
      }
    `,
    vert: `
      precision mediump float;
      uniform mat4 projection, view, model;
      attribute vec3 position, normal;
      varying vec3 vnorm, vpos;
      void main () {
        vnorm = normal;
        vpos = position;
        gl_Position = projection * view * model * vec4(position,1);
      }
    `,
    attributes: {
      position: mesh.positions,
      normal: normals(mesh.cells, mesh.positions)
    },
    uniforms: {
      model: () => {
        mat4.identity(model)
        return model
      }
    },
    elements: mesh.cells
  })
}
