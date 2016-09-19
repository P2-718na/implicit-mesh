var surfaceNets = require('surface-nets')
var ndarray = require('ndarray')
var fill = require('ndarray-fill')
var scale = require('./scale.js')

module.exports = function (opts, f) {
  if (typeof opts === 'number') {
    opts = { size: [opts,opts,opts] }
  } else if (Array.isArray(opts)) {
    opts = { size: opts }
  }
  var size = opts.size
  var sx = size[0], sy = size[1], sz = size[2]
  var data = ndarray(new Float64Array(sx*sy*sz),[sx,sy,sz])
  return scale(size, surfaceNets(fill(data, function (i,j,k) {
    return f(i/sx*2-1, j/sy*2-1, k/sz*2-1)
  })))
}
