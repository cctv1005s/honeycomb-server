'use strict';

const Master = require('./lib/master');
const config = require('./config');
const log = require('./common/log');
const master = new Master(config);

process.chdir(__dirname);
process.execPath = './node_modules/.bin/node';

log.info('====================');
log.info('starting server');
log.info('====================');

master.on('ready', () => {
  master.run(function (err) {
    if (err) {
      log.error('server start failed, err: ', err);
    } else {
      log.info('server start success', `http://${config.host || '127.0.0.1'}:${config.proxy.port}`);
      // do not remove this console.log, for start.sh checking
      console.log('SERVER_START_SUCCESSFULLY'); // eslint-disable-line
    }
  });
});

master.on('error', function (err) {
  log.error('MASTER_ERROR', err);
});
