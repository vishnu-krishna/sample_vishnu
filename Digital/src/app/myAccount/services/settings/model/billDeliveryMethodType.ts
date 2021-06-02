//  P: Paper
//  PL: Paperless
//  BV: BPayView
//  NA: N/A

// TODO: Removing <any> causes the old settings.service methods to fail.
// Take the <any> out when the old eBill implementation is completely deprecated
export enum BillDeliveryMethodType {
    Email           =   <any> 'Email',
    Postal          =   <any> 'Postal',
    BPayView        =   <any> 'BPayView',
    NotApplicable   =   <any> 'NotApplicable'
}
