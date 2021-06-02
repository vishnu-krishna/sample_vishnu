export class HomeProfileViewModel {

    // Your Home properties
    public propertyType?: PropertyType;
    public numberOfAdults?: number;
    public numberOfChildren?: number;
    public numberOfBedrooms?: number;
    public numberOfBathrooms?: number;

    // Cooling
    public numberOfSplitSystemAirconCooling?: number;
    public numberOfWallUnitAirconCooling?: number;
    public hasDuctedAirconCooling?: boolean;
    public numberOfPortableEvaporativeCooling?: number;
    public hasDuctedEvaporativeCooling?: boolean;
    public numberOfCoolingFans?: number;

    // Heating
    public numberOfHeatingSplitSystems?: number;
    public typeOfDuctedHeating?: DuctedHeatingType;
    public numberOfPortableElecHeaters?: number;
    public typeOfOtherHeating?: OtherHeatingType;

    // Hot Water properties
    public hotWaterType?: HotWaterType;

    // Fridge and freezer
    public mainFridgeType?: FridgeType;
    public mainFridgeAge?: FridgeAge;
    public hasSecondaryFridge?: boolean;
    public secondaryFridgeType?: FridgeType;
    public secondaryFridgeAge?: FridgeAge;

    // Oven and CookTop
    public ovenType?: OvenType;
    public cooktopType?: CooktopType;

    // Other electrical items
    public numberOfTelevisions?: number;
    public hasWashingMachine?: boolean;
    public hasClothesDryer?: boolean;
    public hasDishwasher?: boolean;
    public hasMicrowave?: boolean;
    public hasElectricalVehicle?: boolean;

    // Pool and spa
    public hasPool?: boolean;
    public poolSize?: PoolSize;
    public poolHeaterType?: PoolHeaterType;
    public poolPumpAge?: PoolPumpAge;
    public hasSpa?: boolean;
}

export enum BaseFuel {
    Gas = 'Gas',
    Elec = 'Elec',
    Woodfire = 'Woodfire',
    None = 'None'
}

export enum CooktopType {
    Gas = 'Gas',
    Elec = 'Elec',
    Other = 'Other',
    None = 'None'
}

export enum FridgeType {
    None = 'None',
    TopOrBottomMount = 'TopOrBottomMount',
    SideBySide = 'SideBySide',
    Bar = 'Bar',
    Freezer = 'Freezer'
}

export enum FridgeAge {
    UpTo5Yrs = 'UpTo5Yrs',
    From6To10Yrs = 'From6To10Yrs',
    MoreThan10Yrs  = 'MoreThan10Yrs'
}

export enum HotWaterType {
    GasStorage = 'GasStorage',
    GasInstantaneous = 'GasInstantaneous',
    ElectricStorage = 'ElectricStorage',
    ElectricInstantaneous = 'ElectricInstantaneous',
    SolarElectricBoost = 'SolarElectricBoost',
    SolarGasBoost = 'SolarGasBoost',
    HeatPumpStorage = 'HeatPumpStorage',
    NotSure = 'NotSure'
}

export enum DuctedHeatingType {
    Gas = 'Gas',
    Elec = 'Elec',
    None = 'None'
}

export enum OtherHeatingType {
    Gas = 'Gas',
    Elec = 'Elec',
    Woodfire = 'Woodfire',
    None = 'None'
}

export enum OvenType {
    Gas = 'Gas',
    Elec = 'Elec',
    Other = 'Other',
    None = 'None'
}

export enum PropertyType {
    House = 'House',
    Townhouse = 'Townhouse',
    Apartment = 'Apartment',
    Other = 'Other'
}

export enum PoolSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    ExtraLarge = 'ExtraLarge',
    NotSure = 'NotSure'
}

export enum PoolHeaterType {
    Solar = 'Solar',
    Gas = 'Gas',
    Elec = 'Elec',
    None = 'None',
    NotSure = 'NotSure'
}

export enum PoolPumpAge {
    UpTo5Yrs = 'UpTo5Yrs',
    From6To10Yrs = 'From6To10Yrs',
    MoreThan10Yrs = 'MoreThan10Yrs',
    NotSure = 'NotSure'
}
