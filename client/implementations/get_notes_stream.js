var client = require('../client')

var call = client.listStream();

call.on('data', function(data) {
  console.log('received', JSON.stringify(data));
});

call.on('error', function(error) {
  console.log('an error occured while streaming', JSON.stringify(error));
});

call.on('end', function(end) {
  console.log('server done sending streams');
});
