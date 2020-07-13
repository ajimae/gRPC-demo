var grpc = require('grpc')
var { notes } = require('../database')

exports.deletes = function(call, callback) {
  let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id)
  if (existingNoteIndex != -1) {
      notes.splice(existingNoteIndex, 1)
      callback(null, {})
  } else {
      callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
      })
  }
}
