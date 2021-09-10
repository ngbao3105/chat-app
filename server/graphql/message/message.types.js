'use strict';

const MESSAGE_TYPES = `
  type Message {
    _id:String,
    channelId: String!,
    text: String!,
    user:User!,
    createdAt: String!,
  }
  input MessageInput{
    channelId:String!,
    text:String!,
    user:UserInput
  }
`;

module.exports = {
  MESSAGE_TYPES
};
