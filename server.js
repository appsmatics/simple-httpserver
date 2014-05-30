var express = require("express"),
    app = express(),
    bodyParser = require('body-parser')
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override')
    serveStatic = require('serve-static'),
    logger = require('morgan');
                

if (process.argv[2] === "-h") {
        //default port 8080, default dir '.'
        console.log("Usage: node server.js --port port[8080] --dir full_directory_path[.]");
        process.exit(0);
}

var argv = require('minimist')(process.argv.slice(2));
var portStr = argv.port || undefined;
port = (portStr)? parseInt(portStr) : 8080;
var directory = argv.dir || process.env.PWD;

app.use(methodOverride());
app.use(logger('dev'));
app.use(bodyParser());
app.use('/', serveStatic(directory));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("serving from ["+directory+"] on port: "+port);
app.listen(port);
