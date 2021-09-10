const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  NUMBER_PER_PAGE,
  OBJECT_ID
} = require('../../settings/mongodb.settings');
// const fetchMoreMessages = async (args) => {
//   let filter = {
//     channelId: args.channelId
//   };
//   const client = new MONGODB_CLIENT(MONGODB_URI, {
//     ...MONGODB_CLIENT_OPTIONS
//   });
//   await client.connect();
//   const db = client.db(MONGODB_DB_NAME);
//   const result = await db.collection('messages').find(filter).sort({
//     _id: -1
//   }).skip(args.paginatorSkip).limit(args.paginatorLimit).toArray();
//   client.close();
//   return result;
// }
const fetchMessages = async (args) => {
  let filter = {
    channelId: args.channelId
  };
  const client = new MONGODB_CLIENT(MONGODB_URI, {
    ...MONGODB_CLIENT_OPTIONS
  });
  await client.connect();
  const db = client.db(MONGODB_DB_NAME);
  const result = await db.collection('messages').find(filter).sort({
    _id: -1
  }).skip(args.paginatorSkip).limit(args.paginatorLimit).toArray();
  client.close();
  return result;
};

const postMessage = async ({
  channelId,
  text,
  userId
}) => {
  try {
    const client = new MONGODB_CLIENT(MONGODB_URI, {
      ...MONGODB_CLIENT_OPTIONS
    });
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    const _id = (new Date()).getTime();
    let body = {
      channelId: channelId,
      text: text,
      userId: userId,
      _id: _id
    };
    await db.collection('messages').insertOne(body, (err, res) => {
      if (err) throw err;
      client.close();
    });
    const result = await db.collection('messages').find({
      _id: _id
    }).toArray();
    client.close();
    return result[0]
  } catch (error) {
    return 400;
  };
};

module.exports = {
  fetchMessages,
  postMessage
}
