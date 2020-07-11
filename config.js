const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

const config = result.parsed
config.SERVER_HOST = config.SERVER_HOST || 'localhost:50051'
config.WORKSHEET_ADDRESS = config.WORKSHEET_ADDRESS || 'https://docs.google.com/spreadsheets/d/1WmvvOeMsRkUKHBZTXzzY_DLcUEqgBozcRvOaT8Zk5H0/edit#gid=1030380616'

export default {
  ...config,
}
