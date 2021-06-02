import * as express from 'express';

/*
    Middleware filters that allow filtering and validation of requests.
*/
export class Filters {

    /*
        Ensure that a contract account number is present, and is a valid number
    */
    public static ValidateAccountNumber(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req && req.params && req.params.contractAccountNumber) {
            let accountNumber: number = Number(req.params.contractAccountNumber);
            if (isNaN(accountNumber)) {
                console.error(`Account Number is invalid: '${accountNumber}`);
                res.status(400).send();
                return;
            }
        }
        next();
    }

    /*
        Ensure that a contract number is present, and is a valid number
    */
    public static ValidateContractNumber(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req && req.params && req.params.contractNumber) {
            let contractNumber: number = Number(req.params.contractNumber);
            if (isNaN(contractNumber)) {
                console.error(`Contract Number is invalid: '${contractNumber}`);
                res.status(400).send();
                return;
            }
        }
        next();
    }

}
