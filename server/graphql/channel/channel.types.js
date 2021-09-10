'use strict';

const CHANNEL_TYPES = `
  type Channel {
    _id:String,
    channelId:String!,
    channelName:String!
  }
  type Channels {
      channels: [Channel],
      total: Float
  }
`;

module.exports = {
  CHANNEL_TYPES
};
