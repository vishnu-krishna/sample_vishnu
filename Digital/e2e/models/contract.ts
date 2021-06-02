export interface Contract {
    accountNumber: string;
    address: string;
    contractStatus: string;
    fuelType: string;
    generationStartDate: string;
    hasElectricVehicle: boolean;
    hasSolar: boolean;
    inFlight: boolean;
    isRestricted: boolean;
    isSmartMeter: boolean;
    lastActualUsageDate: string;
    lastUsageDate: string;
    nameId: string;
    number: string;
    numberValidSolarCheckDays: string;
    planName: string;
    pointOfDeliveryId: string;
    productId: string;
    regionId: string;
    solarCheckRegistered: boolean;
}
