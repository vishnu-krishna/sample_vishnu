export class ConcessionCard {
    public readonly uniqueKey: string;

    public get iconName(): string {
        let knownIconCodes = [ // These match the list of svg files registered in myAccount.component.ts
            'ctlk-healthcare',
            'ctlk-pensioner',
            'dva-pensioner',
            'dva-gold-eda',
            'dva-gold-tpi',
            'dva-gold-ww',
            'doi-immi',
            'qdc-qsc-gov'
        ];

        let iconCode = `${this.issuerCode}-${this.cardCode}`.replace('_', '-').toLowerCase();
        if (knownIconCodes.includes(iconCode)) {
            return `icon-concession-${iconCode}`;
        }
        return 'icon-concession-unknown';
    }

    public get eligibleFuelTypes(): string[] {
        return this.eligibleFuels;
    }

    public isEligibleForAllSelectedFuels(selectedFuelTypes: string[]): boolean {
        // true if all of the eligible fuel types match those passed in
        return this.eligibleFuels.filter((ef) =>
                selectedFuelTypes.map((ft) => ft.toLowerCase()).indexOf(ef.toLowerCase()) !== -1).length === selectedFuelTypes.length;
    }

    constructor(public readonly issuerCode: string,
                public readonly issuerDescription: string,
                public readonly cardCode: string,
                public readonly cardDescription: string,
                private eligibleFuels: string[]) {
        this.uniqueKey = `${issuerCode}|${cardCode}`;
    }
}
