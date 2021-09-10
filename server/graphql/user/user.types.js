'use strict';

const USER_TYPES = `
  type User {
    _id:String,
    userName: String,
    avatar: String,
  }
  type Users {
      users: [User]!,
      total: Float
  }
  input UserInput{
    _id:String!,
    userName: String!,
    avatar: String!,
  }
`;

module.exports = {
    USER_TYPES
};
