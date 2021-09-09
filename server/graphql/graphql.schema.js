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
  insertMessage,
  deleteMessage
} = require('./message/message.resolver');
const {
  USER_TYPE
} = require('./user/user.types');
const {
  USER_QUERY
} = require('./user/user.query');
const {
  getUsers,
  getUserById
} = require('./user/user.resolver');
const {
  ROOM_TYPE
} = require('./room/room.types');
const {
  ROOM_QUERY
} = require('./room/room.query');
const {
  getRooms,
  getRoomById
} = require('./room/room.resolver');

const schema = buildSchema(`
    ${MESSAGE_TYPES}
    ${USER_TYPE}
    ${ROOM_TYPE}
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
  insertMessage: async (args) => {
    const result = await insertMessage(args);
    return result;
  },
  deleteMessage: async (args) => {
    const result = await deleteMessage(args);
    return result;
  }
  //#endregion
};

module.exports = {
  root,
  schema
}
