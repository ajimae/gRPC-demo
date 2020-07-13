var uuidv1 = require('uuid/v1')
var { notes } = require('../database')

exports.insert = function(call, callback) {
  let note = call.request
  note.id = uuidv1()
  notes.push(note)
  callback(null, note)
}
