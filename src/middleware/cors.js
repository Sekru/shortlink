'use strict';

const cors = require('@koa/cors');

module.exports = (app, logger) => {
    logger.info('Load cors middleware');
    app.use(cors());
};