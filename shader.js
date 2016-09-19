var REGL = require('regl')
var ndarray = require('ndarray')
var surfaceNets = require('surface-nets')
var scale = require('./scale.js')

module.exports = function (size, src) {
  if (typeof size === 'number') size = [size,size,size]
  /*
  var regl = REGL()
  //regl.limits.maxTextureSize
  var draw = regl({
    framebuffer: regl.prop('framebuffer'),
    frag: `
      precision mediump float;
      ${src}
      void main () {
        float ipos = (gl_FragCoord.x+1.0)*0.5 * ${st(size[0]*size[1]*size[2])};
        vec3 pos = vec3(
          mod(ipos,${st(size[0])})*${st(2/size[0])}-1.0,
          mod(ipos*${st(1/size[1])},${st(size[1])})*${st(2/size[1])}-1.0,
          ipos*${st(1/size[1]/size[2])}*${st(2/size[2])}-1.0
        );
        gl_FragColor = vec4(surface(pos),0,0,1);
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
    count: 3
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
    var ndata = new Float32Array(size[0]*size[1]*size[2])
    for (var i = 0, j = 0; i < data.length; i += 4) {
      ndata[j++] = data[i]
    }
    mesh = surfaceNets(ndarray(ndata,size))
  })
  */
  var data = new Float32Array(size[0]*size[1]*size[2])
  for (var i = 0; i < data.length; i++) {
    var x = (i%size[0])*2/size[0]-1
    var y = (i/size[0]%size[1])*2/size[1]-1
    var z = (i/size[0]/size[1]%size[2])*2/size[2]-1
    data[i] = x*x + y*y + z*z - 0.5
  }
  var mesh = scale(size, surfaceNets(ndarray(data,size)))
  return mesh
}

function st (n) {
  return String(n).replace(/^(\d+)$/, '$1.0')
}
