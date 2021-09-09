'use strict';

const MESSAE_TYPE = `
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
  input MessageInput {
    chatRoomId: Room!,
    content: String!,
    createdBy: User!,
    createdAt: String!,
  }
`;

module.exports = {
    MESSAE_TYPE
};
