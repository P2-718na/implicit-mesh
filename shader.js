var REGL = require('regl')
var ndarray = require('ndarray')
var surfaceNets = require('surface-nets')
var scale = require('./scale.js')

module.exports = function (size, src) {
  if (typeof size === 'number') size = [size,size,size]
  var len = size[0] * size[1] * size[2]
  var sx = st(size[0]), sy = st(size[1]), sz = st(size[2])
  var canvas = document.createElement('canvas')
  var regl = REGL(canvas)
  //regl.limits.maxTextureSize
  var draw = regl({
    framebuffer: regl.prop('framebuffer'),
    frag: `
      precision mediump float;
      ${src}
      void main () {
        float i = gl_FragCoord.x;
        float x = mod(i,${sx}) / (${sx}-1.0)*2.0-1.0;
        float y = mod(i/${sx},${sy}) / (${sy}-1.0)*2.0-1.0;
        float z = mod(i/${sx}/${sy},${sz}) / (${sz}-1.0)*2.0-1.0;
        float v = surface(vec3(x,y,z));
        gl_FragColor = vec4(clamp(v+0.5,0.0,1.0),0,0,1);
      }
    `,
    vert: `
      attribute vec2 position;
      void main () {
        gl_Position = vec4(position,0,1);
      }
    `,
    attributes: {
      position: [-4,4,4,4,0,-4]
    },
    count: 3,
    depth: {
      enable: false
    }
  })
  regl.clear({ color: [0,0,0,1], depth: true })
  var fb = regl.framebuffer({
    width: size[0]*size[1]*size[2],
    height: 1,
    colorFormat: 'rgba',
    colorType: 'uint8'
  })
  var mesh
  draw({ framebuffer: fb }, function () {
    regl.draw()
    var data = regl.read()
    var ndata = new Float32Array(len)
    for (var i = 0, j = 0; i < data.length; i += 4) {
      ndata[j++] = (data[i] - 127.5) / 127.5
    }
    mesh = scale(size, surfaceNets(ndarray(ndata,size)))
  })
  return mesh
}

function st (n) {
  return String(n).replace(/^(\d+)$/, '$1.0')
}
