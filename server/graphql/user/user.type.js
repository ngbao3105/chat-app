'use strict';

const USER_TYPE = `
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
    USER_TYPE
};
