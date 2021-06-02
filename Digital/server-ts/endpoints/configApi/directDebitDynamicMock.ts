import * as express from 'express';
import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/delay';

import { ApiDirectDebitSaveModel } from './../../../src/app/shared/model/domain/resultWrapper/apiDirectDebit.model';
import { AccountApiModel } from '../../../src/app/shared/service/api.service';
import { PaymentMethod } from '../../../src/app/myAccount/services/settings/model/paymentMethod';

export class DirectDebitDynamicMock {
    public apply(enableDirectDebit: boolean, req: express.Request, res: express.Response): void {
        enableDirectDebit ? this.enableDirectDebit(req, res) : this.disableDirectDebit(req, res);
    }

    private enableDirectDebit(req: express.Request, res: express.Response) {
        this.getExistingDirectDebitAccounts(req)
            .toArray()
            .flatMap((existingDirectDebitDetails: DirectDebitDetails[]) => {
                return this.getContactAccountNumbers(req, existingDirectDebitDetails);
            })
            .flatMap((contractAccNum: number) => {
                let enableBody = <ApiDirectDebitSaveModel> {
                    directDebitContractAccount: +contractAccNum, // must be explicitly converted to a number
                    creditCard: null,
                    bank: {
                        accountHolderName: 'Dr Dynamic Mock',
                        accountNumber: this.createRandomBankAccountNumber(),
                        bsb: '013-013'
                    },
                    paypal: null
                };
                return this.postPaymentMethod(req, enableBody);
            })
            .every((postResult: boolean) => postResult)
            .map((allPostResults: boolean) => {
                if (!allPostResults) {
                    throw new Error('Some POSTS to setup DD failed');
                }
            })
            .subscribe(() => {
                res.status(200).send('DD enabled on all contract accounts');
            }, (err) => {
                res.status(500).send('Unable to enable DD on all contract accounts:' + err);
            });
    }

    private disableDirectDebit(req: express.Request, res: express.Response) {
        this.getExistingDirectDebitAccounts(req)
            .flatMap((directDebitDetails: DirectDebitDetails) => {
                return this.deletePaymentMethod(req, directDebitDetails.id, directDebitDetails.contractAccountNumber);
            })
            .every((deleteResult: boolean) => deleteResult)
            .map((allDeleteResults: boolean) => {
                if (!allDeleteResults) {
                    throw new Error('Some DELETEs to cancel DD failed');
                }
            })
            .subscribe(() => {
                res.status(200).send('DD disabled on all contract accounts');
            }, (err) => {
                res.status(500).send('Unable to disable DD on all contract accounts:' + err);
            });
    }

    private getContactAccountNumbers(req: express.Request, existingDirectDebitDetails: DirectDebitDetails[]): Observable<number> {
        return new Observable<number>((observer: Observer<number>) => {

            let options: request.CoreOptions = this.createBaseCoreOptions(req);

            request.get('aglWebApi/api/accounts/list', options, (error, response: request.RequestResponse) => {
                if (error) {
                    observer.error(error);
                    return;
                } else if (response.statusCode === 200) {
                    let accounts: AccountApiModel[] = JSON.parse(response.body);
                    accounts.filter((ca) => !existingDirectDebitDetails.some((d) => d.contractAccountNumber === +ca.number))
                            .forEach((ca) => observer.next(+ca.number));
                }
                observer.complete();
            });
        });
    }

    private getExistingDirectDebitAccounts(req: express.Request): Observable<DirectDebitDetails> {
        return new Observable<DirectDebitDetails>((observer: Observer<DirectDebitDetails>) => {

            let options: request.CoreOptions = this.createBaseCoreOptions(req);

            request.get('aglSettingsApi/v2/paymentmethods', options, (error, response: request.RequestResponse) => {
                if (error) {
                    observer.error(error);
                    return;
                } else if (response.statusCode === 200) {
                    let paymentMethods: PaymentMethod[] = JSON.parse(response.body);
                    paymentMethods.forEach((paymentMethod) => {
                        paymentMethod.directDebitContractAccounts.forEach((accountNum) => {
                            observer.next(new DirectDebitDetails(paymentMethod.id, accountNum));
                        });
                    });
                }
                observer.complete();
            });
        });
    }

    private deletePaymentMethod(req: express.Request, id: number, contractAccountNumber: number): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            let options: request.CoreOptions = this.createBaseCoreOptions(req);
            request.delete(`aglSettingsApi/v2/paymentmethods/${id}/directDebitContractAccounts/${contractAccountNumber}`, options, (error) => {
                if (error) {
                    observer.error(error);
                    return;
                }
                observer.next(true);
                observer.complete();
            });
        });
    }

    private postPaymentMethod(req: express.Request, enableDDBody: any): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            let options: request.CoreOptions = this.createBaseCoreOptions(req);
            options.body = enableDDBody;
            options.json = true;

            request.post('aglSettingsApi/v2/paymentmethods', options, (error) => {
                if (error) {
                    observer.error(error);
                    return;
                }
                observer.next(true);
                observer.complete();
            });
        });
    }

    private createBaseCoreOptions(req: express.Request): request.CoreOptions {
        return {
            baseUrl: req.protocol + '://' + req.get('host'),
            headers: this.copyHeaders(req),
            strictSSL: false, // ignore self signed cert error
        };
    }

    private copyHeaders(req: express.Request): request.Headers {
        let headers: request.Headers = {};
        Object.keys(req.headers).forEach((key) => {
            headers[key] = req.headers[key];
        });

        delete headers['content-length']; // remove as this will change on a per request basis

        return headers;
    }

    private createRandomBankAccountNumber(): string {
        return Math.trunc(Math.random() * 10000000000).toString();
    }
}

class DirectDebitDetails {
    constructor(public readonly id: string,
                public readonly contractAccountNumber: number) {
    }
}
