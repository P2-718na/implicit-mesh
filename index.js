const surfaceNets = require("surface-nets")
const ndarray = require("ndarray")
const fill = require("ndarray-fill")
const scale = require("./scale.js")

const defaultParameters = {
  resolution: 64,
  domain: [[-1, 1], [-1, 1], [-1, 1]],
  dimension: 3,
}

const parseParameters = ({ resolution, dimension, domain}) => {
  resolution ??= defaultParameters.resolution;
  dimension  ??= defaultParameters.dimension;
  domain     ??= defaultParameters.domain

  if (typeof resolution === "number") {
    resolution = new Float32Array(dimension).map(_ => resolution)
  }

  if (resolution.some(e => e <= 1)) {
    throw "Invalid resolution: must be an integer greater than 1."
  }

  return {
    resolution,
    dimension,
    domain,
  }
}

module.exports = (f, parameters = defaultParameters) => {
  const { resolution } = parseParameters(parameters)

  // We need a n-dimensional array to use as lattice
  const data = ndarray(
    new Float32Array(resolution.reduce((acc, res_i) => acc * res_i, 1)),
    resolution
  );

  // Generate simplicial complex mesh from function
  const complex = surfaceNets(
    fill(data, (...x) => {
      return f(
        ...(x.map((xi, i) => xi / resolution[i] * 2 - 1)) // Todo why this calculations?
      )
    }
  ))

  //return complex; // todo understand scaling logic
  // We don't want to scale things, for now.
  return scale(resolution, complex)
}
