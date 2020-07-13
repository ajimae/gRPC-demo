// var fs = require('fs')
// var grpc = require('grpc')
// var protoLoader = require('@grpc/proto-loader')

// var PROTO_PATH = './proto/notes.proto';
// var packageDefinition = protoLoader.loadSync(PROTO_PATH);
// var notesProto = grpc.loadPackageDefinition(packageDefinition);
// var notesPackage = notesProto.notesPackage;

// var cacert = fs.readFileSync('keys/ca.crt');
// var cert = fs.readFileSync('keys/client.crt');
// var key = fs.readFileSync('keys/client.key');
// var kvpair = {
//     'private_key': key,
//     'cert_chain': cert
// }

// var url = process.env.CLIENT_HOST_PORT || 'localhost:50051';
// var client = new notesPackage.NoteService(url,
//     grpc.credentials.createSsl(cacert, key, cert));

// module.exports = client


var fs = require('fs');
var grpc = require('grpc')
var protoLoader = require('@grpc/proto-loader')

var PORT = process.env.PORT || '50051';

var packageDefinition = protoLoader.loadSync('./proto/notes.proto');
var notesProto = grpc.loadPackageDefinition(packageDefinition);
var notesPackage = notesProto.notesPackage;

var credentials = grpc.credentials.createInsecure();

var host = process.env.CLIENT_HOST || '127.0.0.1';
var client = new notesPackage.NoteService(`${host}:${PORT}`, credentials);

module.exports = client
