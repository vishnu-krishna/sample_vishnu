import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { BillHistoryApiModel, BillApiModel } from '../../../src/app/shared/service/api.service';
import { Filters } from '../../middleware/filters';
import { PrintDocMappings } from '../../../src/app/shared/service/redLineApi.service';

/*
BASED UPON https://redline.api.agl.com.au/swagger/ui/index
*/

export class RedlineApi implements IMockApi {

    private router: Router;
    private hostKey = `aglRedlineApi/api`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/bills/contract/:contractNumber')
            .get(Filters.ValidateContractNumber, (req: express.Request, res: express.Response) => {
                let contract: string = req.params.contractNumber;
                let dataLoad = FileOperations.loadDataFromDiskForEndpoint(req, res, path.join(`aglWebApi`, `api`, `v1`, `bills`));
                if (dataLoad) {
                    let billsHistoryData: BillHistoryApiModel[] = dataLoad.body;
                    let billsForContract: BillHistoryApiModel = billsHistoryData.find((bills) => bills.contract === contract);
                    if (billsForContract) {
                        let redlineData: PrintDocMappings[] = billsForContract.bills
                            .map((bill: BillApiModel) => {
                                let docMapping: PrintDocMappings = new PrintDocMappings();
                                docMapping.SapPrintDoc = bill.printDoc;
                                docMapping.FxPrintDoc = `1${bill.printDoc}`; // Fake print doc ID
                                return docMapping;
                            });
                        res.status(200).json(redlineData);
                        return;
                    }
                }
                res.status(404).json({});
            });

        this.router.route('/v1/bills/pdf/:contractNumber/:printDoc')
            .get(Filters.ValidateContractNumber, (req: express.Request, res: express.Response) => {
                res.status(200).send();
            });

        return this.router;
    }

}
