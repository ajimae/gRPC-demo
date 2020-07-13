var client = require('../client')

client.listAll({}, function(error, notes) {
    if(error) throw Error(error);
    console.log('Notes feched successfully', notes);
})
