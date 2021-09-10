'use strict';

const MESSAGE_TYPES = `
  type Message {
    _id:String,
    channelId: String!,
    text: String!,
    userId:String!,
    createdAt: String,
  }
`;

module.exports = {
  MESSAGE_TYPES
};
