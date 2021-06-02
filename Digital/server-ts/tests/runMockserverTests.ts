import * as JasmineSpecReporter from 'jasmine-spec-reporter';

// tslint:disable-next-line:no-var-requires
let Jasmine = require('jasmine');
let jasmine = new Jasmine();

let specReporter = new JasmineSpecReporter.SpecReporter({
    spec: {
        displayStacktrace: true,
        displayDuration: true
    }
});

// We need this to prevent self signed certificate issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const TESTING_PORT: number = 4567;
const TESTING_BASE_ADDRESS: string = `https://localhost:${TESTING_PORT}/`;

jasmine.loadConfig({
    spec_dir: './server-ts/',
    spec_files: ['**/*.[sS]pec.ts'],
    random: false,
    seed: null,
    stopSpecOnExpectationFailure: false
});

jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

jasmine.env.clearReporters();
jasmine.addReporter(specReporter);
jasmine.execute();

export { TESTING_PORT, TESTING_BASE_ADDRESS };
