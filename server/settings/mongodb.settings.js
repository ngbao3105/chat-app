'user strict';

const dotenv = require('dotenv');
dotenv.config();

const MongoDbClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const nPerPage = 10;
let mongodbDbName = 'chatroom';

module.exports = {
    MONGODB_CLIENT: MongoDbClient,
    MONGODB_URI: 'mongodb://localhost:27017/',
    MONGODB_CLIENT_OPTIONS: {
        useUnifiedTopology: true
    },
    NUMBER_PER_PAGE:nPerPage,
    MONGODB_DB_NAME: mongodbDbName,
    OBJECT_ID: ObjectId
};
