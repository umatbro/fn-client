const result = require('dotenv').config();

if (result.error) {
    throw result.error
}

config = result.parsed;


module.exports = {
    ...config,
}
