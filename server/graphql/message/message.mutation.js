const insertMessage = `insertMessage(input: MessageInput):Message`;
const deleteMessage = `deleteMessage(_id:String):Message`;
const MESSAGE_MUTATION = `
    ${insertMessage}
    ${deleteMessage}
`
