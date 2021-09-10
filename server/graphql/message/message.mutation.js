const postMessage = `postMessage(channelId:String!,text:String!,user:UserInput!):Message`;
const MESSAGE_MUTATION = `
    ${postMessage}
`
module.exports = {
    MESSAGE_MUTATION
}
