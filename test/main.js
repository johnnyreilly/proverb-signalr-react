import 'babel-polyfill';
import 'angular';
import 'angular-mocks';

//const testsContext = require.context('./', true, /\.tests\.ts(x?)$/);
const testsContext = require.context('./', true, /\Detail\.tests\.ts(x?)$/);
console.log("testsContext", testsContext.keys())
testsContext.keys().forEach(testsContext);
