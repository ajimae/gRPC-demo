var { notes } = require('../database')

exports.listStream = function(call, _) {
  notes.forEach(function (note) {
      call.write(note);
  });

  call.end();
}
