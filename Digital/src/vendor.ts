/*
 Only scripts that are required globally that are not explicitly imported in the modules where they are used, should be included here.
 For example in the past `import '@angular/platform-browser-dynamic';` was listed here - resulting in @angular/platform-browser-dynamic
 being included in the AOT build outputs because the imports in this file forced it into our vendor.js output file
*/

import 'css-element-queries';
import 'hammerjs';
