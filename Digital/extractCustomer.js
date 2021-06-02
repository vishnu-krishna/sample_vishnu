const request = require('request');
const jsonfile = require('jsonfile');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

// Jsonfile global configuration
jsonfile.spaces = 4;

// Folder locations
var accountFolder = '';
var billFolder = '';
var dashboardFolder = '';
var paymentsFolder = '';
var pendingpaymentsFolder = '';
var syncFolderStart = '';
var syncFolderStatus = '';

var usageFolder_0 = '';
var usageFolder_1 = '';
var usageFolder_2 = '';
var usageFolder_3 = '';

var ssmr_eligibility = '';
var ssmr_submitRead = ``;

var contactDetailFolder = '';

var solarCheckContractsFolder = '';
var solarCheckEligibilityFolder = '';

// Default options

var nameID = '';

var envConfig = {
    'prod': {
        stsUrl: 'https://www.agl.com.au',
        stsScope: 'https://aglsts.accesscontrol-website.windows.net',
        webApi: 'https://api.agl.com.au',
        redlineApi: 'https://redline.api.agl.com.au',
        settingsApi: 'https://settings.api.agl.com.au',
        solarCheckApi: 'https://solarcheck.api.agl.com.au'
    },
    'uat': {
        stsUrl: 'https://agldstuat.digital.agl.com.au',
        stsScope: 'https://agldststs.accesscontrol.windows.net/',
        webApi: 'https://api-uat.agl.com.au',
        redlineApi: 'https://uat-redline.digital.agl.com.au',
        settingsApi: 'https://settings-api-agl-bauu-aus.azurewebsites.net',
        solarCheckApi: 'https://solarcheck-mntuat.api.agl.com.au'
    },
    'obsidian': {
        stsUrl: '',
        stsScope: '',
        webApi: '',
        redlineApi: '',
        settingsApi: ''
    },
    'kermit': {
        stsUrl: 'https://agldstqtruat.digital.agl.com.au',
        stsScope: 'https://agldststs.accesscontrol.windows.net/',
        webApi: 'https://kermit.api.agl.com.au',
        redlineApi: '',
        settingsApi: ''
    },
    'qrt-uat': {
        stsUrl: 'https://agldstqtruat.digital.agl.com.au',
        stsScope: 'https://agldststs.accesscontrol.windows.net/',
        webApi: 'https://qtruat.api.agl.com.au',
        redlineApi: '',
        settingsApi: ''
    },
    'monthly-test': {
        stsUrl: 'https://aglmnttest.digital.agl.com.au',
        stsScope: 'https://agldststs.accesscontrol.windows.net/',
        webApi: 'https://apiaglmnttest.api.agl.com.au/',
        redlineApi: 'https://uat-redline.digital.agl.com.au/api',
        settingsApi: 'https://settings-api-agl-mntt-aus.azurewebsites.net',
        solarCheckApi: 'https://solarcheck-mnttest.api.agl.com.au'
    },
    'monthly-uat': {
        stsUrl: 'https://aglmntuat.digital.agl.com.au',
        stsScope: 'https://agldststs.accesscontrol.windows.net/',
        webApi: 'https://apiaglmntuat.api.agl.com.au/',
        redlineApi: 'https://uat-redline.digital.agl.com.au/api',
        settingsApi: 'https://settings-api-agl-mntu-aus.azurewebsites.net',
        solarCheckApi: 'https://solarcheck-mntuat.api.agl.com.au'
    }
};

const constants = {
    rootFolder: 'server-ts/_mockData/users',
    mockResponseFilename: 'response.json',
}

const context = {
    businessPartnerMockFolder: '',
    mockRedlineApiFolderLocation: '',
    mockSettingsApiFolderLocation: '',
    mockWebApiFolderLocation: '',
    mockSolarCheckApiFolderLocation: ''
};

const cmdLineOptionDefinitions = [
    { name: 'token', alias: 't', type: String },
    { name: 'environment', alias: 'e', type: String },
    { name: 'force', alias: 'f', type: Boolean, defaultValue: false },
    { name: 'help', alias: 'h', type: Boolean }
];

try {
    context.args = commandLineArgs(cmdLineOptionDefinitions, { partial: true });
    if (!context.args.token
        || context.args.hasOwnProperty('_unknown')
        || (context.args.hasOwnProperty('help') && context.args.help)) {
        showUsage();
        process.exit(1);
    }
} catch (e) {
    showUsage();
    process.exit(1);
}

// SET ENVIRONMENT
if (envConfig.hasOwnProperty(context.args.environment)) {
    context.env = envConfig[context.args.environment];
} else {
    console.error('NO ENV CONFIG!!');
    showUsage();
    process.exit(1);
}

// SET TOKEN
if (context.args.token) {
    context.token = context.args.token;
} else {
    console.error('NO TOKEN CONFIG!!');
    showUsage();
    process.exit(1);
}

doSync(context.token);


function download(options, folder) {

    console.log(`\tDownloading... ${options.url}`);

    request(options, function(error, response, body) {

        saveResponseToFile(response, body, folder);

    });

}

function saveResponseToFile(response, body, folder) {

    if (response) {

        var headers = response.headers;

        var mockData = {
            status: response.statusCode,
            headers: {}, // headers - include this if you want to scrape headers
            body: {}
        };
    }

    if (body) {
        var jsonBody = JSON.parse(body);
        mockData.body = jsonBody;
    }

    var fullPath = path.join(folder, constants.mockResponseFilename);

    jsonfile.writeFile(fullPath, mockData, null, (err) => {
        if (err) {
            console.error(`Failed to save ${fullPath}`);
            console.error(err);
        } else {
            console.log(`Saved ${fullPath}`);
        }
    });
}

// Subsequent ajax calls and returning of JSON files for
// up-to-date mocking data.

function doSync(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/syncdata/start',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        if (response.statusCode !== 200) {
            console.error(`ERROR: Received ${response.statusCode} ${response.statusMessage} trying to get ${options.url}`);
            console.error('ERROR:', body);
            return;
        }

        getSyncStatus(token)
    });
}

function getSyncStatus(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/syncdata/status',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        if (response.statusCode !== 200) {
            console.error(`ERROR: Received ${response.statusCode} ${response.statusMessage} trying to get ${options.url}`);
            console.error('ERROR:', body);
            return;
        }

        var status = [];
        var statusResponse = JSON.parse(body);
        var stillNeedSync = false;

        for (statuses of statusResponse) {
            status.push(statuses);
        }

        for (dataState of status) {
            if (dataState.status !== 'Complete') {
                console.log('\t- INCOMPLETE', dataState.dataGroup);
                stillNeedSync = true;
            } else {
                console.log('\t- COMPLETE: ', dataState.dataGroup);
            }
        }

        console.log('SYNCING:', stillNeedSync);

        if (stillNeedSync) {
            setTimeout(function() {
                getSyncStatus(token);
            }, 2000);
        } else {

            // Sync json creation
            var mockSync = {
                status: 200,
                headers: {},
                body: 'Mocked'
            };
            var file = 'response.json';

            // TODO: Could just extract this from the JWT token we get after auth?
            getBusinessPartnerNameId(token, function() {
                if (nameID.length > 0) {

                    configureStorage();

                    // get data from Web Api
                    // =====================
                    getAccountsList(token);
                    getDashboard(token);
                    getBills(token);
                    getPayments(token);
                    getPendingPayments(token);
                    getBasicUsage(token);
                    getHourlyUsage(token);
                    getDailyUsage(token);
                    getMonthlyUsage(token);
                    // getEligibility(token); /* commented out */
                    getContactDetail(token);

                    // get data from Settings Api
                    // ==========================
                    getBillDeliveryPreferences(token);
                    getPaymentMethods(token);

                    // get data from Redline Api
                    // ==========================
                    getRedlineData(context);

                    // get data from SolarCheck Api
                    // ==========================
                    getSolarCheckData(token);

                    jsonfile.writeFile(syncFolderStart + file, mockSync);

                    var mockData = {
                        status: response.statusCode,
                        headers: {}, // headers - include this if you want to scrape headers
                        body: statusResponse
                    };

                    jsonfile.writeFile(syncFolderStatus + 'response.json', mockData);

                    console.log('COMPLETE');
                } else {
                    console.log('ERROR - Unable to get the nameID');
                }
            });

        }

    });
}

// Api Calls below

function getBusinessPartnerNameId(token, callback) {

    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/accounts/list',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        var accountsList = JSON.parse(body);

        if (accountsList && accountsList.length > 0) {
            if (accountsList[0].contracts && accountsList[0].contracts.length > 0) {
                if (accountsList[0].contracts[0].nameId) {
                    nameID = accountsList[0].contracts[0].nameId;
                    console.log('Business Partner Name ID: ' + nameID);
                    callback();
                }
            }
        }

    });
}

function configureStorage() {
    var regeneratedFolder = '';

    if (!context.args.force) {
        regeneratedFolder = fs.existsSync(path.join(constants.rootFolder, nameID)) ? '_regenerated' : '';
    }

    context.businessPartnerMockFolder = path.join(constants.rootFolder, nameID, regeneratedFolder);

    context.mockRedlineApiFolderLocation = path.join(context.businessPartnerMockFolder, 'aglRedlineApi')
    context.mockSettingsApiFolderLocation = path.join(context.businessPartnerMockFolder, 'aglSettingsApi');
    context.mockWebApiFolderLocation = path.join(context.businessPartnerMockFolder, 'aglWebApi');
    context.mockSolarCheckApiFolderLocation = path.join(context.businessPartnerMockFolder, 'aglSolarCheckApi');

    accountFolder = context.mockWebApiFolderLocation + '/api/accounts/list/';
    billFolder = context.mockWebApiFolderLocation + '/api/v1/bills/';
    dashboardFolder = context.mockWebApiFolderLocation + '/api/v1/dashboard/';
    paymentsFolder = context.mockWebApiFolderLocation + '/api/v1/payments/';
    pendingpaymentsFolder = context.mockWebApiFolderLocation + '/api/v1/pendingpayments/';
    syncFolderStart = context.mockWebApiFolderLocation + '/api/v1/syncdata/start/';
    syncFolderStatus = context.mockWebApiFolderLocation + '/api/v1/syncdata/status/';
    usageFolder_0 = context.mockWebApiFolderLocation + '/api/v1/usage/0/';
    usageFolder_1 = context.mockWebApiFolderLocation + '/api/v1/usage/1/';
    usageFolder_2 = context.mockWebApiFolderLocation + '/api/v1/usage/2/';
    usageFolder_3 = context.mockWebApiFolderLocation + '/api/v1/usage/3/';
    // ssmr_eligibility = mockWebApiFolderLocation + '/v2/contracts/TO-DO/meters/selfServiceEligibility/';
    ssmr_submitRead = context.mockWebApiFolderLocation + 'v2/contracts/TO-DO/meters/selfServiceReadings/';
    contactDetailFolder = context.mockWebApiFolderLocation + '/v2/contactdetail';
    billDeliveryPreferencesFolder = context.mockSettingsApiFolderLocation + '/v2/billdeliverypreferences';
    paymentMethodsFolder = context.mockSettingsApiFolderLocation + '/v2/paymentmethods';
    solarCheckContractsFolder = context.mockSolarCheckApiFolderLocation + '/v1/contracts';
    solarCheckEligibilityFolder = context.mockSolarCheckApiFolderLocation + '/v1/eligibility';

    // TODO: mkdirp is async. Calls to create folders may not have completed by the time they're expected to be there! It's just luck this actually works.

    // Remove old folder structure and recreate.
    if (!fs.existsSync('_mockData')) {
        // WebApi folders
        mkdirp(accountFolder);
        mkdirp(billFolder);
        mkdirp(dashboardFolder);
        mkdirp(paymentsFolder);
        mkdirp(pendingpaymentsFolder);
        mkdirp(syncFolderStart);
        mkdirp(syncFolderStatus);
        mkdirp(usageFolder_0);
        mkdirp(usageFolder_1);
        mkdirp(usageFolder_2);
        mkdirp(usageFolder_3);
        mkdirp(ssmr_eligibility);
        // mkdirp(ssmr_submitRead);
        mkdirp(contactDetailFolder);

        // SettingsApi folders
        mkdirp(billDeliveryPreferencesFolder);
        mkdirp(paymentMethodsFolder);
    }
}

function getDashboard(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/dashboard',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, dashboardFolder);

}

function getHourlyUsage(token) {

    // calculate 13 months of usage data
    var queryParams = {
        startDate: '2012-01-01T00:00:00',
        endDate: '2032-01-01T00:00:00',
        includeEstimatedReads: 'true'
    };

    var options = {
        method: 'GET',
        qs: queryParams,
        url: context.env.webApi + '/api/v1/usage/0',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, usageFolder_0);
}

function getDailyUsage(token) {

    // calculate 13 months of usage data
    var queryParams = {
        startDate: '2012-01-01T00:00:00',
        endDate: '2032-01-01T00:00:00',
        includeEstimatedReads: 'true'
    };

    var options = {
        method: 'GET',
        qs: queryParams,
        url: context.env.webApi + '/api/v1/usage/1',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, usageFolder_1);

}

function getMonthlyUsage(token) {

    // calculate 13 months of usage data
    var queryParams = {
        startDate: '2012-01-01T00:00:00',
        endDate: '2032-01-01T00:00:00',
        includeEstimatedReads: 'true'
    };

    var options = {
        method: 'GET',
        qs: queryParams,
        url: context.env.webApi + '/api/v1/usage/2',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, usageFolder_2);

}

function getBasicUsage(token) {

    // calculate 13 months of usage data
    var queryParams = {
        startDate: '2012-01-01T00:00:00',
        endDate: '2032-01-01T00:00:00',
        includeEstimatedReads: 'true'
    };

    var options = {
        method: 'GET',
        qs: queryParams,
        url: context.env.webApi + '/api/v1/usage/3',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, usageFolder_3);

}

function getAccountsList(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/accounts/list',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, accountFolder);

}

function getBills(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/bills',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, billFolder);

}

function getPayments(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/payments',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, paymentsFolder);

}

function getPendingPayments(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/api/v1/pendingpayments',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token
        }
    };

    download(options, pendingpaymentsFolder);

}

// SSMR
function getEligibility(token, contract) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/v2/contracts/' + contract + '/meters/selfServiceEligibility?Source=Web',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token,
            'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
        }
    };

    download(options, ssmr_eligibility);

}

function getContactDetail(token) {
    var options = {
        method: 'GET',
        url: context.env.webApi + '/v2/contactdetail',
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + token,
            'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
        }
    };

    download(options, contactDetailFolder);

}

function getBillDeliveryPreferences(token) {
    if (context.env.settingsApi === '') {
        console.warn('\tWARNING: Bill delivery preferences not downloaded because config Settings Api is empty.');
    } else {
        var options = {
            method: 'GET',
            url: context.env.settingsApi + '/v2/billdeliverypreferences',
            headers: {
                'cache-control': 'no-cache',
                authorization: 'Bearer ' + token,
                'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
            }
        };
        download(options, billDeliveryPreferencesFolder);
    }
}

function getPaymentMethods(token) {
    if (context.env.settingsApi === '') {
        console.warn('\tWARNING: Payment methods not downloaded because config Settings Api is empty.');
    } else {
        var options = {
            method: 'GET',
            url: context.env.settingsApi + '/v2/paymentmethods?expand=DirectDebit,OneTouchPay',
            headers: {
                'cache-control': 'no-cache',
                authorization: 'Bearer ' + token,
                'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
            }
        };
        download(options, paymentMethodsFolder);
    }
}

function getRedlineData(context) {

    function makeFolder(path) {
        return new Promise((resolve, reject) => {
            mkdirp(path, (err, made) => {
                err ? reject(err) : resolve(made);
            });
        });
    }

    function httpRequest(userOptions, queryParams) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
                authorization: 'Bearer ' + context.token,
                'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
            }
        };
        const actualOptions = {};
        if (queryParams) {
            actualOptions.qs = queryParams;
        }
        Object.assign(actualOptions, defaultOptions, userOptions);
        return new Promise((resolve, reject) => {
            console.log(`\tDownloading... ${actualOptions.url}`);
            request(actualOptions, function(error, response, body) {
                if (error) {
                    reject(error);
                    return;
                }

                var responseWrapper = { options: actualOptions, response: response, body: body };

                try {
                    responseWrapper.body = JSON.parse(responseWrapper.body);
                } catch (e) {}

                resolve(responseWrapper);
            });
        });
    }

    function dump(value) {
        console.log(JSON.stringify(value, null, 2));
        return Promise.resolve(value);
    }

    function getBillsDataFromWebApi() {
        return httpRequest({ url: context.env.webApi + '/api/v1/bills' })
    }

    function callRedlineApiForEachContract(billsResponse) {
        const redLineApiCalls = [];
        billsResponse.body.forEach((bill) => {
            redLineApiCalls.push(
                httpRequest({ url: context.env.redlineApi + `/api/v1/bills/contract/${bill.contract}` })
            );
        });
        return Promise.all(redLineApiCalls);
    }

    function buildDataToBeSaved(responses) {
        // TODO: This function needs to do a lot of work we don't have time to implement now.
        return Promise.resolve(responses);
    }

    function saveResponses(responses) {
        responses.forEach((responseWrapper) => {
            var options = responseWrapper.options;
            var response = responseWrapper.response;
            var folderName = path.join(context.mockRedlineApiFolderLocation, options.url.replace(context.env.redlineApi, ''));
            makeFolder(folderName)
                .then(() => saveResponseToFile(response, response.body, folderName));
        });
    }

    if (context.env.redlineApi === '') {
        console.warn('\tWARNING: Redline data not downloaded because config Redline Api is empty.');
        return;
    }

    getBillsDataFromWebApi()
        .then(callRedlineApiForEachContract)
        .then(buildDataToBeSaved)
        .then(saveResponses)
        .catch(err => {
            throw err;
        });
}

function getSolarCheckData(token) {

    // get eligibility
    mkdirp(solarCheckEligibilityFolder, function (err) {
        if (err) {
            console.error("Failed to create folder " + solarCheckEligibilityFolder);
        }
        else {
            var options = createRequestOption(context.env.solarCheckApi + '/v1/eligibility');

            console.log(`\tDownloading... ${options.url}`);

            request(options, function(error, response, body) {
                saveResponseToFile(response, body, solarCheckEligibilityFolder);

                // loop through eligibility contracts to get the status for each contract
                if (body) {
                    var eligibility = JSON.parse(body);
                    for (var contract of eligibility.contracts){
                        // get the status for the contract
                        let statusFolderPath = path.join(solarCheckContractsFolder, '/', contract.contractNumber, '/status/');
                        getSolarCheckStatus(token, contract.contractNumber, statusFolderPath);

                        // mock post response for the contract
                        let registerFolderPath = path.join(solarCheckContractsFolder + '/' + contract.contractNumber + '/register');
                        createSolarCheckRegisterResponse(contract.contractNumber, registerFolderPath);
                    }
                }
            });
        }
    });

    function getSolarCheckStatus(token, contractNumber, folderPath) {
        mkdirp(folderPath, function (err) {
            if (err) {
                console.error("Error creating folder " + folderPath);
            }
            else {
                var options = createRequestOption(context.env.solarCheckApi + '/v1/contracts/' + contractNumber + '/status');
                download(options, folderPath);
            }
        });
    }

    function createSolarCheckRegisterResponse(contractNumber, folderPath){

        let filePath = path.join(folderPath, 'response.json');

        mkdirp(folderPath, function (err) {
            if (err) {
                console.error("Error creating folder " + folderPath);
            }
            else {
                let data = {
                    "status": 200,
                    "body": {}
                }

                fs.writeFile(filePath, JSON.stringify(data, null, 4), { flag: 'w' }, function (err) {
                    if (err) {
                        console.error("Failed to save " + filePath);
                    }
                    else {
                        console.log("Saved " + filePath);
                    }
                });
            }
        });
    }

    function createRequestOption(requestUrl){
        var defaultOptions = {
            method: 'GET',
            url: requestUrl,
            headers: {
                'cache-control': 'no-cache',
                authorization: 'Bearer ' + context.token,
                'X-Correlation-Id': '6C8BBCC8-E372-4372-54EF-091F9730E015'
            }
        };

        return defaultOptions;
    }
}

function showUsage() {
    const sections = [{
            header: 'Extract Customer',
            content: 'Calls various APIs to capture user data and saves it in a folder structure.'
        },
        {
            header: 'Arguments',
            optionList: [{
                    name: 'username',
                    description: 'Customers email address used to logon to My Account.'
                },
                {
                    name: 'password',
                    description: 'Customers password.'
                },
                {
                    name: 'environment',
                    description: 'The environment to log on to and extract data. One of: ' + Object.keys(envConfig).join(', ')
                },
                {
                    name: 'force',
                    description: 'Forces recreation of file structure if it already exists.'
                },
                {
                    name: 'help',
                    description: 'This message.'
                }
            ]
        },
        {
            header: 'Usage',
            content: [{
                    desc: 'Most common:',
                    example: 'node extractcustomer -u john.doe@agl.com.au -p sesame -e uat'
                },
                {
                    desc: 'Force recreation of file structure:',
                    example: 'node extractcustomer -u john.doe@agl.com.au -p sesame -e uat -f'
                }
            ]
        }
    ];
    console.log(commandLineUsage(sections));
}
