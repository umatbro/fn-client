const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const path = require('path')

const PROTO_PATH = path.join(path.resolve(), '/category.proto')
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    enums: String,
    oneofs: true,
  })
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const categoryProto = protoDescriptor.category
export {
  PROTO_PATH,
  packageDefinition,
  protoDescriptor,
  categoryProto,
}
