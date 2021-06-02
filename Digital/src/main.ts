import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyAccountModule } from './app/myAccount.module';

let isProductionMode = (process.env.ENV === 'build' || process.env.ENV === 'build:prod');
if (isProductionMode) { enableProdMode(); }

export function main() {
    console.timeEnd(`main`);
    console.time(`main-to-bootstrapping`);
    return platformBrowserDynamic().bootstrapModule(MyAccountModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
