'use strict';

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    DOMAIN: process.env.DOMAIN,
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT
};
