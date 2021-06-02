import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';

import * as apiModel from '../../../../services/concession/concessionApi.service';
import { IBusinessPartnerNumberService } from '../../../../services/contract/ibusinessPartnerNumber.service';
import { IAccountServiceMA, AccountViewModel } from '../../../../services/account.service';
import { ContactDetailModel, InternalErrorApiModel } from '../../../../../shared/service/api.service';
import { IApiService } from '../../../../../shared/service/contract/iapi.service';
import { ConcessionStatus, UnknownConcessionStatus, ConcessionNotAppliedFor, ConcessionRejected, ConcessionApplied, ConcessionRejectedReasons } from './concessionStatus';
import { IneligibleForConcession } from './concessionStatus';

export abstract class IConcessionStatusService {
    public abstract canApplyForConcession(): Observable<boolean>;
    public abstract fetchConcessionStatusDetails(): Observable<ConcessionStatus>;
}

@Injectable()
export class ConcessionStatusService implements IConcessionStatusService {

    constructor(private concessionApiService: apiModel.IConcessionApi,
                private apiService: IApiService,
                private accountService: IAccountServiceMA) {
    }

    public canApplyForConcession(): Observable<boolean> {
        return this.fetchConcessionStatusDetails().map((status) => {
            if (status instanceof ConcessionRejected) {
                return status.canApplyAgain;
            }
            return (status instanceof ConcessionNotAppliedFor);
        });
    }

    public fetchConcessionStatusDetails(): Observable<ConcessionStatus> {
        return new Observable((observer: Observer<ConcessionStatus>) => {
            Observable.forkJoin(
                this.accountService.hasAnyContractInRegionId(''),
                this.accountService.hasAnyContractInRegionId('WA'),
                this.accountService.hasAnyContractInRegionId('SA')
            )
            .map(([hasEmptyRegionId, isInWA, isInSA]) => {
                if (hasEmptyRegionId) {
                    throw new Error('Contract regions are blank');
                }
                return [isInWA, isInSA];
            })
            .subscribe(([isInWA, isInSA]) => {
                if (isInSA) {
                    this.completeWithStatus(observer, new IneligibleForConcession(true, false));
                } else {
                    this.apiService.getContactDetail().subscribe((contactDetails: ContactDetailModel) => {
                        if (contactDetails.hasMultipleBusinessPartners) {
                            this.completeWithStatus(observer, new IneligibleForConcession(false, true));
                        } else {
                            let bpId = contactDetails.businessPartners[0].businessPartnerNumber;
                            this.resolvedConcessionStatus(bpId, observer, isInWA);
                        }
                    }, (err) => {
                        console.error('Error fetching contact details', err);
                        this.completeWithStatus(observer, new UnknownConcessionStatus());
                    });
                }
            }, (err) => {
                console.error('Error fetching account information', err);
                this.completeWithStatus(observer, new UnknownConcessionStatus());
            });
        });
    }

    private resolvedConcessionStatus(bpId: string, observer: Observer<ConcessionStatus>, isInWA: boolean): void {
        this.concessionApiService.getConcessionStatus(bpId).subscribe((concessionStatus: apiModel.ConcessionStatus) => {
            if (!concessionStatus.cardAvailable) {
                this.completeWithStatus(observer, new ConcessionNotAppliedFor());
            } else if (concessionStatus.concessionCard.error) {
                this.resolvedConcessionRejectedStatus(concessionStatus.concessionCard.error.internalError, observer);
            } else if (concessionStatus.concessionCard.cardNumber) {
                this.completeWithStatus(observer, new ConcessionApplied(concessionStatus.concessionCard.cardNumber, concessionStatus.concessionCard.cardName, isInWA));
            }
        }, (err) => {
            console.error(`Error fetching concession status information`, err);
            this.completeWithStatus(observer, new UnknownConcessionStatus());
        });
    }

    private resolvedConcessionRejectedStatus(internalError: InternalErrorApiModel, observer: Observer<ConcessionStatus>): void {
        const emptyErrorNumber = 999;
        let errorNumber = internalError ? Number(internalError.errorNumber || emptyErrorNumber) : emptyErrorNumber;

        const errorMap = {
            100: new ConcessionRejected(ConcessionRejectedReasons.DetailsDidNotMatch, false),
            101: new ConcessionRejected(ConcessionRejectedReasons.CouldNotBeValidated, false),
            102: new ConcessionRejected(ConcessionRejectedReasons.IsIneligible, true),
            103: new ConcessionRejected(ConcessionRejectedReasons.IsInvalid, true)
        };
        let result = errorMap[errorNumber] || new UnknownConcessionStatus();

        this.completeWithStatus(observer, result);
    }

    private completeWithStatus(observer: Observer<ConcessionStatus>, status: ConcessionStatus): void {
        observer.next(status);
        observer.complete();
    }
}
