let winston = require('winston');

let tsFormat = () => (new Date()).toLocaleTimeString();
let logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
        })
    ]
});

logger.level = 'debug';

module.exports = logger;