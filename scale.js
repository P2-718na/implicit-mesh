module.exports = function (size, mesh) {
  var sx = 2/size[0], sy = 2/size[1], sz = 2/size[2]
  var p = mesh.positions
  for (var i = 0; i < p.length; i++) {
    p[i][0] = p[i][0] * sx - 1
    p[i][1] = p[i][1] * sy - 1
    p[i][2] = p[i][2] * sz - 1
  }
  return mesh
}
