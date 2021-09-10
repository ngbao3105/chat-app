const getChannels = `getChannels:[Channel!]`;
const getChannelById = `getChannelById(_id:String):Channel`

const CHANNEL_QUERY = `
    ${getChannels}
    ${getChannelById}
`
module.exports = {
    CHANNEL_QUERY
  };
  
