var { notes } = require('../database')

exports.update = function(call, callback) {
  let existingNote = notes.find(n => n.id == call.request.id)
  if (existingNote) {
      existingNote.title = call.request.title
      existingNote.content = call.request.content
      callback(null, existingNote)
  } else {
      callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
      })
  }
}
