'use strict';

const bodyParser = require('koa-bodyparser');

module.exports = (app, logger, {bodyParserOptions = {}}) => {
    logger.info('Load body parser middleware');
    app.use(bodyParser(bodyParserOptions));
};