const { Console } = require('console');
const { FILE } = require('dns');
const{
    createLogger,
    transports,
    format
} = require('winston');

const logger=createLogger({
    transports: [
        new transports.File({
            filename : './logs/logs.txt',
            level: 'info',
            format: format.combine(format.timestamp({format: 'YYYY-DD-MM HH:mm:ss'}),format.simple())
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp({format: 'YYYY-DD-MM HH:mm:ss'}),format.simple())
        })
    ]
})

module.exports = logger;