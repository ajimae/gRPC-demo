var client = require('../client')

// get id from stdin
var id = process.argv[2];
client.deletes({ id }, function(error, _) {
    if (error) throw Error(error)
    console.log('Note Has been successfully deleted')
})
