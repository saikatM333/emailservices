const ILogger = require('./ILogger');

class Logger extends ILogger {
  log(message) {
    console.log(new Date().toISOString(), message);
  }
}

module.exports = Logger;
