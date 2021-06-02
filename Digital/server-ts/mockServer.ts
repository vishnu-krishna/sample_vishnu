import { BusinessPartnerModel } from './../src/app/shared/service/api.service';
/*

    NodeJS EXPRESS SERVER

    Express v4.x.x
    https://expressjs.com/en/4x/api.html

    Routing:
    https://expressjs.com/en/guide/routing.html

*/

import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import * as fileUpload from 'express-fileupload';
import * as bodyParser from 'body-parser';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { CustomerCache } from './common/customerCache';
import { Cors } from './middleware/cors';
import { Customer } from './middleware/customer';

import { WebApi } from './endpoints/aglWebApi';
import { MoveAndJoinApi } from './endpoints/aglMoveAndJoinApi';
import { SettingsApi } from './endpoints/aglSettingsApi';
import { StoredPaymentsApi } from './endpoints/aglStoredPaymentApi/index';
import { SiteCoreWebsite } from './endpoints/siteCoreWebsite';
import { SolarCheckApi } from './endpoints/aglSolarCheckApi';
import { DecisioningApi } from './endpoints/aglDecisioningApi/index';
import { RedlineApi } from './endpoints/aglRedLineApi';
import { ProductApi } from './endpoints/aglProductApi/index';
import { RewardsApi } from './endpoints/aglRewardsApi/index';
import { PersonalisationApi } from './endpoints/aglPersonalisationApi/index';
import { PaymentSchemeApi } from './endpoints/aglPaymentSchemeApi/index';
import { ConcessionApi } from './endpoints/aglConcessionApi';
import { EnergyInsightsApi } from './endpoints/aglEnergyInsightsApi';
import { HomeProfileApi } from './endpoints/aglHomeProfileApi';
import { ConfigApi } from './endpoints/configApi';
import { MockDelayMiddleware } from './middleware/mockDelayMiddleware';
import './common/styledConsole';

export interface IMockServer {

    start(listeningPort: number, result: (result: boolean) => void): void;
    server(): https.Server;

}

@injectable()
export class MockServer implements IMockServer {

    public app: express.Application;

    public router: express.Router;
    private _server: https.Server;

    constructor(
    ) {

        this.app = express();
        console.log(`AGL - NodeJS Express Mocking Server`);
        console.log(`

                        \`.-.
                        .:++        \`
                        .osy\`      :/-.
            \`\`.\`        \`syy-     :so+\`
            .://-        syy/    -yyy:
                -+sso-      +yys   \`syy+    \`\`\`
                \`/syy+\`    :yyy\`  oyys\`  \`-o+/.
                -oyys:\`  .yhh. :hhy. \`-oyys:\`
                    :syys-  .-.  \`::. \`syys/\`
                    \`+yhy.            /o/.
                        .-.
            \`\`\`\`\`\`
            .:/oosssoo+/:\`
            \`.-:/++ossyhh:
                    \`\`\`\`\`
        `);

        this.configure();
        this.registerRoutes();
        this.handleErrors();
    }

    public start(listeningPort: number, result: (isRunning: boolean, port: number) => void): void {

        let certFileKey = path.join(__dirname, '../ssl/server.key');
        let certFilePem = path.join(__dirname, '../ssl/server.crt');

        this._server = https.createServer(
            {
                key: fs.readFileSync(certFileKey),
                cert: fs.readFileSync(certFilePem)
            }, this.app);

        this._server.on(`error`, (e: any) => {
            if (e.code === 'EADDRINUSE') {
                console.error(`ADDRESS IS IN USE. Port: ${listeningPort}`);
                result(false, listeningPort);
            }
        });

        this._server.listen(listeningPort, () => {
            console.log(`\nListening on:\n\nhttps://localhost:${listeningPort}`);
            if (result) {
                result(true, listeningPort);
            }
        });

    }

    public server(): https.Server {
        return this._server;
    }

    private configure() {

        this.app.locals.title = `AGL Mock Server`;
        this.app.set('etag', false); // Disables etag, otherwise the server will sometimes cache - https://en.wikipedia.org/wiki/HTTP_ETag

        // Defines a custom mock server config object that we can use to configure certain aspects of the server
        // TODO: Make this a strongly typed model of available config options
        this.app.locals.mockConfig = {
            fakeDelayMs: MockDelayMiddleware.defaultDelayMs,
            uploadsFolder: path.join(__dirname, 'uploads')
        };

        console.log(`Configuration Settings:`);
        Object.keys(this.app.locals.mockConfig).forEach(
            (key, index) => {
                console.log(`\t${key}: ${this.app.locals.mockConfig[key]}`);
            }
        );

        // These imports allow us to do form uploads (multipart form data)
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let now = new Date().toLocaleTimeString();
            console.log(``);
            console.log(`${now}:`);
            console.log(`${req.method} ${req.url}`);
            next();
        });

        this.app.use(MockDelayMiddleware.invoke);

        // Initialise the customer cache
        this.app.locals['customercache'] = {};

        // Use the determineCustomer Middleware layer to determine the customer's NAME_ID
        this.app.use(Customer.identify);

        // Use the Customer Cache Middleware layer
        this.app.use(CustomerCache.do);
        this.app.use(Cors.ApplyPolicy);

        this.app.use(fileUpload());
        this.app.use(express.static(path.join(__dirname, '_mockData')));

    }

    private registerRoutes() {

        console.log(`Registering routes.`);

        let webApi: WebApi = new WebApi();
        let moveAndJoinApi: MoveAndJoinApi = new MoveAndJoinApi();
        let settingsApi: SettingsApi = new SettingsApi();
        let storedPaymentsApi: StoredPaymentsApi = new StoredPaymentsApi();
        let siteCoreWebsite: SiteCoreWebsite = new SiteCoreWebsite();
        let solarCheckApi: SolarCheckApi = new SolarCheckApi();
        let decisioningApi: DecisioningApi = new DecisioningApi();
        let redlineApi: RedlineApi = new RedlineApi();
        let productApi: ProductApi = new ProductApi();
        let rewardsApi: RewardsApi = new RewardsApi();
        let personalisationApi: PersonalisationApi = new PersonalisationApi();
        let paymentSchemeApi: PaymentSchemeApi = new PaymentSchemeApi();
        let concessionApi: ConcessionApi = new ConcessionApi();
        let energyInsightsApi: EnergyInsightsApi = new EnergyInsightsApi();
        let homeProfileApi: HomeProfileApi = new HomeProfileApi();
        let configApi: ConfigApi = new ConfigApi();

        this.app.use('/aglWebApi', webApi.registerRoutes());
        this.app.use('/aglMoveAndJoinApi', moveAndJoinApi.registerRoutes());
        this.app.use('/aglSettingsApi', settingsApi.registerRoutes());
        this.app.use('/siteCoreWebsite', siteCoreWebsite.registerRoutes());
        this.app.use('/aglSolarCheckApi', solarCheckApi.registerRoutes());
        this.app.use('/aglDecisioningApi', decisioningApi.registerRoutes());
        this.app.use('/aglRedlineApi', redlineApi.registerRoutes());
        this.app.use('/aglProductApi', productApi.registerRoutes());
        this.app.use('/aglRewardsApi', rewardsApi.registerRoutes());
        this.app.use('/aglPersonalisationApi', personalisationApi.registerRoutes());
        this.app.use('/aglPaymentSchemeApi', paymentSchemeApi.registerRoutes());
        this.app.use('/aglEnergyInsightsApi', energyInsightsApi.registerRoutes());
        this.app.use('/aglConcessionApi', concessionApi.registerRoutes());
        this.app.use('/aglHomeProfileApi', homeProfileApi.registerRoutes());
        this.app.use('/config', configApi.registerRoutes());

        console.log(`Route registration complete.`);

    }

    private handleErrors() {

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Internal Server Error: ' + err.stack);
            next();
        });

    }
}
