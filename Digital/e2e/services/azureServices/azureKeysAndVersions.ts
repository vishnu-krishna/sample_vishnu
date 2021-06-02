export function getAzureKeysAndVersionsForEnvironment(environment) {
    let featureCallbackUrl = {
        diamond: () => 'https://agldiamond.digital.agl.com.au/sts/account/logincallback',
        obsidian: () => 'https://aglobsidian.digital.agl.com.au/sts/account/logincallback'
    };

    switch (environment) {
        case 'monthly-uat':
        return {
            domain: 'https://agl-uat.au.auth0.com',

            // item at index 0 for each of the following arrays is the key name in the Azure Key Vault
            // item at index 1 for each of the following arrays is the version name for the key in the Azure Key Vault
            globalClientId: [ 'mntuat-globalclientid', '1f58bf538c344a639d649872d2e7ba59'],
            globalClientSecret: [ 'mntuat-globalclientsecret', 'bd1c864a9ba6481cb3a9f87ad71c0a7f'],
            clientId: [ 'mntuat-myaccclientid', '2a35978178834b00bf996f3ca52483d4'],
            clientSecret: ['mntuat-myaccclientsecret', '1afc90ca8216433388250154e51ee07b'],
            testAutomationclientid: ['mntuat-testAutomationclientid', '7e603a18a4fa44178566b871b6b44604'],
            testAutomationclientsecret: ['mntuat-testAutomationclientsecret', 'c7ddc03c914649839b039caf191d9b37'],
            // ***************************************************************************************************
            callbackUrl: 'https://aglmntuat.digital.agl.com.au/sts/account/logincallback/'
        };

        case 'diamond':
        case 'obsidian':
        return {
            domain: 'https://agl-qtrtest.au.auth0.com',

            // item at index 0 for each of the following arrays is the key name in the Azure Key Vault
            // item at index 1 for each of the following arrays is the version name for the key in the Azure Key Vault
            globalClientId: [ 'qtrtest-globalclientid', '40b540c3253e45cc8f43067a59ba5f55'],
            globalClientSecret: [ 'qtrtest-globalclientsecret', 'f519065100f54986b9a5253a4ed58c32'],
            clientId: [ 'qtrtest-myaccclientid', '46b918391faf4b5d92c1d2bd8e792651'],
            clientSecret: ['qtrtest-myaccclientsecret', '568556a7a1cd4f6a9536eed3f77bcd43'],
            testAutomationclientid: ['qtrtest-testAutomationclientid', '5585708b1eb3480f82d66af73ac71eb9'],
            testAutomationclientsecret: ['qtrtest-testAutomationclientsecret', 'c2280193735e40bc9fa3bf81b662b9e7'],
            // ***************************************************************************************************
            callbackUrl: featureCallbackUrl[environment]()
        };

        default:
        throw new Error ('Invalid environment argument passed into the getAzureKeysAndVersionsForEnvironment() function');
    }
}
