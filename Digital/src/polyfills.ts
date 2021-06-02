
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 */
import 'core-js/es6/array';
import 'core-js/es6/date';
import 'core-js/es6/function';
import 'core-js/es6/map';
import 'core-js/es6/math';
import 'core-js/es6/number';
import 'core-js/es6/object';
import 'core-js/es6/parse-float';
import 'core-js/es6/parse-int';
import 'core-js/es6/reflect';
import 'core-js/es6/regexp';
import 'core-js/es6/set';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es6/typed';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es7/array';

// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';

import 'reflect-metadata'; // TODO exclude from the AOT build as it is only used by JIT

// Zone JS is required by default for Angular itself.
import 'zone.js/dist/zone';

let isProductionMode = process.env.ENV === 'build:prod';
if (!isProductionMode) {
  Error['stackTraceLimit'] = Infinity;
  // tslint:disable-next-line:no-var-requires
  require('zone.js/dist/long-stack-trace-zone');
}

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
