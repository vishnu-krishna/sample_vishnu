const commandLineHelp = `
/**
 * This file will bundle and deploy the angular 2 application
 * to octopus, if an environment is stated it will also deploy
 * the application.
 *
 * Run this application with the following commands:
 *
 * Select the environment to release & deploy(optional):
 * --environment ENVNAME or -e ENVNAME
 *
 * Release(optional)
 * This will create a release, but not deploy
 * --release or -r
 *
 * Version
 * The version number of the application
 * --version or -v
 *
 * **Examples**
 * Create a non-automated deployed package and push to octopus:
 * node octopus.deploy.config.js -v 1.0.1
 *
 * Create an automatically deployed package to the Diamond environment:
 * node octopus.deploy.config.js -v 1.0.1 -r -e Diamond
 **/`;

const octo = require('@octopusdeploy/octopackjs');
const fs = require('fs');
const zipdir = require('zip-dir');
const git = require('git-rev-2');
const OctoDeployApi = require('octopus-deploy');
const packageVersion = require('../package.json').version;


const octopusAddress = process.env.bamboo_OCTOPUS_ADDRESS;
const octopusApi = process.env.bamboo_OCTOPUS_API_KEY;

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'environment', alias: 'e', type: String },
    { name: 'release', alias: 'r', type: Boolean },
    { name: 'build', alias: 'b', type: String }, // TODO: remove in the future
    { name: 'version', alias: 'v', type: String },
    { name: 'help', alias: 'h', type: Boolean }
];

const octoConfig = {
    host: octopusAddress,
    apiKey: octopusApi // This is used to authorize against the REST Api
};

const consoleRed = '\x1b[31m';
const consoleYellow = '\x1b[33m';
const consoleDefault = '\x1b[0m';

const options = commandLineArgs(optionDefinitions);
const octoClient = new OctoDeployApi(octoConfig);

// TODO: remove this in the future (we always deploy AOT builds)
const prodBuildFlag = 'AOT';

// Help document
if (options.help) {
    console.log(commandLineHelp);
    return;
}

// Complete failover scenarios:
if (!octopusAddress) {
    console.log(consoleRed, 'ERROR: Must specify OCTOPUS_ADDRESS as an environment variable', consoleDefault);
    process.exit(1);
    return;
}

if (!octopusApi) {
    console.log(consoleRed, 'ERROR: Must specify OCTOPUS_API_KEY as an environment variable', consoleDefault);
    process.exit(1);
    return;
}

// No version
if (!options.version) {
    console.log(consoleRed, 'ERROR: Please specify a version number, such as 1.0.1', consoleDefault);
    process.exit(1);
    return;
}

// End Complete failover scenarios

// Do an automated release, this will deploy it to the environment set in options.environment
// This will only work if you have options.release tag in the options.
if (options.environment && options.release) {
    console.log(consoleYellow, 'Deploying to:', options.environment, consoleDefault);
    packageDeployment(options.environment);
}

// Create and push the package to octopus
// This only works if you haven't specified an environment and release.
if (!options.environment && !options.release) {
    console.log(consoleYellow, 'Creating package and pushing to octopus.', consoleDefault);
    packageDeployment();
}

// Build the application
function packageDeployment(env, release) {
    if (env) {
        console.log(consoleYellow, 'Package creation for:', env, 'this is a released deployment.', consoleDefault);
    } else {
        console.log(consoleYellow, 'Package creation in progress, this is not an automated release.', consoleDefault);
    }

    var version = `${packageVersion}.${options.version}`;
    var branchName = '';
    var packageName = '';
    var application = 'Agl.Digital.MyAccount';
    var projectDir = '';

    projectDir = '../dist/aot';

    git.branch(function(err, rawBranchName) {
        if (err) {
            console.log(consoleRed, 'An error occurred getting the branch name.', consoleDefault);
            console.log(err);
            process.exit(1);
        } else {
            this.branchName = rawBranchName.replace(/[\/_]/g, '-'); // underscores confuse octopus when it tries to determine the semver version from the package name
            this.packageName = application + '.' + version + '-' + this.branchName + '.' + prodBuildFlag;
            this.packageLocation = './' + this.packageName + '.zip';

            if (fs.existsSync(projectDir)) {

                // TODO: remove zip from here and do this in bamboo instead (so we can download artifacts more easily)
                zipdir(projectDir, { saveTo: this.packageLocation }, function(error, buffer) {
                    if (error) {
                        console.log(consoleRed, 'An error occurred when zipping the folder.', consoleDefault);
                        process.exit(1);
                    } else {

                        pushArtifactToOctopus(this.packageLocation, this.packageName, this.branchName);

                    }
                });
            } else {
                console.log(consoleRed, 'The project directory does not exist', consoleDefault);
                process.exit(1);
            }
        }
    });

    // TODO: move to a separate command / node file
    function pushArtifactToOctopus(packageLocation, packageName, branchName) {
        console.log(consoleYellow, 'Package generated', packageName, consoleDefault);
        console.log(consoleYellow, 'Starting package push to: ' + octopusAddress, consoleDefault);

        octo.push(packageLocation, {
            host: octopusAddress,
            apikey: octopusApi,
            replace: true
        }, function(err, result) {
            if (!err) {
                console.log(consoleYellow, 'Package Pushed: ' + result.Title + ' v' + result.Version, consoleDefault);

                // On the below happens with release.
                if (options.release) {
                    console.log(consoleYellow, 'Release in progress:', consoleDefault);
                    // Release Information

                    var projectIdOrSlug = '';

                    var releaseVersion = version + '-' + branchName + '.' + prodBuildFlag;
                    var releaseNotes = 'This was an automated release.';
                    var variables = {};
                    var packageVersion = releaseVersion;

                    // Deployment Information
                    var environmentName = env;
                    var comments = `Deploy Apps package to Onpremises: ${version}-${branchName}.${prodBuildFlag}`;

                    // Create Deployment
                    var deploymentPromise = octoClient.helper.simpleCreateReleaseAndDeploy(
                        projectIdOrSlug, releaseVersion, releaseNotes, environmentName, comments, variables, packageVersion);

                    // Print out deployment
                    deploymentPromise.then(function(deployment) {
                        console.log(consoleYellow, 'Octopus release created and deployed:', consoleDefault);
                        console.log(deployment);
                    }, function(reason) {
                        console.log(consoleRed, 'Octopus release creation or deployment failed!', consoleDefault);
                        console.log(reason);
                        process.exit(1);
                    });
                }
            } else {
                console.log(consoleRed, 'An error occurred when pushing the package', consoleDefault);
                console.log(consoleRed, err, consoleDefault);
                process.exit(1);
            }
        });
    }

}
