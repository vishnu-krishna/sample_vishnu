import { HomeProfileViewModel, PropertyType, FridgeType, FridgeAge, HotWaterType, PoolSize, PoolHeaterType, PoolPumpAge, DuctedHeatingType, OtherHeatingType, OvenType, CooktopType } from './homeProfileViewModel';
import { HomeProfileApiModel, Fridge } from '../../../services/homeProfile/homeProfileApi.service';

export abstract class IHomeProfileMapper {
    public abstract fromViewModel(viewModel: HomeProfileViewModel): HomeProfileApiModel;
    public abstract toViewModel(profile: HomeProfileApiModel): HomeProfileViewModel;
}

export class HomeProfileMapper implements IHomeProfileMapper {

    public fromViewModel(model: HomeProfileViewModel): HomeProfileApiModel {
        let profile = new HomeProfileApiModel();

        if (model) {

            // Your Home properties
            profile.propertyType = model.propertyType ? model.propertyType.toString() : undefined;
            profile.numberOfBathrooms = model.numberOfBathrooms;
            profile.numberOfBedrooms = model.numberOfBedrooms;
            profile.numberOfAdults = model.numberOfAdults;
            profile.numberOfChildren = model.numberOfChildren;

            // Cooling properties
            profile.numberOfAirconSplitSystems = model.numberOfSplitSystemAirconCooling;
            profile.numberOfAirconFixed = model.numberOfWallUnitAirconCooling;
            profile.hasDuctedAircon = model.hasDuctedAirconCooling;
            profile.numberOfPortableCoolers = model.numberOfPortableEvaporativeCooling;
            profile.hasDuctedEvaporativeCooling = model.hasDuctedEvaporativeCooling;
            profile.numberOfFans = model.numberOfCoolingFans;

            // Heating
            profile.numberOfHeatingSplitSystems = model.numberOfHeatingSplitSystems;
            profile.typeOfDuctedHeating = model.typeOfDuctedHeating;
            profile.numberOfPortableElecHeaters = model.numberOfPortableElecHeaters;
            profile.typeOfOtherHeating = model.typeOfOtherHeating;

            // Hot water
            profile.hotWaterType = HotWaterType[model.hotWaterType];

            // Oven and CookTop
            profile.ovenType = model.ovenType;
            profile.cooktopType = model.cooktopType;

            // Fridge and freezer
            this.fridgeFromViewModel(model, profile);

            // Other electrical items
            profile.numberOfTelevisions = model.numberOfTelevisions;
            profile.hasWashingMachine = model.hasWashingMachine;
            profile.hasClothesDryer = model.hasClothesDryer;
            profile.hasDishwasher = model.hasDishwasher;
            profile.hasMicrowave = model.hasMicrowave;
            profile.hasElectricalVehicle = model.hasElectricalVehicle;

            // Pool and spa
            profile.hasPool = model.hasPool;
            profile.poolSize = model.poolSize && model.poolSize.toString();
            profile.poolHeaterFuelType = model.poolHeaterType && model.poolHeaterType.toString();
            profile.poolPumpAge = model.poolPumpAge && model.poolPumpAge.toString();
            profile.hasSpa = model.hasSpa;
        }
        return profile;
    }

    public toViewModel(profile: HomeProfileApiModel): HomeProfileViewModel {
        let model = new HomeProfileViewModel();

        if (profile) {

            // Your Home properties
            model.propertyType = PropertyType[profile.propertyType];
            model.numberOfBathrooms = profile.numberOfBathrooms;
            model.numberOfBedrooms = profile.numberOfBedrooms;
            model.numberOfAdults = profile.numberOfAdults;
            model.numberOfChildren = profile.numberOfChildren;

            // Cooling properties
            model.numberOfSplitSystemAirconCooling = profile.numberOfAirconSplitSystems;
            model.numberOfWallUnitAirconCooling = profile.numberOfAirconFixed;
            model.hasDuctedAirconCooling = profile.hasDuctedAircon;
            model.numberOfPortableEvaporativeCooling = profile.numberOfPortableCoolers;
            model.hasDuctedEvaporativeCooling = profile.hasDuctedEvaporativeCooling;
            model.numberOfCoolingFans = profile.numberOfFans;

            // Hot water
            model.hotWaterType = HotWaterType[profile.hotWaterType];

            // Heating
            model.numberOfHeatingSplitSystems = profile.numberOfHeatingSplitSystems;
            model.typeOfDuctedHeating = DuctedHeatingType[profile.typeOfDuctedHeating];
            model.numberOfPortableElecHeaters = profile.numberOfPortableElecHeaters;
            model.typeOfOtherHeating = OtherHeatingType[profile.typeOfOtherHeating];

            // Oven and CookTop
            model.ovenType = OvenType[profile.ovenType];
            model.cooktopType = CooktopType[profile.cooktopType];

            // Fridge and freezer
            this.fridgeToViewModel(profile, model);

            // Other electrical items
            model.numberOfTelevisions = profile.numberOfTelevisions;
            model.hasWashingMachine = profile.hasWashingMachine;
            model.hasClothesDryer = profile.hasClothesDryer;
            model.hasDishwasher = profile.hasDishwasher;
            model.hasMicrowave = profile.hasMicrowave;
            model.hasElectricalVehicle = profile.hasElectricalVehicle;

            // Pool and spa
            model.hasPool = profile.hasPool;
            model.poolSize = PoolSize[profile.poolSize];
            model.poolHeaterType = PoolHeaterType[profile.poolHeaterFuelType];
            model.poolPumpAge = PoolPumpAge[profile.poolPumpAge];
            model.hasSpa = profile.hasSpa;
        }
        return model;
    }
    private fridgeFromViewModel(model: HomeProfileViewModel, profile: HomeProfileApiModel) {
        if (model.mainFridgeType) {
            profile.mainFridge = new Fridge(model.mainFridgeType, model.mainFridgeAge ? model.mainFridgeAge : null);
        }
        if (model.hasSecondaryFridge) {
            profile.fridge2 = !model.secondaryFridgeType ? {} : new Fridge(model.secondaryFridgeType, model.secondaryFridgeAge ? model.secondaryFridgeAge : null);
        }
    }

    private fridgeToViewModel(profile: HomeProfileApiModel, model: HomeProfileViewModel) {
        if (profile.mainFridge) {
            model.mainFridgeType = profile.mainFridge.fridgeType ? FridgeType[profile.mainFridge.fridgeType] : null;
            model.mainFridgeAge = profile.mainFridge.age ? FridgeAge[profile.mainFridge.age] : null;
        }
        if (profile.fridge2) {
            model.hasSecondaryFridge = true;
            model.secondaryFridgeType = profile.fridge2.fridgeType ? FridgeType[profile.fridge2.fridgeType] : null;
            model.secondaryFridgeAge = profile.fridge2.age ? FridgeAge[profile.fridge2.age] : null;
        }
    }
}
