var build = require('../')
var test = require('tape')

test('sphere mesh', function (t) {
  var minx = Infinity, maxx = -Infinity
  var miny = Infinity, maxy = -Infinity
  var minz = Infinity, maxz = -Infinity
  var mesh = build(function (x,y,z) {
    minx = Math.min(x,minx)
    miny = Math.min(y,miny)
    minz = Math.min(z,minz)
    maxx = Math.max(x,maxx)
    maxy = Math.max(y,maxy)
    maxz = Math.max(z,maxz)
    return x*x + y*y + z*z - 0.2
  }, {resolution: 64, dimension: 3})
  t.ok(minx >= -1 && minx < 0, 'min x')
  t.ok(miny >= -1 && miny < 0, 'min y')
  t.ok(minz >= -1 && minz < 0, 'min z')
  t.ok(maxx <= 1 && maxx > 0, 'max x')
  t.ok(maxy <= 1 && maxy > 0, 'max y')
  t.ok(maxz <= 1 && maxz > 0, 'max z')
  t.ok(mesh.positions.length > 100, 'more than 100 vertices')
  t.ok(mesh.cells.length > 100, 'more than 100 faces')
  //t.ok(mesh.positions.every(function (pt) { //todo uncomment this test
  //  return pt[0] >= -1 && pt[0] <= 1
  //    && pt[1] >= -1 && pt[1] <= 1
  //    && pt[2] >= -1 && pt[2] <= 1
  //}), 'every point in the domain [-1,1] in each dimension')
  t.end()
})
