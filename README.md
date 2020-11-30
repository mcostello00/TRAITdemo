# AVB Marketing Contact Demo

## Requirements

Sample Application for interacting with AVB API.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/mcostello00/AVBMarketingDemo.git
    $ cd PROJECT
    $ npm install

## Start & watch

    $ npm run dev

## Simple build for production

    $ npm run build

---

## Languages & tools

### JavaScript

- [ESLint](https://eslint.org/) is used for linting
- [Prettier](https://prettier.io/docs/en/index.html) is used to check coding conventions.
- [Webpack](https://webpack.js.org/) is used to bundle assets
- [React](http://facebook.github.io/react) is used for UI.
- [Typescript](https://www.typescriptlang.org/) is used to add type system to Javascript
- [Jest](https://jestjs.io/) is used for testing
