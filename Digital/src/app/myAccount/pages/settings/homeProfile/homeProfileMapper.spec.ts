import { HomeProfileMapper, IHomeProfileMapper } from './homeProfileMapper';
import { HomeProfileApiModel, Fridge } from '../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileViewModel, PropertyType, FridgeType, FridgeAge, HotWaterType, PoolSize, PoolHeaterType, PoolPumpAge, DuctedHeatingType, OtherHeatingType } from './homeProfileViewModel';
import { HomeProfileOptions } from './homeProfileOptions';

describe('Home Profile Mapper', () => {
    let sut: HomeProfileMapper = null;

    beforeEach(() => {
        sut = new HomeProfileMapper();
    });

    it('should map empty API model to empty view model', () => {
        // Arrange
        const apiModel = new HomeProfileApiModel();

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(JSON.stringify(viewModel)).toEqual('{}');
    });

    it('should map empty view model to empty API model', () => {
        // Arrange
        const viewModel = new HomeProfileViewModel();

        // Act
        const profile = sut.fromViewModel(viewModel);

        // Assert
        expect(JSON.stringify(profile)).toEqual('{}');
    });

    it('should map `yourHome` properties from API model to view model and vice-versa', () => {
        // Arrange
        const propertyType = PropertyType.House.toString();
        const bedrooms = 4;
        const bathrooms = 2;
        const adults = 2;
        const children = 2;
        const apiModel = new HomeProfileApiModel();
        apiModel.propertyType = propertyType;
        apiModel.numberOfBedrooms = bedrooms;
        apiModel.numberOfBathrooms = bathrooms;
        apiModel.numberOfAdults = adults;
        apiModel.numberOfChildren = children;

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(viewModel.propertyType).toBe(propertyType);
        expect(viewModel.numberOfBedrooms).toBe(bedrooms);
        expect(viewModel.numberOfBathrooms).toBe(bathrooms);
        expect(viewModel.numberOfAdults).toBe(adults);
        expect(viewModel.numberOfChildren).toBe(children);

        // Convert view model back to API model
        let newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.propertyType).toBe(propertyType);
        expect(newApiModel.numberOfBedrooms).toBe(bedrooms);
        expect(newApiModel.numberOfBathrooms).toBe(bathrooms);
        expect(newApiModel.numberOfAdults).toBe(adults);
        expect(newApiModel.numberOfChildren).toBe(children);
    });

    it('should map `cooling` properties from API model to view model and vice-versa', () => {
        // Arrange
        const splitAircon = 2;
        const fixedAircon = 0;
        const hasDuctedAircon = false;
        const portableEvaporativeCoolers = 1;
        const hasDuctedEvaporativeCooling = false;
        const fans = 2;

        const apiModel = new HomeProfileApiModel();
        apiModel.numberOfAirconSplitSystems = splitAircon;
        apiModel.numberOfAirconFixed = fixedAircon;
        apiModel.hasDuctedAircon = hasDuctedAircon;
        apiModel.numberOfPortableCoolers = portableEvaporativeCoolers;
        apiModel.hasDuctedEvaporativeCooling = hasDuctedEvaporativeCooling;
        apiModel.numberOfFans = fans;

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(viewModel.numberOfSplitSystemAirconCooling).toBe(splitAircon);
        expect(viewModel.numberOfWallUnitAirconCooling).toBe(fixedAircon);
        expect(viewModel.hasDuctedAirconCooling).toBe(hasDuctedAircon);
        expect(viewModel.numberOfPortableEvaporativeCooling).toBe(portableEvaporativeCoolers);
        expect(viewModel.hasDuctedEvaporativeCooling).toBe(hasDuctedEvaporativeCooling);
        expect(viewModel.numberOfCoolingFans).toBe(fans);

        // Convert view model back to API model
        const newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.numberOfAirconSplitSystems).toBe(splitAircon);
        expect(newApiModel.numberOfAirconFixed).toBe(fixedAircon);
        expect(newApiModel.hasDuctedAircon).toBe(hasDuctedAircon);
        expect(newApiModel.numberOfPortableCoolers).toBe(portableEvaporativeCoolers);
        expect(newApiModel.hasDuctedEvaporativeCooling).toBe(hasDuctedEvaporativeCooling);
        expect(newApiModel.numberOfFans).toBe(fans);
    });

    it('should map `heating` properties from API model to view model and vice-versa', () => {
        // Arrange
        const numberOfHeatingSplitSystems = 1;
        const typeOfDuctedHeating = DuctedHeatingType.None;
        const numberOfPortableElecHeaters = 2;
        const typeOfOtherHeating = OtherHeatingType.None;

        const apiModel = new HomeProfileApiModel();
        apiModel.numberOfHeatingSplitSystems = numberOfHeatingSplitSystems;
        apiModel.typeOfDuctedHeating = typeOfDuctedHeating;
        apiModel.numberOfPortableElecHeaters = numberOfPortableElecHeaters;
        apiModel.typeOfOtherHeating = typeOfOtherHeating;

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(viewModel.numberOfHeatingSplitSystems).toBe(numberOfHeatingSplitSystems);
        expect(viewModel.typeOfDuctedHeating).toBe(typeOfDuctedHeating);
        expect(viewModel.numberOfPortableElecHeaters).toBe(numberOfPortableElecHeaters);
        expect(viewModel.typeOfOtherHeating).toBe(typeOfOtherHeating);

        // Convert view model back to API model
        const newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.numberOfHeatingSplitSystems).toBe(numberOfHeatingSplitSystems);
        expect(newApiModel.typeOfDuctedHeating).toBe(typeOfDuctedHeating);
        expect(newApiModel.numberOfPortableElecHeaters).toBe(numberOfPortableElecHeaters);
        expect(newApiModel.typeOfOtherHeating).toBe(typeOfOtherHeating);
    });

    it('should map `fridge and freezer` properties from API model to view model and vice-versa', () => {
        // Arrange
        const mainFridgeType = FridgeType.SideBySide;
        const mainFridgeAge = FridgeAge.From6To10Yrs;

        const apiModel = new HomeProfileApiModel();
        apiModel.mainFridge = new Fridge(mainFridgeType, mainFridgeAge);
        apiModel.fridge2 = null;

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(viewModel.mainFridgeType).toBe(FridgeType[mainFridgeType]);
        expect(viewModel.mainFridgeAge).toBe(FridgeAge[mainFridgeAge]);
        expect(viewModel.secondaryFridgeType).toBe(undefined);
        expect(viewModel.secondaryFridgeAge).toBe(undefined);

        // Convert view model back to API model
        const newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.mainFridge.fridgeType).toBe(mainFridgeType);
        expect(newApiModel.mainFridge.age).toBe(mainFridgeAge);
        expect(newApiModel.fridge2).toBe(undefined);
    });

    it('should map `second fridge and freezer` as empty object to API model if no secondary fridge properties', () => {
        // Arrange
        const apiModel = new HomeProfileApiModel();

        // Act
        const viewModel = sut.toViewModel(apiModel);
        viewModel.hasSecondaryFridge = true;

        const newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.fridge2).toEqual({});
    });

    it('should map `pool and spa` properties from API model to view model and vice-versa', () => {
        // Arrange
        const hasPool = true;
        const poolSize = PoolSize.Medium;
        const poolHeater = PoolHeaterType.Elec;
        const poolPumpAge = PoolPumpAge.From6To10Yrs;
        const hasSpa = false;

        let apiModel = new HomeProfileApiModel();
        apiModel.hasPool = hasPool;
        apiModel.poolSize = poolSize.toString();
        apiModel.poolHeaterFuelType = poolHeater.toString();
        apiModel.poolPumpAge = poolPumpAge.toString();
        apiModel.hasSpa = hasSpa;

        // Act
        const viewModel = sut.toViewModel(apiModel);

        // Assert
        expect(viewModel.hasPool).toBe(hasPool);
        expect(viewModel.poolSize).toBe(poolSize);
        expect(viewModel.poolHeaterType).toBe(poolHeater);
        expect(viewModel.poolPumpAge).toBe(poolPumpAge);
        expect(viewModel.hasSpa).toBe(hasSpa);

        // Convert view model back to API model
        const newApiModel = sut.fromViewModel(viewModel);

        // Assert
        expect(newApiModel.hasPool).toBe(hasPool);
        expect(newApiModel.poolSize).toBe(poolSize.toString());
        expect(newApiModel.poolHeaterFuelType).toBe(poolHeater.toString());
        expect(newApiModel.poolPumpAge).toBe(poolPumpAge.toString());
        expect(newApiModel.hasSpa).toBe(hasSpa);
    });

});
