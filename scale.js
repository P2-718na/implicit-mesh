module.exports = function (resolution, mesh) {
  const scaling = 2 / resolution
  const { positions } = mesh
  mesh.positions = positions
    .map((x) => [...(x.map(pi => pi * scaling - 1))])

  return mesh
}
