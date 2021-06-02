import { MauiFuelChipFuelType, MauiSecondaryMessageStatusType } from './fuelChip.component.enum';

export class PrimaryMessageLink {

    constructor(public key: string,
                public title: string
    ) { }
}

export class FuelChipMessage {

    constructor(public primaryMessage: string,
                public primaryMessageLink?: PrimaryMessageLink ,
                public secondaryMessage?: string,
                public secondaryMessageStatus?: MauiSecondaryMessageStatusType
    ) { }
}

export class FuelChipContract  {

    constructor(public contractNumber: string,
                public address: string,
                public fuelType: MauiFuelChipFuelType,
                private regionId: string
    ) { }

    public get IsVicRegion(): boolean {
        if (this.regionId === 'VIC') {
            return true;
        } else {
            return false;
        }
    }
}

export class FuelChipContractAccountDetails  {

    constructor(public accountNumber: string,
                public contracts: FuelChipContract []
    ) { }
}
