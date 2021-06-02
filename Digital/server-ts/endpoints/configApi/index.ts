import { Response, Request, NextFunction, Router } from 'express';

import { IMockApi } from './../IMockApi';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { DirectDebitDynamicMock } from './directDebitDynamicMock';

export class ConfigApi implements IMockApi {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    registerRoutes(): express.Router {
        this.router.route('/fakeDelay').get((req, res) => {
            res
                .status(200)
                .json({ value: req.app.locals.mockConfig.fakeDelayMs });
        });

        this.router.route('/fakeDelay/:milliseconds').get((req, res) => {
            const newDelay = parseInt(req.params['milliseconds'], 0);
            if (newDelay >= 0 && newDelay <= 60000) {
                req.app.locals.mockConfig.fakeDelayMs = newDelay;
                res
                    .status(200)
                    .json({ value: req.app.locals.mockConfig.fakeDelayMs });
            } else {
                res.status(400).send('Value out of range. (0-60000)');
            }
        });

        this.router.route('/reset').get((req, res) => {
            req.app.locals['customercache'] = {};
            res.status(200).send();
        });

        this.router.route('/directDebit/:onOff').post((req: express.Request, res: express.Response) => {
            let enableDirectDebit = req.params.onOff === 'on';

            return new DirectDebitDynamicMock().apply(enableDirectDebit, req, res);
        });

        return this.router;
    }
}
