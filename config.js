const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

const config = result.parsed
config.SERVER_HOST = config.SERVER_HOST || 'localhost:50051'

export default {
  ...config,
}
