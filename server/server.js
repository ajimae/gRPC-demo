// var fs = require('fs');
// var grpc = require('grpc')
// var protoLoader = require('@grpc/proto-loader')

// var packageDefinition = protoLoader.loadSync('./proto/notes.proto');
// var notesProto = grpc.loadPackageDefinition(packageDefinition);
// var notesPackage = notesProto.notesPackage;

// var { listAll } = require('./implementations/get_notes');
// var { get } = require('./implementations/get_note');
// var { insert } = require('./implementations/insert_note');
// var { update } = require('./implementations/update_note');
// var { listStream } = require('./implementations/list_stream');
// var { deletes } = require('./implementations/delete_note');


// var cacert = fs.readFileSync('keys/ca.crt');
// var cert = fs.readFileSync('keys/server.crt');
// var key = fs.readFileSync('keys/server.key');
// var kvpair = {
//     'private_key': key,
//     'cert_chain': cert
// }


// var server = new grpc.Server()

// server.addService(notesPackage.NoteService.service, {
//     listAll,
//     get,
//     insert,
//     update,
//     listStream,
//     deletes
// })

// server.bind('0.0.0.0:50051',
//     grpc.ServerCredentials.createSsl(cacert, [kvpair]));
// console.log('Server running at http://127.0.0.1:50051')
// server.start()


var fs = require('fs');
var grpc = require('grpc')
var protoLoader = require('@grpc/proto-loader')

var packageDefinition = protoLoader.loadSync('proto/notes.proto');
var notesProto = grpc.loadPackageDefinition(packageDefinition);
var notesPackage = notesProto.notesPackage;

var { listAll } = require('./implementations/get_notes');
var { get } = require('./implementations/get_note');
var { insert } = require('./implementations/insert_note');
var { update } = require('./implementations/update_note');
var { listStream } = require('./implementations/list_stream');
var { deletes } = require('./implementations/delete_note');

var PORT = process.env.PORT || '50051';

var credentials = grpc.ServerCredentials.createInsecure();
var server = new grpc.Server()

server.addService(notesPackage.NoteService.service, {
    listAll,
    get,
    insert,
    update,
    listStream,
    deletes
})

// server.bind(`0.0.0.0:${PORT}`, credentials)
server.bind(`[::]:${PORT}`, credentials)
console.log(`server running on port ${PORT}`)
server.start()
