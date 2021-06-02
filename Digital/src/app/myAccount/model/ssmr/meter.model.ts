import { RegisterViewModel } from './register.model';

export class MeterViewModel {
    public meterSerial: string;
    public registers: RegisterViewModel[];
    constructor() {
        this.registers = [];
    }
}
