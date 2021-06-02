import { PropertyType } from './../homeProfileViewModel';
import { AddBankAccountResultMessage } from './../../../../../shared/messages/addBankAccountResult.message';
import { I18nPluralPipe, NgLocaleLocalization } from '@angular/common';
import { Locale }  from '../../../../../shared/globals/localisation';
import { HomeProfile } from './../../../../../../../e2e/myAccount/pageObjects/homeProfile';
import { HomeProfileViewModel, HotWaterType, DuctedHeatingType, FridgeType, OtherHeatingType, PoolHeaterType, OvenType, CooktopType, PoolSize, PoolPumpAge } from '../homeProfileViewModel';
import { HomeProfilePage } from '../homeProfileNavigation.service';
import { HomeProfileOptions, NumericSegmentedButtonOption, GroupedRadioOption } from '../homeProfileOptions';

export class HomeProfileSummaryService {

    private pluralPipe = new I18nPluralPipe(new NgLocaleLocalization(Locale.DEFAULT));
    private profile: HomeProfileViewModel;
    private summarizers = {
        [HomeProfilePage.YourHome]: () => this.yourHomeSummary(),
        [HomeProfilePage.Cooling]: () => this.coolingSummary(),
        [HomeProfilePage.Heating]: () => this.heatingSummary(),
        [HomeProfilePage.HotWater]: () => this.hotWaterSummary(),
        [HomeProfilePage.FridgeAndFreezer]: () => this.fridgeAndFreezerSummary(),
        [HomeProfilePage.Cooking]: () => this.ovenAndCooktopSummary(),
        [HomeProfilePage.OtherElectricalItems]: () => this.otherElectricalItemsSummary(),
        [HomeProfilePage.PoolAndSpa]: () => this.poolAndSpaSummary(),
    };

    // The hash symbol (#) in the maps (right) are placeholders for the number/count (e.g, '# child' becomes '1 child').
    // The hash symbol in the keys (left) serves no purpose except to convey meaning in code. For example,
    // this.pluralize('# child', 2) will return '2 children' as opposed to only 'children', whilst
    // this.pluralize('heater', 2) will only return 'heaters' instead of '2 heaters').
    private pluralMaps = {
        '# bedroom': { '=0': 'no bedroom', 'other': '# bedroom' },
        '# bathroom': { '=0': 'no bathroom', 'other': '# bathroom' },
        '# adult': { '=0': 'no adults', '=1': '1 adult', 'other': '# adults' },
        '# child': { '=0': 'no children', '=1': '1 child', 'other': '# children' },
        'heater': { '=0': '', '=1': 'heater', 'other': 'heaters' },
        'conditioner': { '=0': '', '=1': 'conditioner', 'other': 'conditioners' },
        '# fan': { '=0': '', '=1': '1 fan', 'other': '# fans' },
        '# TV': { '=0': '', '=1': '1 TV', 'other': '# TVs' },
    };

    public forProfile(profile: HomeProfileViewModel): HomeProfileSummaryService {
        this.profile = profile;
        return this;
    }

    public summarisePage(page: HomeProfilePage): [string, string] {
        const summarizer = page ? this.summarizers[page] : null;
        if (!summarizer) {
            throw new Error('Invalid page argument');
        }
        return this.summarizers[page]();
    }

    public yourHomeSummary(): [string, string] {
        let summaries: string[] = [];
        let summaryLine1: string = '';
        let summaryLine2: string = '';
        let summaryText: string;
        if (this.profile && this.profile.propertyType) {
            const propertyType = this.getOptionByStringValue(HomeProfileOptions.homeTypes, this.profile.propertyType);
            // Force 'no bedroom' or 'no bathroom' if nothing selected, and there is a property type
            // Do this by sending a zero to the pipe, if the numberOfxxx is null.
            summaries.push(
                this.swapNumericOptionValueForText(
                    this.pluralize('# bedroom', this.profile.numberOfBedrooms || 0),
                    this.getOptionByNumericValue(HomeProfileOptions.numberOfBedroomOptions, this.profile.numberOfBedrooms)));
            summaries.push(
                this.swapNumericOptionValueForText(
                    this.pluralize('# bathroom', this.profile.numberOfBathrooms || 0),
                    this.getOptionByNumericValue(HomeProfileOptions.numberOfBathroomOptions, this.profile.numberOfBathrooms)));
            summaryLine1 = summaries.filter((summary) => !!summary).join(', ') + (propertyType ? ' ' + propertyType.text.toLowerCase() : '');
            summaryLine1 = summaryLine1.trim();
        }
        summaries = [];
        summaries.push(
            this.swapNumericOptionValueForText(
                this.pluralize('# adult', this.profile.numberOfAdults),
                this.getOptionByNumericValue(HomeProfileOptions.numberOfBedroomOptions, this.profile.numberOfAdults)));
        summaries.push(
            this.swapNumericOptionValueForText(
                this.pluralize('# child', this.profile.numberOfChildren),
                this.getOptionByNumericValue(HomeProfileOptions.numberOfChildrenOptions, this.profile.numberOfChildren)));
        summaryLine2 = summaries.filter((summary) => !!summary).join(' and ');
        if (!summaryLine1 && summaryLine2) {
            summaryLine1 = summaryLine2;
            summaryLine2 = '';
        }
        // Add a comma to line 1 if there is text on line 2.
        // This is so on mobile view, wherein these two lines are displayed inline, the comma adds a break within the statement.
        if (summaryLine1 && summaryLine2) {
            summaryLine1 += ',';
        }
        return [this.capitalizeFirstLetter(summaryLine1), this.capitalizeFirstLetter(summaryLine2)];
    }

    public coolingSummary(): [string, string] {
        let summaries: string[] = [];
        let summaryText: string;
        if (this.profile) {
            if (this.profile.numberOfSplitSystemAirconCooling) {
                summaries.push(
                    this.getTextForNumericValue(this.profile.numberOfSplitSystemAirconCooling, HomeProfileOptions.numberOfSplitAirconCoolerOptions)
                    + ' split system air '
                    + this.pluralize('conditioner', this.profile.numberOfSplitSystemAirconCooling));
            }
            if (this.profile.numberOfWallUnitAirconCooling) {
                summaries.push(
                    this.getTextForNumericValue(this.profile.numberOfWallUnitAirconCooling, HomeProfileOptions.numberOfFixedAirconCoolerOptions)
                    + ' fixed air '
                    + this.pluralize('conditioner', this.profile.numberOfWallUnitAirconCooling));
            }
            if (this.profile.hasDuctedAirconCooling) {
                summaries.push('ducted air conditioner');
            }
            if (this.profile.hasDuctedEvaporativeCooling) {
                summaries.push('ducted evaporative cooling');
            }
            if (this.profile.numberOfPortableEvaporativeCooling) {
                summaries.push(
                    this.getTextForNumericValue(this.profile.numberOfPortableEvaporativeCooling, HomeProfileOptions.numberOfEvaporativeCoolerOptions)
                    + ' portable evaporative cooling');
            }
            if (this.profile.numberOfCoolingFans) {
                summaries.push(
                    this.swapNumericOptionValueForText(
                        this.pluralize('# fan', this.profile.numberOfCoolingFans),
                        this.getOptionByNumericValue(HomeProfileOptions.numberOfFanCoolerOptions, this.profile.numberOfCoolingFans)));
            }
        }
        return [this.capitalizeFirstLetter(summaries.filter((summary) => !!summary).join(', ')), ''];
    }

    public heatingSummary(): [string, string] {
        let summaries: string[] = [];
        let summaryText: string;
        if (this.profile) {
            const ductedHeaterType = this.getOptionByStringValue(HomeProfileOptions.ductedHeatingTypes, this.profile.typeOfDuctedHeating);
            const otherHeaterType = this.getOptionByStringValue(HomeProfileOptions.otherHeatingTypes, this.profile.typeOfOtherHeating);
            if (this.profile.typeOfDuctedHeating && this.profile.typeOfDuctedHeating !== DuctedHeatingType.None && ductedHeaterType) {
                summaries.push(`${ductedHeaterType.text.toLowerCase()} ducted heater`);
            }
            if (this.profile.numberOfHeatingSplitSystems) {
                summaries.push(
                    this.getTextForNumericValue(this.profile.numberOfHeatingSplitSystems, HomeProfileOptions.numberOfSplitSystemHeaterOptions)
                    + ' split system '
                    + this.pluralize('heater', this.profile.numberOfHeatingSplitSystems));
            }
            if (this.profile.numberOfPortableElecHeaters) {
                summaries.push(
                    this.getTextForNumericValue(this.profile.numberOfPortableElecHeaters, HomeProfileOptions.numberOfPortableElectricHeaterOptions)
                    + ' portable '
                    + this.pluralize('heater', this.profile.numberOfPortableElecHeaters));
            }
            if (this.profile.typeOfOtherHeating && this.profile.typeOfOtherHeating !== OtherHeatingType.None && otherHeaterType) {
                if (otherHeaterType.value === OtherHeatingType.Woodfire) {
                    summaries.push(`${otherHeaterType.text.toLowerCase()} heater`);
                } else {
                    summaries.push(`other ${otherHeaterType.text.toLowerCase()} heater`);
                }
            }
        }
        const summaryLine1 = summaries.filter((summary) => !!summary).join(', ').replace(/electricity/g, 'electric');
        return [this.capitalizeFirstLetter(summaryLine1), ''];
    }

    public hotWaterSummary(): [string, string] {
        let summary: string = '';
        if (this.profile && this.profile.hotWaterType) {
            const hotWater = this.getOptionByStringValue(HomeProfileOptions.hotWaterTypes, this.profile.hotWaterType);
            if (hotWater) {
                summary = (this.profile.hotWaterType !== HotWaterType.NotSure) ? hotWater.text + ' hot water' : 'Not sure';
            }
        }
        return [this.capitalizeFirstLetter(summary), ''];
    }

    public fridgeAndFreezerSummary(): [string, string] {
        let summaryLine1: string = '';
        let summaryLine2: string = '';
        let summaries: string[] = [];
        let fridgeType;
        let fridgeAge;
        if (this.profile) {
            if (this.profile.mainFridgeType) {
                if (this.profile.mainFridgeType === FridgeType.None) {
                    summaryLine1 = 'no fridge';
                } else {
                    fridgeType = this.getOptionByStringValue(HomeProfileOptions.fridgeTypeSelections, this.profile.mainFridgeType);
                    fridgeAge = this.getOptionByStringValue(HomeProfileOptions.fridgeAgeSelections, this.profile.mainFridgeAge);
                    summaries = [
                        ... (fridgeAge ? [fridgeAge.text.replace('yrs', 'yr old')] : []),
                        ... (fridgeType ? [fridgeType.text.toLowerCase().replace('freezer only', 'freezer')] : [])
                    ];
                    summaryLine1 = summaries.filter((summary) => !!summary).join(' ');
                    if (this.profile.hasSecondaryFridge && this.profile.secondaryFridgeType && this.profile.secondaryFridgeType !== FridgeType.None) {
                        fridgeType = this.getOptionByStringValue(HomeProfileOptions.fridgeTypeSelections, this.profile.secondaryFridgeType);
                        fridgeAge = this.getOptionByStringValue(HomeProfileOptions.fridgeAgeSelections, this.profile.secondaryFridgeAge);
                        summaries = [
                            ... (fridgeAge ? [fridgeAge.text.replace('yrs', 'yr old')] : []),
                            ... (fridgeType ? [fridgeType.text.toLowerCase().replace('freezer only', 'freezer')] : [])
                        ];
                        summaryLine2 = summaries.filter((summary) => !!summary).join(' ');
                    }
                }
            }

        }
        return [ this.capitalizeFirstLetter(summaryLine1), this.capitalizeFirstLetter(summaryLine2) ];
    }

    public ovenAndCooktopSummary(): [string, string] {
        let summaryLine1: string = '';
        let summaryLine2: string = '';

        if (this.profile) {
            const ovenType = this.getOptionByStringValue(HomeProfileOptions.ovenTypeOptions, this.profile.ovenType);
            const cooktopType = this.getOptionByStringValue(HomeProfileOptions.cooktopTypeOptions, this.profile.cooktopType);

            if (this.profile.ovenType  && ovenType) {
                summaryLine1 = this.profile.ovenType === OvenType.None ? `no oven` : `${ovenType.text.toLowerCase()} oven`;
            }
            if (this.profile.cooktopType && cooktopType) {
                summaryLine2 = this.profile.cooktopType === CooktopType.None ? `no cooktop` : `${cooktopType.text.toLowerCase()} cooktop`;
            }
            if (!summaryLine1 && summaryLine2) {
                [summaryLine1, summaryLine2] = [summaryLine2, ''];
            }
        }
        return [ this.capitalizeFirstLetter(summaryLine1), this.capitalizeFirstLetter(summaryLine2) ];
    }

    public otherElectricalItemsSummary(): [string, string]  {
        let summaries: string[] = [];
        if (this.profile) {
            const numberOfTelevisions = this.swapNumericOptionValueForText(
                this.pluralize('# TV', this.profile.numberOfTelevisions),
                this.getOptionByNumericValue(HomeProfileOptions.numberOfTelevisionOptions, this.profile.numberOfTelevisions));
            summaries = [
                ... ([numberOfTelevisions]),
                ... (this.profile.hasWashingMachine ? ['washing machine'] : []),
                ... (this.profile.hasClothesDryer ? ['clothes dryer'] : []),
                ... (this.profile.hasDishwasher ? ['dishwasher'] : []),
                ... (this.profile.hasMicrowave ? ['microwave'] : []),
                ... (this.profile.hasElectricalVehicle ? ['electric vehicle'] : [])
            ];
        }
        return [ this.capitalizeFirstLetter(summaries.filter((summary) => !!summary).join(', ')), '' ];
    }

    public poolAndSpaSummary(): [string, string] {
        let summaryLine1: string = '';
        let summaryLine2: string = '';
        if (this.profile) {

            // Add details about pool if available
            if (this.profile.hasPool) {
                let summaries: string[] = [];
                const poolSize = this.getOptionByStringValue(HomeProfileOptions.poolSizes, this.profile.poolSize);
                if (this.profile.poolSize && this.profile.poolSize !== PoolSize.NotSure && poolSize) {
                    summaries.push(poolSize.text.substring(0, poolSize.text.indexOf(' ')).toLowerCase().replace('x-large', 'extra large'));
                }
                const poolHeaterType = this.getOptionByStringValue(HomeProfileOptions.poolHeaterTypes, this.profile.poolHeaterType);
                if (this.profile.poolHeaterType && poolHeaterType) {
                    if (this.profile.poolHeaterType === PoolHeaterType.NotSure) {
                        summaries.push('heated');
                    } else if (this.profile.poolHeaterType !== PoolHeaterType.None) {
                        summaries.push(poolHeaterType.text.toLowerCase() + '-heated');
                    }
                }
                if (this.profile.poolPumpAge && this.profile.poolPumpAge !== PoolPumpAge.NotSure) {
                    const poolPumpAge = this.getOptionByStringValue(HomeProfileOptions.poolPumpAge, this.profile.poolPumpAge);
                    if (poolPumpAge) {
                        summaries.push('pool, ' + poolPumpAge.text.replace('yrs', 'yr old') + ' pump');
                    } else {
                        summaries.push('pool');
                    }
                } else {
                    summaries.push('pool');
                }
                summaryLine1 = summaries.join(' ');
            } else if (this.profile.hasPool === false) {
                summaryLine1 = 'No pool';
            }

            // Add details about spa if available
            if (this.profile.hasSpa) {
                summaryLine2 = 'Spa';
            } else if (this.profile.hasSpa === false) {
                summaryLine2 = 'No spa';
            }

            if (!summaryLine1 && summaryLine2) {
                summaryLine1 = summaryLine2;
                summaryLine2 = '';
            }
        }
        return [ this.capitalizeFirstLetter(summaryLine1), summaryLine2 ];
    }

    private capitalizeFirstLetter(text: string) {
        return text.length > 0 ? (text[0].toUpperCase() + text.slice(1)) : '';
    }

    private pluralize(mapKey: string, count: number) {
        const map = this.pluralMaps[mapKey];
        return map ? this.pluralPipe.transform(count, map) : '';
    }

    private swapNumericOptionValueForText(text: string, option: NumericSegmentedButtonOption): string {
        return option ? text.replace(option.value.toString(), option.text) : text;
    }

    private getTextForNumericValue(value: number, valueOptions: NumericSegmentedButtonOption[]): string {
        const option = valueOptions.find((valueOption) => valueOption.value === value);
        return option ? option.text : '';
    }

    private getOptionByNumericValue(options: NumericSegmentedButtonOption[], value: number): NumericSegmentedButtonOption {
        return value && options ? options.find((option) => option.value === value) : null;
    }

    private getOptionByStringValue(options: GroupedRadioOption[], value: string): GroupedRadioOption {
        return value && options ? options.find((option) => option.value === value) : null;
    }
}
