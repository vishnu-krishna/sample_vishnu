
module.exports = function (chromy, scenario) {
    const guid = scenario.guid;

    const IdentityEmulator = require('../common/js/common/identityEmulator').IdentityEmulator;
    console.log(IdentityEmulator);
    let token = IdentityEmulator.generateTokenForCustomer(guid);
    console.info(`Logging in with GUID: ${guid}`);

    return chromy
        .goto(`https://localhost:8080?bearer=${token}`)
        .wait('.dashboard.container');
};
