var client = require('../client')

var id = process.argv[2];
client.get({ id }, function(error, note) {
    if (error) throw Error(error);
    console.log('Note feched successfully', note);
})
