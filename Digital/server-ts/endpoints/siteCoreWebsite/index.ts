import { NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';
import { IMockApi } from '../IMockApi';

// These are a mock functions to call the AEO endpoints.

export class SiteCoreWebsite implements IMockApi {

    private router: Router;
    private siteCoreMediaFolder = path.join(__dirname, '..', '..', 'siteCoreMedia');

    constructor() {

        this.router = express.Router();

    }

    public registerRoutes(): Router {

        this.router.route('/sts/account/logout')
            .get((req, res) => {
                let body = `<h1>LOGOUT Page</h1><p>This page represents the 'logout' flow of the website. You most likely arrived here due to
                a 401 Unauthorised response. Please make sure you select a mock user <a href="https://localhost:8080/mockidentity">https://localhost:8080/mockidentity</a></p>`;
                res.status(200).send(body);
            });

        this.router.route('/sts/account/login')
            .get((req, res) => {
                let body = `<h1>LOGIN Page</h1><p>This page represents the 'login' flow of the website. You most likely arrived here due to
                a 401 Unauthorised response. Please make sure you select a mock user <a href="https://localhost:8080/mockidentity">https://localhost:8080/mockidentity</a></p>`;
                res.status(200).send(body);
            });

        this.router.route('/svc/MyAccount/GetProfile')
            .get((req, res) => {
                res.status(200).send('GetProfile');
            });

        this.router.route('/svc/MyAccount/GetCustomerMessages')
            .get((req, res) => {
                res.status(200).send('GetCustomerMessages');
            });

        this.router.route('/svc/app/HeartBeat')
            .get((req, res) => {
                res.status(200).send('dud dum');
            });

        this.router.route('/svc/app/IsLightMode')
            .get((req, res) => {
                let isLightMode = false;
                res.status(200).send(isLightMode);
            });

        this.router.route('/-/media/AGL/SelfService/*')
            .get((req, res) => {
                let filePath = req.path;
                filePath = filePath.replace('/-/media/AGL/SelfService/', '');
                console.log(`Loading file: ${filePath}`);
                res.sendFile(path.join(__dirname, '..', '..', 'siteCoreMedia', filePath));
            });

        this.router.route(`/svc/MyUsage/DownloadConsumptionCSV`)
            .get((req, res) => {
                let sampleUsageFile = path.join(__dirname, '..', '..', 'samples', '\\') + 'sample-usage-data.csv';
                console.log(sampleUsageFile);
                res.download(sampleUsageFile, 'sample-usage-data.csv');
            });

        return this.router;
    }

}
