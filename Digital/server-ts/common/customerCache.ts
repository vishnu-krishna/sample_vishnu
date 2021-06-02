import * as path from 'path';
import { Response, Request, NextFunction } from 'express';

import { CacheManager } from './cacheManager';
import { FileOperations } from './fileOperations';

export class CustomerCache {

    public static do(req: Request, res: Response, next: NextFunction) {

        const rootFolder: string = '../_mockData/users';

        if (req['nameId']) {

            let absoluteFolder = path.join(__dirname, rootFolder);
            let targetFile = path.join(absoluteFolder, req['nameId'], `aglWebApi/api/accounts/list`, `response.json`);

            if (!req.app.locals['customercache'][req['mockServerSessionId']]) {
                req.app.locals['customercache'][req['mockServerSessionId']] = {};
            }

            // Ensure that this customer has a in-memory cache
            if (!req.app.locals['customercache'][req['mockServerSessionId']][req['nameId']]) {

                // Create a cache item for this customer
                req.app.locals['customercache'][req['mockServerSessionId']][req['nameId']] = {};

                // Get their account details
                let result = FileOperations.loadFile(targetFile);
                if (result) {
                    let accountCacheKey = `accounts-list`;
                    CacheManager.saveItem(req, accountCacheKey, result);
                } else {
                    console.error(`No Accounts for this customer!`);
                }
            }
        }

        next();

    }

}
