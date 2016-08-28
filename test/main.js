/* eslint-disable */
import 'babel-polyfill';
import 'jquery';
import 'angular';
import 'angular-mocks';

const testsContext = require.context('./', true, /\.tests\.ts(x?)$/);
testsContext.keys().forEach(testsContext);
