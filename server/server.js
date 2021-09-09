const { registerSocketServerEventHandlers } = require('./socket/socket-server.handler');
const { PORT, HOSTNAME, NODE_ENV } = require('./settings/global.settings');
const { graphqlMiddleware } = require('./graphql/graphql.middleware');

const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/graphql', domainChecker, authChecker, graphqlMiddleware());

const socketServer = require('socket.io')(server, { cors: cors() });
shared['socketServer'] = socketServer;
registerSocketServerEventHandlers(socketServer);

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening at http://${HOSTNAME}:${PORT} in ${NODE_ENV} environment`);
});




