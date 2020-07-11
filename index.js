const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const config = require('./config');

const PROTO_PATH = __dirname + '/category.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

module.exports = {
    packageDefinition,
    protoDescriptor,
    routeguide,
}
