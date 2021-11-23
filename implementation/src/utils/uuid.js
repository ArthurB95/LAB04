const uuid = require('uuid');

module.exports = function generateUuid() {
    return uuid.v4();
}