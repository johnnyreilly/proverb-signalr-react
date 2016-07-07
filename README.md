# Proverb Angular

[![Build Status](https://ci.appveyor.com/api/projects/status/github/johnnyreilly/proverb-angular?svg=true)](https://ci.appveyor.com/project/JohnReilly/proverb-angular) [![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard-flat.svg)](http://definitelytyped.org)

Proverb is a simple app that stores the wise sayings of sages.  Most notably those of "Socrates" Aruldas.

This repository is built using the following technologies:

- TypeScript using ES2015
- AngularJS 1.5
- Webpack (with ts-loader for TypeScript compilation and babel-loader for transpilation)
- Karma for testing

This is the Angular 1.x front end of Proverb.

## Getting Started

You need to install [node and npm](http://nodejs.org/).  You also need to install [Typings](https://github.com/typings/typings).  Install your node dependencies with `npm install`.  To install your typing dependencies you need to run `typings install` in both the `src` and `test` folders.

To develop locally enter

```
npm run serve
```

and then browse to [http://localhost:7777/](http://localhost:7777/).  As you save your files will be compiled / linted and your tests run.

To build for release:

```
npm run build
```

## Licence

Copyright © 2014- [John Reilly](twitter.com/johnny_reilly). This project is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
