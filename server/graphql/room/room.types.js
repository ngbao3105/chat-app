'use strict';

const ROOM_TYPES = `
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
    ROOM_TYPES
};
