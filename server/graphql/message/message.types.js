'use strict';

const MESSAGE_TYPES = `
  type Message {
    _id:String,
    chatRoomId: String!,
    content: String!,
    type:String,
    createdBy:User!,
    createdAt: String,
  }
  type Messages {
      messages: [Message],
      total: Float
  }
`;

module.exports = {
  MESSAGE_TYPES
};
