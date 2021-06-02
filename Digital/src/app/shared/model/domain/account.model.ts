export class AccountModel {
    public accountNumber: string;
    public verificationIndex: number;
    public customerType: string;
    public nameAsOnBill: string;
    public dob: string;
    public abn: string;
    public acn: string;
    public drivingLicenseNumber: string;
    public medicareNumber?: any;
    public passportNumber?: any;
    public phoneNumber: string;
    public verifcationIdType: string;
    public isAccountNumberValid: boolean;
    public isVerified: boolean;
    public emailId: string;
    public isAEOEnabled: boolean;
    public isCniCustomer: boolean;
}
