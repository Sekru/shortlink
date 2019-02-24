'use strict';

module.exports = (app, logger, {rest}) => {
    logger.info('Load rest methods');
    app.use(rest.routes());
    app.use(rest.allowedMethods());
};