const logger = require("./logger");

module.exports = {
    dataBaseErr() {
        logger.log('error', "can't get data from DB");
    },
    alreadyExists() {
        logger.log('error', "can't add item already exist");
    },

    parkingNotFound() {
        logger.log('error', "id not found in parking database");
    },

    saveError() {
        logger.log('error', "Error saving a parking");
    },
    didntChoose() {
        logger.log('error', "Didn't choose a location");
    },

    successPost() {
        logger.log('info', "Success! POST");
    },

    successGET() {
        logger.log('info', "Success! GET");
    },
    successPut() {
        logger.log('info', "Success! PUT");
    },
    successDelete() {
        logger.log('info', "Success! DELETE");
    },

    errorPut() {
        logger.log('error', "there is an error updating a parking");
    },
    errorDelete() {
        logger.log('error', "there is an error Deleting a parking");
    }
}