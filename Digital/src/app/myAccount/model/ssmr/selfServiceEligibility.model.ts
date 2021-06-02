import { ErrorViewModel } from './error.model';
import { MeterViewModel } from './meter.model';

export class SelfServiceEligibilityViewModel {
    public screenCode: string;
    public meters: MeterViewModel[];
    public error: ErrorViewModel;
    constructor() {
        this.meters = [];
    }
}
