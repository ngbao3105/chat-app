'use strict';

const ROOM_TYPE = `
  type Room {
    _id:String,
    userIds: [String],
    type: String,
    createdAt: String
  }
  type Rooms {
      rooms: [Rooms],
      total: Float
  }
`;

module.exports = {
    ROOM_TYPE
};
