const getMessages = `getMessages:Messages`;
const getMessagesByRoomId = `getMessagesByRoomId(roomId:String):Messages`
const MESSAGE_QUERY = `
    ${getMessages}
    ${getMessagesByRoomId}
`
module.exports = {
    MESSAGE_QUERY
  };