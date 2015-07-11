/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 7777;
var routes;

var environment = process.env.NODE_ENV;

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use(express.static('./build/'));
app.use('/*', express.static('./build/index.html'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
