const {
    MONGODB_CLIENT,
    MONGODB_URI,
    MONGODB_CLIENT_OPTIONS,
    MONGODB_DB_NAME,
    OBJECT_ID
  } = require('../../settings/mongodb.settings');
  
  const getChannels = async () => {
    const client = new MONGODB_CLIENT(MONGODB_URI, {
      ...MONGODB_CLIENT_OPTIONS
    });
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    const result = await db.collection('rooms').find({}).toArray(function (err, result) {
      if (err) throw err;
    });
    db.close();
    return result;
  };
  const getChannelById = async (args) => {
    let filter = {
      ...args
    };
    for (const key in filter) {
      if (Object.hasOwnProperty.call(filter, key) && key === '_id') {
        const value = filter[key];
        //parse _id string value to mongodb type
        filter[key] = OBJECT_ID(value);
      };
    };
    const client = new MONGODB_CLIENT(MONGODB_URI, {
      ...MONGODB_CLIENT_OPTIONS
    });
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    const result = await db.collection('rooms').findOne(filter, function (err, result) {
      if (err) throw err;
    });
    client.close();
    return result;
  };
  
  module.exports = {
    getChannels,
    getChannelById
  }
  