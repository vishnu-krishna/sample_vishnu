import { HomeProfile } from './../../../../../../../e2e/myAccount/pageObjects/homeProfile';
import { HomeProfileSummaryService } from './homeProfileSummary.service';
import { HomeProfileViewModel, PropertyType, PoolSize, PoolHeaterType, PoolPumpAge, OvenType, CooktopType, HotWaterType, FridgeType, FridgeAge, DuctedHeatingType, OtherHeatingType } from './../homeProfileViewModel';
import { HomeProfilePage } from '../homeProfileNavigation.service';

describe('Home Profile Summary Service', () => {

    let sut: HomeProfileSummaryService;
    let homeProfile: HomeProfileViewModel;
    let summary;

    beforeEach(() => {
        sut = new HomeProfileSummaryService();
        homeProfile = new HomeProfileViewModel();
    });

    describe('forProfile()', () => {
        it('should return the service', () => {
            const service = sut.forProfile(homeProfile);
            expect(service).toBe(sut);
        });
    });

    describe('summarisePage()', () => {
        it('should throw an error if page is invalid', () => {
            const serviceCall = () => sut.forProfile(homeProfile).summarisePage(999);
            expect(serviceCall).toThrow(new Error('Invalid page argument'));
        });

        it('should return summary as [string, string]', () => {
            summary = sut.forProfile(homeProfile).summarisePage(HomeProfilePage.YourHome);
            expect(summary.length).toBe(2);
            expect(summary[0]).toEqual(jasmine.any(String));
            expect(summary[1]).toEqual(jasmine.any(String));
        });
    });

    describe('yourHomeSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on first line if no details provided', () => {
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0]).toBe('');
        });

        it('should say type of house, and numbers of bedrooms and bathrooms, if available', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            homeProfile.numberOfBedrooms = 5;
            homeProfile.numberOfBathrooms = 3;

            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0].toLowerCase()).toContain('5+ bedroom');
            expect(summary[0].toLowerCase()).toContain('3 bathroom');
            expect(summary[0].toLowerCase()).toContain('apartment/unit');
        });

        it('should say nothing about number of bedrooms or bathrooms if property type is not available', () => {
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0].toLowerCase()).not.toContain('bedroom');
            expect(summary[0].toLowerCase()).not.toContain('bathroom');
        });

        it('should say `no bedroom` if number of bedrooms is not available', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0].toLowerCase()).toContain('no bedroom');
        });

        it('should say `no bathroom` if number of bathrooms is not available', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0].toLowerCase()).toContain('no bathroom');
        });

        it('should say number of adults and children on second line, if available', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            homeProfile.numberOfAdults = 5;
            homeProfile.numberOfChildren = 5;

            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[1].toLowerCase()).toContain('5+ adults');
            expect(summary[1].toLowerCase()).toContain('5+ children');
        });

        it('should say number of adults and children on first line if no property type specified', () => {
            homeProfile.numberOfAdults = 2;
            homeProfile.numberOfChildren = 2;

            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[0].toLowerCase()).toContain('adults');
            expect(summary[0].toLowerCase()).toContain('children');
        });

        it('should say `1 adult` if number of adults is 1', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            homeProfile.numberOfAdults = 1;
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[1].toLowerCase()).toContain('1 adult');
            expect(summary[1].toLowerCase()).not.toContain('1 adults');
        });

        it('should not say anything about children if number of children is not available', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[1].toLowerCase()).not.toContain('children');
        });

        it('should not say anything about children if number of children is zero', () => {
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[1].toLowerCase()).not.toContain('chlidren');
        });

        it('should say `1 child` if number of children is 1', () => {
            homeProfile.propertyType = PropertyType.Apartment;
            homeProfile.numberOfChildren = 1;
            summary = sut.summarisePage(HomeProfilePage.YourHome);

            expect(summary[1].toLowerCase()).toContain('1 child');
            expect(summary[1].toLowerCase()).not.toContain('1 children');
        });
    });

    describe('coolingSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on first line if no details provided', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0]).toBe('');
        });

        it('should say, on the first line, the number of split systems if available', () => {
            homeProfile.numberOfSplitSystemAirconCooling = 5;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('5+ split system air conditioners');
        });

        it('should say `1 split systems air conditioner` (singular) if there is just 1', () => {
            homeProfile.numberOfSplitSystemAirconCooling = 1;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('1 split system air conditioner');
            expect(summary[0].toLowerCase()).not.toContain('1 split system air conditioners');
        });

        it('should say nothing about split systems if not specified', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('split system air conditioner');
        });

        it('should say number of fixed air conditioners if available', () => {
            homeProfile.numberOfWallUnitAirconCooling = 5;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('5+ fixed air conditioners');
        });

        it('should say `1 fixed air conditioner` (singular) if there is just 1', () => {
            homeProfile.numberOfWallUnitAirconCooling = 1;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('1 fixed air conditioner');
            expect(summary[0].toLowerCase()).not.toContain('1 fixed air conditioners');
        });

        it('should say nothing about fixed air conditioners if not specified', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('fixed air conditioner');
        });

        it('should say `ducted air conditioner` if set to true', () => {
            homeProfile.hasDuctedAirconCooling = true;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('ducted air conditioner');
        });

        it('should not say `ducted air conditioner` if set to false', () => {
            homeProfile.hasDuctedAirconCooling = false;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('ducted air conditioner');
        });

        it('should say `ducted evaporative cooling` if set to true', () => {
            homeProfile.hasDuctedEvaporativeCooling = true;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('ducted evaporative cooling');
        });

        it('should not say `ducted evaporative cooling` if set to false', () => {
            homeProfile.hasDuctedEvaporativeCooling = false;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('ducted evaporative cooling');
        });

        it('should say number of portable evaporative cooling if available', () => {
            homeProfile.numberOfPortableEvaporativeCooling = 3;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('3+ portable evaporative cooling');
        });

        it('should not say `portable evaporative cooling` if nothing selected for number of portable evaporative cooling', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('portable evaporative cooling');
        });

        it('should say number of fans if available', () => {
            homeProfile.numberOfCoolingFans = 3;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('3+ fans');
        });

        it('should say `1 fan` (singular) if there is just 1', () => {
            homeProfile.numberOfCoolingFans = 1;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).toContain('1 fan');
            expect(summary[0].toLowerCase()).not.toContain('1 fans');
        });

        it('should not say `fan` if nothing selected for number of fans', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[0].toLowerCase()).not.toContain('fan');
        });

        it('should always have nothing on the second line', () => {
            homeProfile.numberOfSplitSystemAirconCooling = 1;
            homeProfile.numberOfWallUnitAirconCooling = 1;
            homeProfile.hasDuctedAirconCooling = true;
            homeProfile.hasDuctedEvaporativeCooling = true;
            homeProfile.numberOfPortableEvaporativeCooling = 1;
            homeProfile.numberOfCoolingFans = 2;
            summary = sut.summarisePage(HomeProfilePage.Cooling);

            expect(summary[1]).toBe('');
        });
    });

    describe('heatingSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on first line if no details provided', () => {
            summary = sut.summarisePage(HomeProfilePage.Heating);

            expect(summary[0]).toBe('');
        });

        it('should say `electric` instead of `electricity` if ducted heating is electric', () => {
            homeProfile.typeOfDuctedHeating = DuctedHeatingType.Elec;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('electric ducted heater');
        });

        it('should say number of split system heaters if specified', () => {
            homeProfile.numberOfHeatingSplitSystems = 5;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('5+ split system heaters');
        });

        it('should say `1 split system heater` if there is just one', () => {
            homeProfile.numberOfHeatingSplitSystems = 1;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('1 split system heater');
        });

        it('should say number of portable heaters if specified', () => {
            homeProfile.numberOfPortableElecHeaters = 3;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('3+ portable heaters');
        });

        it('should say `1 portable heater` if there is just one', () => {
            homeProfile.numberOfPortableElecHeaters = 1;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('1 portable heater');
        });

        it('should say `other` if other heating is gas or electric', () => {
            homeProfile.typeOfOtherHeating = OtherHeatingType.Elec;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('other electric heater');
        });

        it('should say just `wood fire heater` if other heating is woodfire', () => {
            homeProfile.typeOfOtherHeating = OtherHeatingType.Woodfire;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[0].toLowerCase()).toContain('wood fire heater');
            expect(summary[0].toLowerCase()).not.toContain('other wood fire heater');
        });

        it('should always have nothing on the second line', () => {
            homeProfile.typeOfDuctedHeating = DuctedHeatingType.Gas;
            homeProfile.typeOfOtherHeating = OtherHeatingType.Woodfire;
            summary = sut.summarisePage(HomeProfilePage.Heating);
            expect(summary[1]).toBe('');
        });
    });

    describe('hotWaterSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should say, on the first line, the type of hot water if there is one', () => {
            homeProfile.hotWaterType = HotWaterType.SolarGasBoost;
            summary = sut.summarisePage(HomeProfilePage.HotWater);
            expect(summary[0].toLowerCase()).toContain('hot water');
        });

        it('should say `not sure` if not sure of hot water', () => {
            homeProfile.hotWaterType = HotWaterType.NotSure;
            summary = sut.summarisePage(HomeProfilePage.HotWater);
            expect(summary[0].toLowerCase()).toContain('not sure');
        });

        it('should have nothing on the first line if no details specified', () => {
            summary = sut.summarisePage(HomeProfilePage.HotWater);
            expect(summary[0]).toBe('');
        });

        it('should always have nothing on the second line', () => {
            homeProfile.hotWaterType = HotWaterType.SolarGasBoost;
            summary = sut.summarisePage(HomeProfilePage.HotWater);
            expect(summary[1]).toBe('');
        });
    });

    describe('fridgeAndFreezerSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on the first line, and second line, if no details is specified', () => {
            summary = sut.summarisePage(HomeProfilePage.FridgeAndFreezer);
            expect(summary[0]).toBe('');
            expect(summary[1]).toBe('');
        });

        it('should say `No fridge` on the first line, if first fridge type is `None`', () => {
            homeProfile.mainFridgeType = FridgeType.None;
            summary = sut.summarisePage(HomeProfilePage.FridgeAndFreezer);
            expect(summary[0]).toBe('No fridge');
        });

        it('should say, on the first line, the details of first fridge if details are available', () => {
            homeProfile.mainFridgeType = FridgeType.SideBySide;
            homeProfile.mainFridgeAge = FridgeAge.MoreThan10Yrs;
            summary = sut.summarisePage(HomeProfilePage.FridgeAndFreezer);

            expect(summary[0]).toBe('11+ yr old side-by-side fridge');
        });

        it('should say, on the second line, the details of second fridge details if details are available', () => {
            homeProfile.mainFridgeType = FridgeType.SideBySide;
            homeProfile.hasSecondaryFridge = true;
            homeProfile.secondaryFridgeType = FridgeType.Freezer;
            homeProfile.secondaryFridgeAge = FridgeAge.UpTo5Yrs;
            summary = sut.summarisePage(HomeProfilePage.FridgeAndFreezer);

            expect(summary[1]).toBe('0-5 yr old freezer');
        });
    });

    describe('ovenAndCooktopSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on first line if no details provided', () => {
            summary = sut.summarisePage(HomeProfilePage.Cooking);

            expect(summary[0]).toBe('');
        });

        it('should have `Electric oven` on the first line and `Gas cooktop` on the second line', () => {
            homeProfile.ovenType = OvenType.Elec;
            homeProfile.cooktopType = CooktopType.Gas;
            summary = sut.summarisePage(HomeProfilePage.Cooking);
            expect(summary[0].toLowerCase()).toBe('electric oven');
            expect(summary[1].toLowerCase()).toBe('gas cooktop');
        });

        it('should say type of oven on first line if there is an oven', () => {
            homeProfile.ovenType = OvenType.Elec;
            summary = sut.summarisePage(HomeProfilePage.Cooking);
            expect(summary[0].toLowerCase()).toContain('electric oven');
        });

        it('should say `No oven` if oven type selected is none', () => {
            homeProfile.ovenType = OvenType.None;
            summary = sut.summarisePage(HomeProfilePage.Cooking);
            expect(summary[0].toLowerCase()).toContain('no oven');
        });

        it('should type of cooktop on first line if there is a cooktop', () => {
            homeProfile.cooktopType = CooktopType.Gas;
            summary = sut.summarisePage(HomeProfilePage.Cooking);
            expect(summary[0].toLowerCase()).toContain('gas cooktop');
        });

        it('should say `no cooktop` if cooktype selected is none', () => {
            homeProfile.cooktopType = CooktopType.None;
            summary = sut.summarisePage(HomeProfilePage.Cooking);
            expect(summary[0].toLowerCase()).toContain('no cooktop');
        });
    });

    describe('otherElectricalItemsSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should have nothing on first line if no details provided', () => {
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);

            expect(summary[0]).toBe('');
        });

        it('should say number of TV on first line if specified', () => {
            homeProfile.numberOfTelevisions = 3;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0]).toContain('3+ TVs');
        });

        it('should always have nothing on second line', () => {
            homeProfile.numberOfTelevisions = 3;
            homeProfile.hasWashingMachine = true;
            homeProfile.hasClothesDryer = true;
            homeProfile.hasDishwasher = true;
            homeProfile.hasMicrowave = true;
            homeProfile.hasElectricalVehicle = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[1]).toBe('');
        });

        it('should say `1 TV` if there is just 1', () => {
            homeProfile.numberOfTelevisions = 1;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0]).toContain('1 TV');
            expect(summary[0]).not.toContain('1 TVs');
        });

        it('should say nothing about TVs if not specified', () => {
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0]).not.toContain('TV');
        });

        it('should say `washing machine` if there is a washing machine', () => {
            homeProfile.hasWashingMachine = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).toContain('washing machine');
        });

        it('should not say `washing machine` if there is none', () => {
            homeProfile.hasWashingMachine = false;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).not.toContain('washing machine');
        });

        it('should say `clothes dryer` if there is a clothes dryer', () => {
            homeProfile.hasClothesDryer = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).toContain('clothes dryer');
        });

        it('should not say `clothes dryer` if there is none', () => {
            homeProfile.hasClothesDryer = false;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).not.toContain('clothes dryer');
        });

        it('should say `dishwasher` if there is a dishwasher', () => {
            homeProfile.hasDishwasher = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).toContain('dishwasher');
        });

        it('should not say `dishwasher` if there is none', () => {
            homeProfile.hasDishwasher = false;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).not.toContain('dishwasher');
        });

        it('should say `microwave` if there is a microwave', () => {
            homeProfile.hasMicrowave = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).toContain('microwave');
        });

        it('should not say `microwave` if there is none', () => {
            homeProfile.hasMicrowave = false;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).not.toContain('microwave');
        });

        it('should say `electric vehicle` if there is an electric vehicle', () => {
            homeProfile.hasElectricalVehicle = true;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).toContain('electric vehicle');
        });

        it('should not say `electric vehicle` if there is none', () => {
            homeProfile.hasElectricalVehicle = false;
            summary = sut.summarisePage(HomeProfilePage.OtherElectricalItems);
            expect(summary[0].toLowerCase()).not.toContain('electric vehicle');
        });
    });

    describe('poolAndSpaSummary()', () => {
        beforeEach(() => {
            sut.forProfile(homeProfile);
        });

        it('should say pool details on first line if pool details are specified', () => {
            homeProfile.hasPool = true;
            homeProfile.poolSize = PoolSize.ExtraLarge;
            homeProfile.poolHeaterType = PoolHeaterType.Solar;
            homeProfile.poolPumpAge = PoolPumpAge.UpTo5Yrs;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).toContain('pool');
            expect(summary[0].toLowerCase()).toContain('extra large');
            expect(summary[0].toLowerCase()).toContain('solar-heated');
            expect(summary[0].toLowerCase()).toContain('0-5 yr old pump');
        });

        it('should say `No pool` on first line if `No` is selected for `Has pool`', () => {
            homeProfile.hasPool = false;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0]).toBe('No pool');
        });

        it('should not say pool size if there is no pool size selected', () => {
            homeProfile.hasPool = true;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).toBe('pool'); // That is, the word `pool` is not preceeded by the pool size.
        });

        it('should not say pool size if pool size selected is `Not sure`', () => {
            homeProfile.hasPool = true;
            homeProfile.poolSize = PoolSize.NotSure;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).toBe('pool'); // That is, the word `pool` is not preceeded by the pool size.
        });

        it('should not say `heated` if no pool heating', () => {
            homeProfile.hasPool = true;
            homeProfile.poolHeaterType = PoolHeaterType.None;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).not.toContain('heated');
        });

        it('should just say `heated pool` if pool heating type selected is `Not sure`', () => {
            homeProfile.hasPool = true;
            homeProfile.poolHeaterType = PoolHeaterType.NotSure;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).toContain('heated pool');
            expect(summary[0].toLowerCase()).not.toContain('-heated pool');
        });

        it('should say nothing about the pool pump if pump age is specified', () => {
            homeProfile.hasPool = true;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).not.toContain('pump');
        });

        it('should say nothing about the pool pump if not sure of pump age', () => {
            homeProfile.hasPool = true;
            homeProfile.poolPumpAge = PoolPumpAge.NotSure;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0].toLowerCase()).not.toContain('pump');
        });

        it('should say `Spa` on second line if property has spa and pool', () => {
            homeProfile.hasPool = true;
            homeProfile.hasSpa = true;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[1]).toBe('Spa');
        });

        it('should say `Spa` on first line if property has spa and no details about pool', () => {
            homeProfile.hasSpa = true;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary[0]).toBe('Spa');
        });

        it('should say `No spa` on second line if No is selected for `Has spa`', () => {
            homeProfile.hasPool = true;
            homeProfile.hasSpa = false;
            summary = sut.summarisePage(HomeProfilePage.PoolAndSpa);

            expect(summary.join(' ')).toContain('No spa');
        });

    });
});
