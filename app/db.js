const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://admin:admin@ds225608.mlab.com:25608/cashregisterdb', {
    useMongoClient: true
});

module.exports = connection;
