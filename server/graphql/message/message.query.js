const { paginatorFields } = require('../graphql.utils');

const fetchMessages = `fetchMessages(channelId:String!,${paginatorFields}):[Message!]`
const MESSAGE_QUERY = `
    ${fetchMessages}
`
module.exports = {
    MESSAGE_QUERY
  };