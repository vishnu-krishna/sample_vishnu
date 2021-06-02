export enum MauiFuelChipState {
    PreSetup,
    PostSetupComplete,
    PostSetupManage,
    Ineligible,
    Display,
}

export enum MauiFuelChipFuelType {
    Electricity = <any> 'Electricity',
    Gas = <any> 'Gas'
}

export enum MauiFuelChipFuelContext {
    Bill = <any> 'bill',
    Meter = <any> 'meter',
    None = <any> ''
}

export enum MauiSecondaryMessageStatusType {
    Success,
    Warning
}
