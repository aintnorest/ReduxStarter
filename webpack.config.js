require('babel/register');

const config   = require('./build/config');
module.exports = require('./build/webpack/' + config.get('env'));