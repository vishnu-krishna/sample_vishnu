var config = require('../../protractor.e2e.conf').config;

// Extending omm related configs from general protractor conf

// Extending omm suites, individual specs also can be added
config.suites = {
        omm_All: './**/*.e2e-spec.ts'
    }
    // Sets specs context
config.specs = [
    './**/*.e2e-spec.ts'
]
config.baseUrl = 'https://localhost:8080/'
exports.config = config;