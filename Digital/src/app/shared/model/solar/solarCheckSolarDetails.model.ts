export class SolarCheckSolarDetailsType {

    public numberPanels: number;
    public systemSizeKw: number;
    public installationYear: number;

    constructor() {
        this.numberPanels = null;
        this.systemSizeKw = null;
        this.installationYear = null;
    }
}

export class SolarCheckSolarDetailsUpdateType extends SolarCheckSolarDetailsType {
    public systemChanged: boolean;
    public effectiveChangedDate: string;
}
