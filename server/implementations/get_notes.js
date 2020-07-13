var { notes } = require('../database')

exports.listAll = function(_, callback) {
  callback(null, { notes })
}