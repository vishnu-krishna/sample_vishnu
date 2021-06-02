import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';

import { ErrorApiModel } from './../../../../../shared/service/api.service';
import { SaveConcessionRequest } from './../../../../services/concession/concessionApi.service';
import { IConcessionApi } from '../../../../services/concession/concessionApi.service';
import { Concession } from '../concession';

export abstract class IConcessionApplicationService {
    public abstract submit(concession: Concession): Observable<SubmissionResult>;
}

export enum SubmissionResult {
    Success,
    InvalidCardFormat,
    CardAlreadyInUse,
    CardFromDifferentRegionId,
    UnknownError
}

@Injectable()
export class ConcessionApplicationService implements IConcessionApplicationService {
    constructor(private concessionApi: IConcessionApi) {
    }

    public submit(concession: Concession): Observable<SubmissionResult> {
        let request = new SaveConcessionRequest(concession.cardNumber,
                                                concession.selectedCard.issuerCode,
                                                concession.selectedCard.cardCode,
                                                concession.contractNumbers);

        return new Observable<SubmissionResult>((observer: Observer<SubmissionResult>) => {
            this.concessionApi.saveConcession(concession.businessPartnerNumber, request)
                .subscribe((internalErrorErrorNumber: number) => {
                    let result = this.mapToSubmissionResult(internalErrorErrorNumber);
                    observer.next(result);
                    observer.complete();
                },
                (err) => {
                    observer.next(SubmissionResult.UnknownError);
                    observer.complete();
                });
        });
    }

    private mapToSubmissionResult(internalErrorErrorNumber: number) {
        const errorMap = {
            0: SubmissionResult.Success,
            1: SubmissionResult.InvalidCardFormat,
            2: SubmissionResult.CardAlreadyInUse,
            3: SubmissionResult.CardFromDifferentRegionId
        };
        let result = errorMap[internalErrorErrorNumber];
        return result !== undefined ? result : SubmissionResult.UnknownError; // check for undefined as one of the results (0/Success) is falsy
    }
}
