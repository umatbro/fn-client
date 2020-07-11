const config = require('./config');
const https = require('https');
const fs = require('fs');

PROTOBUF_FILE_LOCATION = "https://raw.githubusercontent.com/umatbro/fn-proto/master/category.proto"
PROTOBUF_FILE_NAME = "category.proto"

const headers = {'Authorization': `token ${config.GITHUB_ACCESS_TOKEN}`}

https.get(PROTOBUF_FILE_LOCATION, { headers }, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
        fs.writeFile(PROTOBUF_FILE_NAME, data, function (err, file) {
            if (err) throw err;
            console.log('Proto file was downloaded and saved');
          }); 
    });
});
