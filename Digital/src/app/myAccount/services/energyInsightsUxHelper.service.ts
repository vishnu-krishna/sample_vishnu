import { EnergyInsightsUsageCategory } from './settings/model/energyUsageCategories';

export class EnergyInsightsUxHelperService {

    public static getIconForCategory(category: EnergyInsightsUsageCategory): string {
        let iconMap: Map<EnergyInsightsUsageCategory, string> = new Map<EnergyInsightsUsageCategory, string>(
            [
                [ EnergyInsightsUsageCategory.Heating, `heating.svg` ],
                [ EnergyInsightsUsageCategory.PoolPump, `pool_pump.svg` ],
                [ EnergyInsightsUsageCategory.FridgesFreezers, `fridge.svg` ],
                [ EnergyInsightsUsageCategory.Cooling, `cooling.svg` ],
                [ EnergyInsightsUsageCategory.ElectricHotWater, `hot_water.svg` ],
                [ EnergyInsightsUsageCategory.LaundryDishwasher, `laundry_dishwasher.svg` ],
                [ EnergyInsightsUsageCategory.HomeEntertainment, `home_entertainment.svg` ],
                [ EnergyInsightsUsageCategory.Other, `anything_else.svg` ],
                [ EnergyInsightsUsageCategory.Lighting, `lighting.svg` ],
                [ EnergyInsightsUsageCategory.Standby, `standby_always_on.svg` ],
                [ EnergyInsightsUsageCategory.Cooking, `cooking.svg` ],
                [ EnergyInsightsUsageCategory.ElectricVehicle, `electric_vehicle.svg` ],
            ]
        );
        let iconFile: string = iconMap.get(category);
        return `svg/energyInsights/category-icons/${iconFile}`;
    }

    public static getTooltipForCategory(category: EnergyInsightsUsageCategory): string {
        let tooltipContentMap: Map<EnergyInsightsUsageCategory, string> = new Map<EnergyInsightsUsageCategory, string>(
            [
                [ EnergyInsightsUsageCategory.Other, `Includes all other small appliances e.g. mobile charger, hair dryer, fans.` ],
                [ EnergyInsightsUsageCategory.Standby, `Lighting or appliances turned on at power outlet e.g. lamps, TV, speakers, alarm, heated towel rail.` ],
            ]
        );
        return tooltipContentMap.get(category);
    }

}
