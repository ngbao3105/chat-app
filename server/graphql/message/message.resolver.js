const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  OBJECT_ID
} = require('../../settings/mongodb.settings');
let paginator = {
  skip: 0,
  limit: 0
};
const getMessages = async () => {
  const client = new MONGODB_CLIENT(MONGODB_URI, {
    ...MONGODB_CLIENT_OPTIONS
  });
  await client.connect();
  const db = client.db(MONGODB_DB_NAME);
  const result = await db.collection('messages').find({}).toArray(function (err, result) {
    if (err) throw err;
  });
  db.close();
  return result;
};
const getMessagesByRoomId = async (args) => {
  let filter = {
    ...args
  };
  for (const key in filter) {
    if (Object.hasOwnProperty.call(filter, key) && key === 'roomId') {
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
  const result = await db.collection('messages').findOne(filter, function (err, result) {
    if (err) throw err;
  });
  client.close();
  return result;
};
// const insertMessage = async (args) => {
//   try {
//     const client = new MONGODB_CLIENT(MONGODB_URI, {
//       ...MONGODB_CLIENT_OPTIONS
//     });
//     await client.connect();
//     const db = client.db(MONGODB_DB_NAME);
//     const result = await db.collection('messages').insertOne(args.input);
//     client.close();
//     return result;
//   } catch (error) {
//     return 400;
//   };
// };
const deleteMessage = async (args) => {
  try {
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
    const result = await db.collection('messages').deleteOne(filter);
    client.close();
    return result;
  } catch (error) {
    return 400;
  };
};

module.exports = {
  getMessages,
  getMessagesByRoomId,
  deleteMessage
}
