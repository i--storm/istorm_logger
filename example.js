let Logger = require('istorm_logger').init('i18z_backend.log');

Logger.success("Success");
Logger.err("Error");
Logger.warn("Warning");
Logger.dbg("Debug");
Logger.log("Log");