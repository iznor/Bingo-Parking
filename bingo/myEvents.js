const logger = require("./logger");
const Emitter = require('events');
const emitter = new Emitter.EventEmitter();

const InvalidPath = () => {
    logger.log('error', "invalid path");
}

const alreadyExists = () => {
    logger.log('error', "can't add item already exist");
}

const memberNotFound = () => {
    logger.log('error', "id not found in members.json");
}

const memberDidNotChoose = () => {
    logger.log('error', "member is not in the choices list");
}

const dateNotFound = () => {
    logger.log('error', "id not found in dates.json");
}

const emptyList = () => {
    logger.log('error', "list is empty");
}

const emptyResponse = () => {
    logger.log('info', "(Empty response)");
}

module.exports = emitter.on('errLogEvent', (param) => {
    switch (param) {
        case 'InvalidPath':
            InvalidPath();
            return;
        case 'alreadyExists':
            alreadyExists();
            return;
        case 'memberNotFound':
            memberNotFound();
            return;
        case 'memberDidNotChoose':
            memberDidNotChoose();
            return;
        case 'dateNotFound':
            dateNotFound();
            return;
        case 'emptyList':
            emptyList();
            return;
        case 'emptyResponse':
            emptyResponse();
            return;
        default:
            return;
    }
});