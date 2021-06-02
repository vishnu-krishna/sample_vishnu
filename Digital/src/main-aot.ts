/**
 * Angular bootstrapping
 * We use platformBrowserDynamic even for the AOT build as it will implicitly be swapped out
 * for platformBrowser by the angular compiler (as of angular 5 - see webpack.config.aot.js)
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

/**
 * App Module
 * our top level module that holds all of our components.
 */
import { MyAccountModule } from './app/myAccount.module';

/**
 * Bootstrap our Angular app with a top level NgModule.
 */
export function main(): Promise<any> {
  console.timeEnd(`main`);
  console.time(`main-to-bootstrapping`);
  return platformBrowserDynamic()
    .bootstrapModule(MyAccountModule)
    .catch((err) => console.error(err));
}

// Prod Mode
enableProdMode();

switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main();
}
