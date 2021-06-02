# AGL MyAccount

The MyAccount Single Page Application (SPA) is built using the following tools:
* Best practices in file and application organization for [Angular 2](https://angular.io/).
* Bundled and ready to go build system using [Webpack](https://webpack.github.io/docs/) for working with [TypeScript](http://www.typescriptlang.org/)
* Easily add new components using [Angular 2 cli](https://github.com/angular/angular-cli)
* Testing Angular 2 code with [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/)
* Coverage with [Istanbul](https://github.com/gotwarlost/istanbul)
* End-to-end Angular 2 code using [Protractor](https://angular.github.io/protractor/)
* Stylesheets with [SASS](http://sass-lang.com/)
* Error reported with [TSLint](http://palantir.github.io/tslint/) and [Codelyzer](https://github.com/mgechev/codelyzer)
* Documentation with [TypeDoc](http://typedoc.io/)
* End to end testing using [Protractor](http://www.protractortest.org/)

>Suggestion: On Windows systems, you may also want to use a better console emulator than `cmd.exe`. Try one of the following: [ConEmu](https://conemu.github.io/) or [cmder](http://cmder.net/).

# Table of Contents

* [Getting Started](#getting-started)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
    * [Documentation](#documentation)
* [Frequently asked questions](#faq)
* [TypeScript](#typescript)
* [Running without Web API and Sitecore integration](#running-without-apis-and-sitecore-integration)
* [Testing](#testing)
* [Recipes](#recipes)
* [CI](scripts/ci/readme.md)
* [MAUI](src/app/myAccount/maui)
* [Tools](tools)
* [AGL Lab](tools/agl-lab/chromeExtension)
* [Internal integration testing](tests)
* [Modal](src/app/myAccount/modal)

# Getting Started

## GIT Configuration

NOTE: Your local GIT must be configured to be case sensitive.

```bash
git config core.ignorecase false
```

## Installing
1. Download and install the following tools:
    * [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) or
    * [nvm-osx-linux](https://github.com/creationix/nvm) (or use `brew install nvm`)
    * [python2](https://www.python.org/)

1. Open up a new shell and run the following in the repository root

```bash
# macOS: install application node version
$ nvm install

# Windows: install application node version
# .nvmrc is not supported on Windows, instead open the '.nvmrc' file and get the Node.js version from it
$ nvm install <version-without-v-prefix>

# Install yarn globally
$ npm install -g yarn

# install application dependencies
$ yarn
```

### Windows (not required on a Mac)
* Note for the sasslint-webpack-plugin package you need both python and vc++:
    * Download and install Python 2.x from https://www.python.org/downloads/windows/ and add it to your PATH
    * Download and install VCBuild.exe (easy way is to install Visual Studio 2017 Community edition and select the "Desktop Development with C++" workload, **NOTE:** If you have multpile versions of Visual Studio installed you may have to use trial and error to work out which one to install the C++ workload to)

## Running the app
After you have installed all dependencies you can now run the application with:

```bash
    # start the mockserver
    $ yarn mockserver

    # start the development server (do this in a separate window)
    $ yarn start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you.

1. A browser window should automatically open up the application at [https://localhost:8080/mockidentity](https://localhost:8080/mockidentity) (ignore invalid SSL certificates or see [SSL](#ssl))
1. Select a mock user from the list
1. You are now ready to go!


## Developing

### AOT Ahead of time compilation

We have AOT compilation for production and test builds for my account, we require that after you have developed that you run the AOT compiler and fix any issues you might have when you compile.

* This compilation happens when you run the following command: `yarn build:aot`
* If you would like to check this build on a local instance run `yarn server:aot`
* If you would like to check this build with service worker in place locally run `yarn build:cache:aot` then `yarn server:aot`

### JIT compilation
* build files and watch for changes: `yarn start`

### Linting
`yarn start` - shows linting errors to the console and will fail the build until they are fixed.  It will **not** show linting warnings.  Note this will only lint files included in the webpack bundle (only production code).
`yarn build:prod` - will lint the same way as above.
`yarn lint:ts` - shows linting errors and warnings to the console for all files under the `src` directory using the `tsconfig.json` project file.  (Will not fail builds, since there are current violations that occur).
`yarn lint:ts:fix` - auto-fixes linting rule and applies pretty formatting

### Updating Dependencies
When you run `yarn` it will use the `.yarnrc` file in the project directory for its default parameters.

If you wish to upgrade a library in the `package.json` the best way is to use the `yarn add ...` or `yarn remove ...` or `yarn upgrade ...` commands which will also update the `yarn.lock` file correctly.

Alternatively, if making many changes at once, you can temporarily remove the `--frozen-lockfile` parameter from the `.yarnrc` then run `yarn` to update the dependency and the `yarn.lock` file.  Don't forget to add it back.

The `--frozen-lockfile` option for Yarn ensures that the `package.json` and `yarn.lock` file are kept in sync and not updated accidently (it will fail the build if they do not match).

### Debugging
List of debugging tools:
* `ng2-debug-router`
* [Augury](https://augury.angular.io/)

### VS Code Debugging
1. Go to Install Extensions (Ctrl + Shift + P)
1. Type `ext install` and press ENTER
1. Type `Debugger for Chrome` and press ENTER
1. Install the plugin

Different debugger load configurations are maintained in source control here: [.vscode/launch.json](.vscode/launch.json)

Note that if you run the `Attach to Chrome (see readme.md)` load configuration option, you must start chrome with
the command line argument `--remote-debugging-port=9222` (see https://github.com/Microsoft/vscode-chrome-debug for more information.)

### Routes
Angular 2 has a built in debugger for the router. This is very useful to help in debugging routes that are not resolving correctly.
To enable the router debugger, please create a localstorage key 'ng2-debug-router' set to 'true'.

```javascript
localStorage.setItem('ng2-debug-router', 'true');
```

**Start mock server**

`yarn mockserver`

NOTE: If you wish to run the mockserver in the background (intended for bash shells - like on the CI server):

`yarn mockserver:start:bg`

NOTE: You can override the port it runs on by setting the variable `STUB_SERVER_PORT` (defaults to 1344).

**Stop mock server**
`yarn mockserver:stop:bg`

## Testing

#### 1. Unit tests
##### Unit tests should be used for the following scenarios:
* A function which displays an error message.
* A function which validates an email address.
* A function which sorts a list of names.
* A function which changes the state of a product to 'out of stock'.
* A function which adds a list of numbers together.

* Running the tests
  * single run: `yarn test`
  * live mode (TDD style): `yarn test:watch`

#### 2. Protractor automated E2E tests
Run `yarn e2e <environment>`

If you want to run the local e2e tests:
* single run:
  * On the command line run: `yarn start`
  * On the command line run: `yarn mockserver`
  * On the command line run: `yarn e2e <environment>`
* single test suite (as defined in `protractor.e2e.conf.js`:
  * `yarn e2e <environment> --suite <suite-name>`

#### 3. Protractor automated Smoke tests
Run `yarn smoke <environment>`

If you want to run the local smoke test:
* single run:
  * On the command line run: `yarn start`
  * On the command line run: `yarn mockserver`
  * On the command line run: `yarn smoke local`
* single test suite (as defined in `protractor.smoke.conf.js`:
  * `yarn smoke local --suite <suite-name>`

#### 4. Protractor recommendations
* Use `$('')` CSS selectors (not `by.css` or `by.className` or `by.id`)
* Place selector into [Page Objects](https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings)
* Never use `browser.sleep()` commands, prefer `waitFor` or `until`
* Use `browser.ignoreSynchronization` if testing non-angular pages (and remember to re-enable after).
* Ensure tests are not fragile before merging (ie. run and pass 3 times in a row).
* If traversing into iframes you will need to use `switchTo`.
* You may need to use `by.cssContainingText` or alternatively find the element then use the `toContain` assertion.
* You should not have to explicitly chain promises between protractor steps, as Protractor wait for all digest cycles to complete before proceeding to the next step.
* Use data-test attribute when needing a Unique Identifier for an element. 
  * Use data-test attribute. Example, <agl-maui-radio-button-group name="mainFridgeRadioGroup" data-test="mainFridgeRadioGroup" ... />.
  * When using *ngFor then use the following syntax [attr.data-test]. Example, <agl-maui-segmented-button *ngFor="let fridgeAgeSelection of fridgeAgeSelections"  [attr.data-test] = "fridgeAgeSelection.text" ... /> .

#### 6. Pre-flight checks
To make it easier to check all your code, unit tests and AOT builds, we have added a single command that does all for you:
`yarn preflight`

#### 7. CSS Regression
`yarn css:local:maui:test`: Verifies the tested MAUI components against reference expectations.
`yarn css:local:maui:approve`: Accepts the currently captured MAUI components as the new reference expectation.
`yarn css:local:pages:test`: Verifies the top-level My Account pages against reference expectations.
`yarn css:local:pages:approve`: Accepts the currently captured top-level My Account pages as the new reference expectation.

## MAUI component library
In late 2017 My Account started to transition accross to a new internally developed component library: MAUI (My Account User Interface). Before you make any changes or add any additional components to the MAUI library please ensure you have read the maui [readme.md](/src/app/myAccount/maui/readme.md)

## Documentation

You can generate API docs (using [TypeDoc](http://typedoc.io/)) for your code with the following:
```bash
$ yarn docs
```

### Code Quality

#### JSCPD (Copy and Paste / Duplication Checking)
Run `yarn lint:cpd` to check TS and HTML files for duplicate code (using `.cpd.yaml` for presets).  This will fail if the duplication threshold is above a defined limit, specified in `package.json`.  A report will be generated to the command line and to `reports/cpd`

#### Plato
Run `yarn reports:plato` to compile TS->JS files (using `src/tsc.json` presets) and generate a report found in `reports/plato`.

#### JSComplexity
Run `yarn reports:complexity` to compile TS->JS files (using `src/tsc.json` presets) and generate a report found in `reports/complexity`.

# FAQ

#### Do I need to add script / link tags into index.html ?

No, Webpack will add all the needed Javascript bundles as script tags and all the CSS files as link tags. The advantage is that you don't need to modify the index.html every time you build your solution to update the hashes.

#### How to include external Angular 2 libraries ?

It's simple, just install the lib via `yarn` and import it in your code when you need it. Don't forget that you need to configure some external libs in the bootstrap of your application.

### How to include external css files such as bootstrap.css ?

Just install the lib and import the css files in vendor.ts. For example this is how to do it with bootstrap:

### How to add more icons to the icon font we have included.

Go to [IconMoon](https://icomoon.io/) and upload the IcoMoon_AGL_Icon_Pack.json and update the fonts as needed, once complete remember to download the settings for the fonts and update IcoMoon_AGL_Icon_Pack.json

```sh
yarn add bootstrap@4.0.0
```

And in `vendor.ts` add the following:

```ts
import 'bootstrap/dist/css/bootstrap.css';
```

# TypeScript

> To take full advantage of TypeScript with autocomplete you would have to use an editor with the correct TypeScript plugins.

## Use a TypeScript-aware editor

We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 11+](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)
`

### Recommended VS Code plugins
* [Local History](https://github.com/zabel-xyz/local-history/)
* [SVG Viewer](https://github.com/cssho/vscode-svgviewer/)
* [Git History](https://github.com/DonJayamanne/gitHistoryVSCode/)
* [Git Lens](https://github.com/eamodio/vscode-gitlens/)
* [TS Lint](https://github.com/Microsoft/vscode-tslint/)
* [Sass Lint](https://github.com/glen-84/vscode-sass-lint/)
* [SCSS Intellisense](https://github.com/mrmlnc/vscode-scss/)

### Other VS Code Tips
To fix the auto-import rule adding double-quotes to imports, you can add the following line to your `.vscode/settings.json` file (opt-in):
```json
    "tslint.autoFixOnSave": true
```
Automatically remove trailing whitespace on save: `.vscode/settings.json` (ctrl + ,) file (opt-in):
```json
    "files.trimTrailingWhitespace": true,
```

## Running without API's and Sitecore integration

If you're developing locally and don't have a local `Sitecore` installation available, you can still run the app with mock content provided by the `mockserver`.

This server will mock the following `API`'s:

* Decisioning ([https://decisioning-prod-api-prd-01.azurewebsites.net/v1/](https://decisioning-prod-api-prd-01.azurewebsites.net/v1/))
* Energy Insights ([https://energyinsights.api.agl.com.au/v1](https://energyinsights.api.agl.com.au/v1))
* Home Profile
* Move and Join ([https://moveandjoin.api.agl.com.au/v1](https://moveandjoin.api.agl.com.au/v1))
* Payment Scheme ([https://paymentschemes.api.agl.com.au/v1](https://paymentschemes.api.agl.com.au/v1))
* Personalisation ([https://personalisation.api.agl.com.au/v1](https://personalisation.api.agl.com.au/v1))
* Products ([https://product.api.agl.com.au/v2](https://product.api.agl.com.au/v2))
* Redline ([https://redline.api.agl.com.au](https://redline.api.agl.com.au/))
* Rewards ([https://rewards.api.agl.com.au/v1](https://rewards.api.agl.com.au/v1))
* Settings V2 ([https://settings.api.agl.com.au/v2](https://settings.api.agl.com.au/v2))
* Sitecore ([https://www.agl.com.au/svc/](https://www.agl.com.au/svc/))
* Solar Health Check ([https://solarcheck.api.agl.com.au/v1](https://solarcheck.api.agl.com.au/v1))
* Stored Payments ([https://storedpayments.api.agl.com.au/v1](https://storedpayments.api.agl.com.au/v1))
* Web ([https://api.agl.com.au/](https://api.agl.com.au/))

### Normal development

To use the `NodeJS` `express` server to mock `API`'s, open a terminal, and execute the command:

```sh
$ yarn mockserver
```

* Start up the webpack server
* Delete all existing localstorage and sessionstorage keys you have for the domain, as these may cause other mock data to be imported
* Navigate to the route `/mockidentity`. This page will allow you to select a customer to mock, create a fake `OAuth` token, and redirect you to the overview page.

This process works not by mocking any code inside the `MyAccount` codebase, but by creating a fake token and using the webpack proxy to 'trick' the app into thinking it is hitting the real `API`'s.

### Configuring the mockserver

#### Delay

* `GET config/fakeDelay` get configured delay (in **milliseconds**)
* `GET config/fakeDelay/:milliseconds` set configured delay to `:milliseconds` **milliseconds**
  * The delay should be between `0` and `60000` (**both inclusive**)

#### Reset cache

* `GET config/reset` reset the cache

### Making changes to the mockserver

The server is executed using `ts-node-dev` ([https://github.com/whitecolor/ts-node-dev](https://github.com/whitecolor/ts-node-dev)). This allows you to make changes to any file of the server, and the server will be restarted :)

The node server is build using `express` ([https://expressjs.com/](https://expressjs.com/)), and uses the routing module `express.Router` ([https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html))

### SSL

If you are getting - [WDS] Disconnected! - Error
There is a cert in ./ssl
Chrome - Settings > Manage certificates > Trusted Root Certification > Import ./ssl/server.crt
Webpack Dev Server implements it in yarn start script with the options "--https --cert ./ssl/server.crt --key ./ssl/server.key"

#### Windows

* `Chrome`, `Internet Explorer` and `Edge`: add `ssl/server.crt` to your **user** `Trusted Root Certification Authorities` store
* `Firefox`: add an `Exception` for the certificate

# Recipes

## Add new TypeScript definition

```sh
typings install --save --global dt~<type-definition>
```

## Add node package

```sh
yarn global add <package-name> // (global) - Local Machine
yarn add <package-name> // (dependency)
yarn add <package-name> --dev // (devDependency)
```

## Build analysis
This will give a detailed report on what things are being included within the built package.
Use this to optimise the build.

```sh
yarn build:aot:analysis
```

# Service workers (PWA Enhancements)

## Current installation

We currently have a simple instance of the service worker. Currently it will work fine in a dev instance, it will in the future work on the standalone app with no code changes. Currently we cache images (png and jpg) css, javascript and text files (content.txt).

To run a test of the service worker you can do the following:
```sh
// This will build a dev server friendly version of the service worker
yarn build:service:nonprod

// This runs the above command plus the command to cache the files and an additional command to run a simple HTTP server that can be used to view the service worker, working as if it was on the server.
yarn build:dev:cache:nonprod

// Will run the simple server out of the non-prod folder
yarn server:nonprod

// Build the service worker for non-prod
yarn precache:nonprod

// Build the service worker for prod
yarn precache:prod
```

### Future enhancements

* Upon first load, cache the API data returned to the user.
* Integrate with the webpack build. - There is a webpack plugin but we need to first move to a standalone before proceeding.
