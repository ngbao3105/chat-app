'use strict';

const CHANNEL_TYPES = `
  type Channel {
    _id:String,
    userIds: [String],
  }
  type Channels {
      channels: [Channel],
      total: Float
  }
`;

module.exports = {
  CHANNEL_TYPES
};
