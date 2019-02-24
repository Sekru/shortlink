'use strict'

const appFactory = require('./src/start');
const restFactory = require('./src/restFactory');

const rest = restFactory();
appFactory({rest});