'user strict';

const dotenv = require('dotenv');
dotenv.config();

const MongoDbClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let mongodbDbName = 'chatroom';

module.exports = {
    MONGODB_CLIENT: MongoDbClient,
    MONGODB_URI: 'mongodb://localhost:27017/',
    MONGODB_CLIENT_OPTIONS: {
        useUnifiedTopology: true
    },
    MONGODB_DB_NAME: mongodbDbName,
    OBJECT_ID: ObjectId
};
