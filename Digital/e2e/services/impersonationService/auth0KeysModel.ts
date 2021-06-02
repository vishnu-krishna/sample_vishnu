
// Used to hold Auth0 Environment specific secrets and ids
export class Auth0KeysModel {
    globals: Auth0GlobalKeys;
    clientId: string;
    clientSecret: string;
    testAutomationclientid: string;
    testAutomationclientsecret: string;
    callbackUrl: string;
}

export class Auth0GlobalKeys {
    domain: string;
    globalClientId: string;
    globalClientSecret: string;
}
