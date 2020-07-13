var { notes } = require('../database');

exports.get = function(call, callback) {
  let note = notes.find(n => n.id == call.request.id)
  if (note) {
      callback(null, note)
  } else {
      callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
      })
  }
}
