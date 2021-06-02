import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';

import { FuelChipData } from '../fuelChipData';
import { AlreadyExtendedFuelChipFilterService } from './alreadyExtendedFuelChipFilter.service';
import { EligibleFuelChipFilterService } from './eligibleFuelChipFilter.service';
import { IneligibleFuelChipFilterService } from './ineligibleFuelChipFilter.service';
import { NoIssuedBillFuelChipFilterService } from './noIssuedBillFuelChipFilter.service';

export abstract class IFuelChipClassificationService {
    public abstract classify(fuelChipDetails: FuelChipData[]): Observable<ClassifiedFuelChips>;
}

@Injectable()
export class FuelChipClassificationService implements IFuelChipClassificationService {
    constructor(private eligibleFuelChipFilterService: EligibleFuelChipFilterService,
                private alreadyExtendedFuelChipFilterService: AlreadyExtendedFuelChipFilterService,
                private ineligibleFuelChipFilterService: IneligibleFuelChipFilterService,
                private noIssuedBillFuelChipFilterService: NoIssuedBillFuelChipFilterService) {
    }

    public classify(fuelChipDetails: FuelChipData[]): Observable<ClassifiedFuelChips> {
        return new Observable((observer: Subscriber<ClassifiedFuelChips>) => {
            Observable.forkJoin(
                this.eligibleFuelChipFilterService.filter(fuelChipDetails),
                this.alreadyExtendedFuelChipFilterService.filter(fuelChipDetails),
                this.ineligibleFuelChipFilterService.filter(fuelChipDetails),
                this.noIssuedBillFuelChipFilterService.filter(fuelChipDetails))
                .subscribe(
                ([
                    eligibleFuelChips,
                    alreadyExtendedFuelChips,
                    ineligibleFuelChips,
                    noIssuedBillFuelChips
                ]) => {
                    observer.next(new ClassifiedFuelChips(
                        eligibleFuelChips,
                        alreadyExtendedFuelChips,
                        ineligibleFuelChips,
                        noIssuedBillFuelChips
                    ));
                    observer.complete();
                });
        });
    }

}

export class ClassifiedFuelChips {
    constructor(public eligibleFuelChips: FuelChipData[],
                public alreadyExtendedFuelChips: FuelChipData[],
                public ineligibleFuelChips: FuelChipData[],
                public noIssuedBillFuelChips: FuelChipData[]) {
    }
}
