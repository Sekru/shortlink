'use strict'

const Router = require('koa-router');
const storage = require('./storage');
const isVaildUrl = require('is-url');

module.exports = () => {
    const router = new Router();

    router.get('/:hash', ctx => {
        const {hash} = ctx.params;
        const fullUrl = storage.get(hash);
        if (fullUrl) {
            ctx.response.redirect(fullUrl);
        } else {
            ctx.response.redirect('/');
        }
    });

    router.post('/shorten', ctx => {
        const {targetUrl} = ctx.request.body;
        if (isVaildUrl(targetUrl)) {
            const hash = storage.set(targetUrl);
            ctx.response.body = {hashUrl: `${ctx.request.host}/${hash}`};
        } else {
            ctx.response.status = 400;
        }
    });

    return router;
}