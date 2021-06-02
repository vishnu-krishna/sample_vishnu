/*
    Please read the below descriptions to remove any confusion around 'monthly billing'
*/
export enum BillingFrequencyType {

    // FlexibleMonthly is the billing frequency type for the 'Monthly Billing' feature of MyAccount.
    FlexibleMonthly = <any> 'FlexibleMonthly',
    // This monthly billing is network driven and does NOT indicate that the customer's contract' 'Monthly Billing'
    Monthly = <any> 'Monthly',
    BiMonthly = <any> 'BiMonthly',
    Quarterly = <any> 'Quarterly'

}
