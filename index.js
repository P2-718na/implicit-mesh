const surfaceNets = require("surface-nets")
const ndarray = require("ndarray")
const fill = require("ndarray-fill")
const scale = require("./scale.js")

const defaultParameters = {
  resolution: 64,
  domain: [[-1, 1], [-1, 1], [-1, 1]],
  dimension: 3
}

module.exports = (f, parameters = defaultParameters) => {
  const { resolution, dimension } = parameters;

  // We need a n-dimensional array to use as lattice
  const data = ndarray(
    new Float32Array(Math.pow(resolution, dimension)),
    new Float32Array(dimension).map(_ => resolution)
  );

  // Generate simplicial complex mesh from function
  const complex = surfaceNets(
    fill(data, (...x) => {
      return f(
        ...(x.map(xi => xi / resolution * 2 - 1)) // Todo why this calculations?
      )
    }
  ))

  return complex;
  // We don't want to scale things, for now.
  //return scale(resolution, complex)
}
