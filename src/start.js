'use strict'

const Koa = require('koa');
const fs = require('fs');
const logger = require('log4js').getLogger();
const gracefulShutdown = require('http-graceful-shutdown');
const normalizedPath = require('path').join(__dirname, './middleware');

module.exports = function appFactory (appConfig) {
    const {port = 3000, logLevel, proxy, env} = appConfig;
    const app = new Koa();

    app.proxy = proxy || false;
    app.env = env || 'development';
    logger.level = logLevel || 'info';

    try {
        fs.readdirSync(normalizedPath).map(file => require(`./middleware/${file}`)(app, logger, appConfig));
    } catch (err) {
        throw Error('Cannot run application');
    }

    const connection = app.listen(port);
    logger.info(`App listen on port ${port}`);

    gracefulShutdown(connection,
        {
            signals: 'SIGINT SIGTERM',
            timeout: 5000,
            finally: () => {
                logger.info('Server gracefulls shutted down.....')
            }
        }
    );

    return {app, connection};
};