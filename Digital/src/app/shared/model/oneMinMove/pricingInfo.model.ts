export interface PricingInfoModel {
    rateCategory: string;
    rateTypeIns: string;
    rfgIns: string;
    rateTypeReg: string;
    rfgReg: string;
    rate: string;
    priceKey: string;
    validFromPrice: string;
    validToPrice: string;
    fromBlock: string;
    toBlock: string;
    priceAmt: number;
    iom: string;
    priceDescCode: string;
    priceDesc: string;
    footnoteId: number;
    footnoteOrd: number;
    footnoteDesc1: string;
    footnoteDesc2: string;
    timeBasis: string;
    tbFootnote1: string;
    tbFootnote2: string;
}
