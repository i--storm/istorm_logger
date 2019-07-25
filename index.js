let fs   = require('graceful-fs');
let df = require('dateformat');
const chalk = require('chalk');
var path = require('path');

let logfile="general.log";
let logger_mode="";

let init = function(file, mode) {
    if(typeof mode!=='undefined'){
        logger_mode=mode;
    }

    logfile=file;

    return this;
};


let success = function (...messages) {
    let message=messagesToString(messages);
    console.log(dateStr()+chalk.green(' SUCCESS') + " # " + message);
    writeLog(dateStr()+' SUCCESS'+" # " + message)
};

let log = function (...messages) {
    let message=messagesToString(messages);
    console.log(dateStr()+chalk.cyan(' INFO') + " # " + message);
    writeLog(dateStr()+' INFO'+" # " + message)
};

let warn = function (...messages) {
    let message=messagesToString(messages);
    console.log(dateStr()+chalk.yellow(' WARN') + " # " + message);
    writeLog(dateStr()+' WARN'+" # " + message)
};

let err = function (...messages) {
    let message=messagesToString(messages);
    console.log(dateStr()+chalk.red(' ERROR') + " # " + message);
    writeLog(dateStr()+' ERROR'+" # " + message);
    writeLog(dateStr()+' ERROR'+" # " + message, 'error.log');
};

let dbg = function (...messages) {
    if(logger_mode==='debug') {
        let message = messagesToString(messages);
        console.log(dateStr() + chalk.gray(' DEBUG') + " # " + message);
        writeLog(dateStr() + ' DEBUG' + " # " + message)
    }
};

let dateStr = function(){
    return df(new Date(), 'yyyy/mm/dd HH:MM:ss l');
};

let messagesToString = function(messages){
    let message='';
    for(i=0;i<messages.length; i++){
        let msg=messages[i];
        if(typeof(msg)==='object'){
            // Note: cache should not be re-used by repeated calls to JSON.stringify.
            let ch = [];
            message = message + (message.length>0? ' ':'') + JSON.stringify(msg, function(key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (ch.indexOf(value) !== -1) {
                        // Duplicate reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    ch.push(value);
                }
                return value;
            }, 2);
            ch=null;
        }else{
            message = message + (message.length>0? ' ':'') + msg;
        }
    }
    return message;
};

let writeLog = function (message, file){

    let appDir = path.dirname(require.main.filename);

    let log_dir=appDir+'/logs/';

    if (!fs.existsSync(log_dir)) {
        fs.mkdirSync(log_dir);
    }

    if(typeof(file)==='undefined'){
        file=logfile;
    }

    fs.appendFile(log_dir+file, message+"\n", function(err) {
        if(err) {
            return console.log(err);
        }
    });


};

module.exports = {
    init,
    success,
    log,
    dbg,
    warn,
    err,
};