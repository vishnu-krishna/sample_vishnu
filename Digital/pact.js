var async = require('async');
var exec = require('child_process').exec;
const spawn = require('child_process').spawn;

pactSpecFolder = 'pact/specs';
pactLog = 'pact/logs/pact.logs';
browserOption = 'Chrome_without_security';

// Get options
process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    browserOption = val;
  }
});

function runPactTests () {
    console.log('Starting the pact mock server ...');
    
    // The port 1234, needs to be reflected in the config.service.ts file
    var pactProc = spawn('cmd', ['/C', 'pact-mock-service', '-p', '1234', '-l', pactLog, '--pact-dir', pactSpecFolder]);
    pactProc.on('exit', (code) => {
        console.log(`Pact mock server exited with code ${code}`);
    });

    console.log('Start running the pact tests ...');
    exec(`karma --browsers ${browserOption} start karma-pact.config.js`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`stdout: ${stdout}`);
        }

        console.log('Terminating the pact mock server ...');
        spawn('cmd', ['/C', 'taskkill', '/F', '/IM', 'ruby.exe', '/T']);
    });
}

function runAndPublishPactTests() {
  async.series(
        [
            function(callback) {
                runPactTests();
                callback();
            }
        ]
    );
}

runAndPublishPactTests();
