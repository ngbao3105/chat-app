const { graphqlHTTP } = require('express-graphql');
const { NODE_ENV } = require('../settings/global.settings');
const { root, schema } = require('./graphql.schema');

const graphqlMiddleware = () => {
    const middleware = graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: NODE_ENV === 'prod' ? false : true,
    });
    return middleware;
}

module.exports = {
    graphqlMiddleware
}
