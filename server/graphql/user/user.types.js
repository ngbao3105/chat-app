'use strict';

const USER_TYPES = `
  type User {
    _id:String,
    userName: String,
    avatar: String,
  }
  type Users {
      users: [User],
      total: Float
  }
`;

module.exports = {
    USER_TYPES
};
