'use strict';
const {
  MESSAGE_TYPES
} = require('./message/message.types');
const {
  MESSAGE_QUERY
} = require('./message/message.query');
const {
  MESSAGE_MUTATION
} = require('./message/message.mutation');
const {
  fetchMessages,
  postMessage
} = require('./message/message.resolver');
const {
  USER_TYPES
} = require('./user/user.types');
const {
  USER_QUERY
} = require('./user/user.query');
const {
  getUsers,
  getUserById
} = require('./user/user.resolver');
const {
  CHANNEL_TYPES
} = require('./channel/channel.types');
const {
  CHANNEL_QUERY
} = require('./channel/channel.query');
const {
  getChannels,
  getChannelById
} = require('./channel/channel.resolver');

const {
  buildSchema
} = require('graphql');

const schema = buildSchema(`
    ${MESSAGE_TYPES}
    ${USER_TYPES}
    ${CHANNEL_TYPES}
    type Query { 
        ${MESSAGE_QUERY}
        ${USER_QUERY}
        ${CHANNEL_QUERY}
    }
    type Mutation {
      ${MESSAGE_MUTATION}
    }
`);

const root = {
  //#region User
  getUsers: async () => {
    const result = await getUsers();
    return result;
  },
  getUserById: async ({
    _id
  }) => {
    const result = await getUserById({
      _id: _id
    });
    return result;
  },
  //#endregion
  //#region channel
  getChannels: async () => {
    const result = await getChannels();
    return result;
  },
  getChannelById: async ({
    _id
  }) => {
    const result = await getChannelById({
      _id: _id
    });
    return result;
  },
  //#endregion
  //#region Message
  fetchMessages: async (channelId) => {
    const result = await fetchMessages(channelId);
    return result;
  },
  postMessage: async (args) => {
    const result = await postMessage(args);
    return result;
  }
  //#endregion
};

module.exports = {
  root,
  schema
}
