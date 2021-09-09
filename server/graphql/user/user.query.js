const getUsers = `getUsers:Users`;
const getUserById = `getUserById(_id:String):User`

const USER_QUERY = `
    ${getUsers}
    ${getUserById}
`
module.exports = {
    USER_QUERY
  };
  