const validator = require("validator");

module.exports = (value) => validator.isURL(value);
