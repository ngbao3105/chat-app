'user strict';

const dotenv = require('dotenv');
dotenv.config();

const MongoDbClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let mongodbDbName = 'chat-app';

module.exports = {
    MONGODB_CLIENT: MongoDbClient,
    MONGODB_URI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@demo.sfjra.mongodb.net/`,
    MONGODB_CLIENT_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
    MONGODB_DB_NAME: mongodbDbName,
    OBJECT_ID: ObjectId
};
