import { AccountApiModel } from './../../../shared/service/api.service';
export class MockCustomer {

    public businessPartnerNumber: string;
    public nameId: string;
    public title: string;
    public description: string;
    public tags: string[];
    public emailAddress: string;
    public environment: string;
    public ommDescription: string;
    public accounts: AccountApiModel[];
    public attributes: any;

    // Calculated and added from accounts data
    public hasElecContract: boolean;
    public hasGasContract: boolean;

    public hasInflight: boolean;
    public hasRestricted: boolean;

    // True if the customer has an account that has 1 contract
    public hasSingleContract: boolean;
    // True if the customer has an account that has more than 1 contract
    public hasMultiContract: boolean;
    // True if the customer has an EV contract
    public hasEvContract: boolean;
    // True if the customer has a solar contract
    public hasSolarContract: boolean;

}
