export enum User {
    Default,
    local,
    OTHER,
    OTHER2,
    PAYG,
    RESI_DUAL_FUEL_BILL_ISSUED,
    RESI_SINGLE_FUEL_SMART_ELEC,
    NO_FIRST_BILL_USER,
    BILLSMOOTHING,
    WITH_USAGE_DATA,
    SOLAR,
    SINGLE_CONTRACT,
    contactDetailsWillSucceed,
    invalidContactDetails,
    MULTI_CONTRACT,
    HOME_PROFILE,
    CAN_APPLY_FOR_CONCESSION_WITH_MULTI_CONTRACT_ACCOUNTS,
    CAN_APPLY_FOR_CONCESSION_WITH_SINGLE_CONTRACT_ACCOUNT,
    HOME_PROFILE_MULTI_CONTRACT,
    DUAL_ACCOUNT_SSMR,
    MULTI_ACCOUNT_MULTI_CONTRACT,
    SINGLE_FUEL_BASIC_GAS,
    MULTI_ACCOUNT_MULTI_CONTRACT_ELIGIBLE_ENERGY_INSIGHTS,
    MULTI_ACCOUNT_SINGLE_CONTRACT_ELIGIBLE_ENERGY_INSIGHTS,
    WITH_ESSENTIAL_PRODUCT,
}

export enum DataProvider {
    mock,
    api
}
