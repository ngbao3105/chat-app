const {
  MONGODB_CLIENT,
  MONGODB_URI,
  MONGODB_CLIENT_OPTIONS,
  MONGODB_DB_NAME,
  NUMBER_PER_PAGE,
  OBJECT_ID
} = require('../../settings/mongodb.settings');
const moment = require('moment');
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
  user
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
      user: user,
      createdAt: moment().utc().format(),
      _id: _id
    };
    const result = await db.collection('messages').insertOne(body);
    return result.ops[0];
  } catch (error) {
    return error;
  };
};

module.exports = {
  fetchMessages,
  postMessage
}
