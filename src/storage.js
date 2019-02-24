'use strict'

const generator = require('short-unique-id');
const uid = new generator();
const map = {};

module.exports = {
    get: shortUrl => map[shortUrl],
    set: url => {
        let hash;

        do {
            hash = uid.randomUUID(6);
        } while (map[hash]);

        map[hash] = url;

        return hash;
    }
};