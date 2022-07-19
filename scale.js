module.exports = function (resolution, mesh) {
  const scaling = resolution.map(res_i => 2 / res_i)
  const { positions } = mesh
  mesh.positions = positions
    .map((x) => [...(x.map((pi, i) => pi * scaling[i] - 1))])

  return mesh
}
