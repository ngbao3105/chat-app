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
    const result = await db.collection('channels').find({}).toArray();
    client.close();
    return result;
  };
  
  module.exports = {
    getChannels
  }
  