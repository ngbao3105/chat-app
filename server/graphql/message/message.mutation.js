const postMessage = `postMessage(channelId:String!,text:String!,userId:String!):Message`;
const MESSAGE_MUTATION = `
    ${postMessage}
`
module.exports = {
    MESSAGE_MUTATION
}
