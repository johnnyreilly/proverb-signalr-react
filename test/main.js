/* eslint-disable */
import 'babel-polyfill';
import 'angular';
import 'angular-mocks';

const testsContext = require.context('./', true, /\.tests\.ts(x?)$/);
testsContext.keys().forEach(testsContext);
