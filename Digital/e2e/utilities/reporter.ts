import { JUnitXmlReporter } from 'jasmine-reporters';

export function configureSpecReporter() {
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter(
        { spec: { displayStacktrace: false, displayDuration: true }
    }));
}

export function configureJUnitXmlReporter() {
    jasmine.getEnv().addReporter(new JUnitXmlReporter({
        savePath: './reports/e2e',
        consolidateAll: false
    }));
}

export function configureJasmine2HtmlReporter() {
    let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

    let today = new Date();
    let timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '_' + today.getHours() + 'h-' + today.getMinutes() + 'm';

    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: 'reports/e2e/html', screenshotsFolder: 'failed-screenshots', showSummary: true, reportTitle: 'Protractor Reporter',
        takeScreenshots: true, takeScreenshotsOnlyOnFailures: true,
        filePrefix: 'report-' + timeStamp, preserveDirectory: false, consolidate: true, consolidateAll: true
    }));
}
