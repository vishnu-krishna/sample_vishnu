import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FuelChipDataModel } from '../models';
import { EligibleFuelChipFilterService, AlreadyExtendedFuelChipFilterService, IneligibleFuelChipFilterService } from './fuelChipFilter';
import { Subscriber } from 'rxjs';

export abstract class IFuelChipClassificationService {
    public abstract classify(fuelChipDetails: FuelChipDataModel[]): Observable<ClassifiedFuelChips>;
}

@Injectable()
export class FuelChipClassificationService implements IFuelChipClassificationService {
    constructor(private eligibleFuelChipFilterService: EligibleFuelChipFilterService,
                private alreadyExtendedFuelChipFilterService: AlreadyExtendedFuelChipFilterService,
                private ineligibleFuelChipFilterService: IneligibleFuelChipFilterService) {
    }

    public classify(fuelChipDetails: FuelChipDataModel[]): Observable<ClassifiedFuelChips> {
        return new Observable((observer: Subscriber<ClassifiedFuelChips>) => {
            Observable.forkJoin(
                this.eligibleFuelChipFilterService.filter(fuelChipDetails),
                this.alreadyExtendedFuelChipFilterService.filter(fuelChipDetails),
                this.ineligibleFuelChipFilterService.filter(fuelChipDetails))
                .subscribe(
                ([
                    eligibleFuelChips,
                    alreadyExtendedFuelChips,
                    ineligibleFuelChips
                ]) => {
                    observer.next(new ClassifiedFuelChips(
                        eligibleFuelChips,
                        alreadyExtendedFuelChips,
                        ineligibleFuelChips
                    ));
                    observer.complete();
                });
        });
    }

}

export class ClassifiedFuelChips {
    constructor(public eligibleFuelChips: FuelChipDataModel[],
                public alreadyExtendedFuelChips: FuelChipDataModel[],
                public ineligibleFuelChips: FuelChipDataModel[]) {
    }
}
