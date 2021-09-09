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
  getMessages,
  getMessagesByRoomId,
  deleteMessage
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
  ROOM_TYPES
} = require('./room/room.types');
const {
  ROOM_QUERY
} = require('./room/room.query');
const {
  getRooms,
  getRoomById
} = require('./room/room.resolver');

const {
  buildSchema
} = require('graphql');

const schema = buildSchema(`
    ${MESSAGE_TYPES}
    ${USER_TYPES}
    ${ROOM_TYPES}
    type Query { 
        ${MESSAGE_QUERY}
        ${USER_QUERY}
        ${ROOM_QUERY}
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
  //#region Room
  getRooms: async () => {
    const result = await getRooms();
    return result;
  },
  getRoomById: async ({
    _id
  }) => {
    const result = await getRoomById({
      _id: _id
    });
    return result;
  },
  //#endregion
  //#region Message
  getMessages: async () => {
    const result = await getMessages();
    return result;
  },
  getMessagesByRoomId: async ({
    roomId
  }) => {
    const result = await getMessagesByRoomId({
      roomId: roomId
    });
    return result;
  },
  deleteMessage: async ({
    _id
  }) => {
    const result = await deleteMessage({
      _id: _id
    });
    return result;
  }
  //#endregion
};

module.exports = {
  root,
  schema
}
