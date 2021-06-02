export class MoveOutDetails {
    public moveoutSelected: boolean;
    public date: string;
    public address: string;
    public contractAccount: string;
    public contracts: any[];
    constructor() {
        this.contracts = [];
        this.moveoutSelected = false;
    }
}

export class Fuel {
    public connect: boolean = true;
    public rateFactGroup: string;
    public isAvailable: boolean = true;
}

export class Address {
    public floorNumber: string;
    public unitNumber: string;
    public streetNumber: string;
    public streetName: string;
    public suburb: string;
    public postCode: string;
    public state: string;
    constructor() {
        this.unitNumber = ' ';
        this.floorNumber = ' ';
    }
}

export class QuickAddressSystemData {
    public longitude: number;
    public latitude: number;
    public deliveryPointId: string;
    constructor() {
        this.deliveryPointId = ' ';
    }
}

export class MoveInDetails {
    public date: string;
    public electricity: Fuel;
    public gas: Fuel;
    public address: Address;
    public displayAddress: string;
    public quickAddressSystemData: QuickAddressSystemData;
    public appointmentSlot: string;
    constructor() {
        this.electricity = new Fuel();
        this.gas = new Fuel();
        this.address = new Address();
        this.quickAddressSystemData = new QuickAddressSystemData();
    }
}

export class AdditionalDetails {
    public dateOfBirth: string;
    constructor() {
        this.dateOfBirth = ' ';
    }
}

export class Omm {
    public requestType: string;
    public moveOutDetails: MoveOutDetails;
    public moveInDetails: MoveInDetails;
    public additionalDetails: AdditionalDetails;
    constructor() {
        this.requestType = 'MoveIn';
        this.moveOutDetails = new MoveOutDetails();
        this.moveInDetails = new MoveInDetails();
        this.additionalDetails = new AdditionalDetails();
    }
}

export class OmmSubmitModel {
    public csrEmail: string;
    public customerEmail: string;
    public customerFirstName: string;
    public customerLastName: string;
    public omm: Omm;
    constructor() {
        this.omm = new Omm();
    }
}

export class OmmSubmitData {
    public ommSubmitModel: OmmSubmitModel;
    constructor() {
        this.ommSubmitModel = new OmmSubmitModel();
    }
}
