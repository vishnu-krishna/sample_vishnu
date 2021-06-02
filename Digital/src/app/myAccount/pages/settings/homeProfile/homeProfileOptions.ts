import { SegmentedButtonOptions } from '../../../maui/segmentedButtons/segmentedButton/segmentedButton.component';
import { PropertyType, HotWaterType, PoolSize, PoolHeaterType, PoolPumpAge, FridgeType, FridgeAge, BaseFuel, OvenType, CooktopType } from './homeProfileViewModel';

export class HomeProfileOptions {

    // base spread fuel
    public static baseFuel = [
        {
            value: BaseFuel.Gas,
            text: 'Gas'
        },
        {
            value: BaseFuel.Elec,
            text: 'Electricity'
        }
    ];

    // base spread added to ALL numberOf
    public static baseNumberOf = [
        {
            value: 0,
            text: '0'
        },
        {
            value: 1,
            text: '1'
        },
        {
            value: 2,
            text: '2'
        },
        {
            value: 3,
            text: '3'
        }
    ];

    public static yesOrNoOptions: BooleanSegmentedButtonOption[] = [
        {
            value: true,
            text: 'Yes'
        },
        {
            value: false,
            text: 'No'
        }
    ];

    public static oneToFivePlus: NumericSegmentedButtonOption[] = [
        {
            value: 1,
            text: '1'
        },
        {
            value: 2,
            text: '2'
        },
        {
            value: 3,
            text: '3'
        },
        {
            value: 4,
            text: '4'
        },
        {
            value: 5,
            text: '5+'
        }
    ];

    public static zeroToFivePlus: NumericSegmentedButtonOption[] = [
        ...HomeProfileOptions.baseNumberOf,
        {
            value: 4,
            text: '4'
        },
        {
            value: 5,
            text: '5+'
        }
    ];

    public static zeroToFourPlus: NumericSegmentedButtonOption[] = [
        ...HomeProfileOptions.baseNumberOf,
        {
            value: 4,
            text: '4+'
        }
    ];

    public static zeroToThreePlus: NumericSegmentedButtonOption[] = [
        {
            value: 0,
            text: '0'
        },
        {
            value: 1,
            text: '1'
        },
        {
            value: 2,
            text: '2'
        },
        {
            value: 3,
            text: '3+'
        }
    ];

    public static gasOrElectricity: StringSegmentedButtonOption[] = [
        ...HomeProfileOptions.baseFuel
    ];

    public static gasElectricityOrNone: StringSegmentedButtonOption[] = [
        ...HomeProfileOptions.baseFuel,
        {
            value: BaseFuel.None,
            text: 'None'
        }
    ];

    public static gasElectricityWoodfireOrNone: StringSegmentedButtonOption[] = [
        ...HomeProfileOptions.baseFuel,
        {
            value: BaseFuel.Woodfire,
            text: 'Wood fire'
        },
        {
            value: BaseFuel.None,
            text: 'None'
        }
    ];

    public static homeTypes: GroupedRadioOption[] = [
        {
            value: PropertyType.House,
            text: 'House',
        },
        {
            value: PropertyType.Townhouse,
            text: 'Townhouse',
        },
        {
            value: PropertyType.Apartment,
            text: 'Apartment/Unit',
        },
        {
            value: PropertyType.Other,
            text: 'Other',
        }
    ];

    public static numberOfBedroomOptions = HomeProfileOptions.zeroToFivePlus;
    public static numberOfBathroomOptions = HomeProfileOptions.zeroToFourPlus;
    public static numberOfAdultOptions = HomeProfileOptions.oneToFivePlus;
    public static numberOfChildrenOptions = HomeProfileOptions.zeroToFivePlus;

    public static numberOfSplitAirconCoolerOptions = HomeProfileOptions.zeroToFivePlus;
    public static numberOfFixedAirconCoolerOptions = HomeProfileOptions.zeroToFivePlus;
    public static numberOfEvaporativeCoolerOptions = HomeProfileOptions.zeroToThreePlus;
    public static numberOfFanCoolerOptions = HomeProfileOptions.zeroToThreePlus;

    public static numberOfSplitSystemHeaterOptions = HomeProfileOptions.zeroToFivePlus;
    public static numberOfPortableElectricHeaterOptions = HomeProfileOptions.zeroToThreePlus;
    public static ductedHeatingTypes = HomeProfileOptions.gasElectricityOrNone;
    public static otherHeatingTypes = HomeProfileOptions.gasElectricityWoodfireOrNone;

    public static hotWaterTypes: GroupedRadioOption[] = [
        {
            value: HotWaterType.GasStorage,
            text: 'Gas storage'
        },
        {
            value: HotWaterType.GasInstantaneous,
            text: 'Gas instantaneous'
        },
        {
            value: HotWaterType.ElectricStorage,
            text: 'Electric storage'
        },
        {
            value: HotWaterType.ElectricInstantaneous,
            text: 'Electric instantaneous'
        },
        {
            value: HotWaterType.SolarElectricBoost,
            text: 'Solar electric boost'
        },
        {
            value: HotWaterType.SolarGasBoost,
            text: 'Solar gas boost'
        },
        {
            value: HotWaterType.HeatPumpStorage,
            text: 'Heat pump storage'
        },
        {
            value: HotWaterType.NotSure,
            text: 'Not sure'
        }
    ];

    public static ovenTypeOptions: GroupedRadioOption[] = [
        {
            value: OvenType.Gas,
            text: 'Gas'
        },
        {
            value: OvenType.Elec,
            text: 'Electric'
        },
        {
            value: OvenType.Other,
            text: 'Other'
        },
        {
            value: OvenType.None,
            text: 'No oven'
        }
    ];

    public static cooktopTypeOptions: GroupedRadioOption[] = [
        {
            value: CooktopType.Gas,
            text: 'Gas'
        },
        {
            value: CooktopType.Elec,
            text: 'Electric'
        },
        {
            value: CooktopType.Other,
            text: 'Other'
        },
        {
            value: CooktopType.None,
            text: 'No cooktop'
        }
    ];

    public static fridgeTypeSelections: GroupedRadioOption[] = [
        {
            value: FridgeType.TopOrBottomMount,
            text: 'Top or bottom mount fridge'
        },
        {
            value: FridgeType.SideBySide,
            text: 'Side-by-side fridge'
        },
        {
            value: FridgeType.Bar,
            text: 'Bar Fridge'
        },
        {
            value: FridgeType.Freezer,
            text: 'Freezer only'
        }
    ];
    public static fridgeAgeSelections: GroupedRadioOption[] = [
        {
            value: FridgeAge.UpTo5Yrs,
            text: '0-5 yrs'
        },
        {
            value: FridgeAge.From6To10Yrs,
            text: '6-10 yrs'
        },
        {
            value: FridgeAge.MoreThan10Yrs,
            text: '11+ yrs'
        }
    ];

    public static numberOfTelevisionOptions = HomeProfileOptions.zeroToThreePlus;

    public static poolSizes: GroupedRadioOption[] = [
        {
            value: PoolSize.Small,
            text: 'Small (up to 7m x 3m)'
        },
        {
            value: PoolSize.Medium,
            text: 'Medium (up to 9m x 4m)'
        },
        {
            value: PoolSize.Large,
            text: 'Large (up to 10m x 5m)'
        },
        {
            value: PoolSize.ExtraLarge,
            text: 'X-large (more than 10m x 5m)'
        },
        {
            value: PoolSize.NotSure,
            text: 'Not sure'
        }
    ];

    public static poolHeaterTypes: GroupedRadioOption[] = [
        {
            value: PoolHeaterType.Solar,
            text: 'Solar'
        },
        {
            value: PoolHeaterType.Gas,
            text: 'Gas'
        },
        {
            value: PoolHeaterType.Elec,
            text: 'Electric'
        },
        {
            value: PoolHeaterType.None,
            text: "I don't have a pool heater"
        },
        {
            value: PoolHeaterType.NotSure,
            text: 'Not sure'
        }
    ];

    public static poolPumpAge: GroupedRadioOption[] = [
        {
            value: PoolPumpAge.UpTo5Yrs,
            text: '0-5 yrs'
        },
        {
            value: PoolPumpAge.From6To10Yrs,
            text: '6-10 yrs'
        },
        {
            value: PoolPumpAge.MoreThan10Yrs,
            text: '11+ yrs'
        },
        {
            value: PoolPumpAge.NotSure,
            text: 'Not sure'
        }
    ];

}

export interface NumericSegmentedButtonOption {
    value: number;
    text: string;
    textMobile?: string;
}

export interface BooleanSegmentedButtonOption {
    value: boolean;
    text: string;
    textMobile?: string;
}

export interface StringSegmentedButtonOption {
    value: string;
    text: string;
    textMobile?: string;
}

export interface GroupedRadioOption {
    value: string;
    text: string;
}
