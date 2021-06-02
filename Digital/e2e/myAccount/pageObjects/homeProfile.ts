import { browser, by, element, $, $$, ExpectedConditions, promise } from 'protractor';
import * as protractor from 'protractor';
import { ElementFinder } from 'protractor/built/element';
import { Context } from '../../context';
import { prototype } from 'form-data';
import { settings } from './settings';
import * as waits from '../../utilities/waits';
import * as scroll from '../../utilities/scrollHelper';
import { camelCase } from 'lodash';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';

export enum PageHeader {
    landingPageHeader = 'Home Profile',
    yourHomeHeader = 'Your home',
    coolingHeader = 'Cooling',
    heatingHeader = 'Heating',
    hotWaterHeader = 'Hot water',
    fridgeAndFreezerHeader = 'Fridge and freezer',
    ovenAndCooktopHeader = 'Oven and cooktop',
    otherElectricalItemsHeader = 'Other electrical items',
    poolAndSpaHeader = 'Pool and spa',
}

export class HomeProfile {

    public setFeatureFlag(value: boolean): promise.Promise<any> {
        return this.currentContext.setFeatureFlag(FeatureFlagTypes.homeProfileEnabled, value);
    }

    public nextButton = 'Next';
    public closeButton = 'Close';
    public saveAndCloseButton = 'Save and close';
    public backButton = 'Back';

    public homeProfileLink = $('.settings-desktop-left-menu--settings-homeprofile');
    public segmentedButtons = 'agl-maui-segmented-button';
    public radioButton = '[type="radio"]';
    public currentContext: Context;
    public testDataAttr = (value: string) => `[data-test="${value}"]`;

    public introPage = {
        homeProfileLandingHeader: $('.homeprofile-landing__header'),
        startOrManageHomeProfileButton: $('agl-maui-button'),
        contractAddress: $('.homeprofile-landing__address-body'),
        waitForIntroPage(): any {
            return waits.waitForVisibilityOf(this.homeProfileLandingHeader);
        },

        headerText(): any {
            this.waitForIntroPage();
            return this.homeProfileLandingHeader.getText();
        },

        clickStartOrManageHomeProfileButton(): any {
            waits.waitToBeClickable(this.startOrManageHomeProfileButton);
            return this.startOrManageHomeProfileButton.click();
        },

        getContractAddress(): any {
            waits.waitForVisibilityOf(this.contractAddress);
            return this.contractAddress.getText();
        },

        getQuestionnaireIconElement(iconName: string): ElementFinder {
            return $(`.homeprofile-section-icon-${iconName}`);
        },
        clickQuestionnaireIcon(iconName: string): any {
            waits.waitForVisibilityOf(this.getQuestionnaireIconElement(iconName));
            return this.getQuestionnaireIconElement(iconName).click();
        }
    };

    public questionnairePages = {
        mainHeader: $('.maui-heading__main'),
        primaryButton: $('.maui-button--primary'),
        saveAndCloseButton: $(this.testDataAttr('save-and-close')),
        backButton: $('.maui-navigation__back-option'),
        progressBar: $('agl-maui-page-progress-bar'),

        waitForPageHeader(): any {
            return waits.waitForElement(this.mainHeader);
        },

        getMainHeaderText(): any {
            this.waitForPageHeader();
            return this.mainHeader.getText();
        },

        clickButton(buttonName: string): protractor.promise.Promise<any> {

            let primaryButton = this.primaryButton;
            let clickPrimaryButton = () => {
                waits.waitForVisibilityOf(primaryButton);
                scroll.intoElementView(primaryButton);
                return primaryButton.click();
            };

            let scrollToShowSecondaryNav = () => {
                scroll.toPageBottom();
                return scroll.toPageTop().then(() => {
                    let hiddenSecondaryNav = $('.ng-star-inserted .maui-navigation--hidden');
                    waits.waitForInvisibilityOf(hiddenSecondaryNav);
                });
            };

            const buttonMapper = {
                next: (): any => clickPrimaryButton(),
                close: (): any => clickPrimaryButton(),
                back: (): any => scrollToShowSecondaryNav().then(this.backButton.click()),
                saveAndClose: (): any => {
                    waits.waitForElement(this.saveAndCloseButton);
                    return this.saveAndCloseButton.click();
                }
            };

            return buttonMapper[camelCase(buttonName)]();
        },

        getCurrentPageFromProgressBar(): any {
            return this.progressBar.$('.maui-page-progress-bar__page-number').getText();
        },

        getTotalPagesFromProgressBar(): any {
            return this.progressBar.$('.maui-page-progress-bar__page-total').getText();
        }
    };

    public chooseYourServicePage = {
        address: '.homeprofile-select__address',
        contractStarted: this.testDataAttr('contracts-already-started'),
        contractNotStarted: this.testDataAttr('contracts-not-started'),
        isAddressPresent: (totalAddresses: protractor.ElementArrayFinder, address: string) => {
            return totalAddresses.reduce((accumulator, addressElement) => (addressElement.getText().then((text) => (accumulator || (text === address)))), false);
        },
        clickAddress: (address: string) => {
            let totalAddresses = $$(this.chooseYourServicePage.address);
            return totalAddresses.filter((addressElement, index) => (addressElement.getText().then((text) => (text === address)))).first().click();
        },
        isContractStartedForAddress: (address: string) => {
            let totalAddresses = $(this.chooseYourServicePage.contractStarted).$$(this.chooseYourServicePage.address);
            return this.chooseYourServicePage.isAddressPresent(totalAddresses, address);
        },
        isContractNotStartedForAddress: (address: string) => {
            let totalAddresses = $(this.chooseYourServicePage.contractNotStarted).$$(this.chooseYourServicePage.address);
            return this.chooseYourServicePage.isAddressPresent(totalAddresses, address);
        },
    };

    public yourHomePage = {
        totalHomeProfileLabels: $$('.maui-radio-button-label-container'),
        numberOfPeopleHeadings: $$('.homeprofile-yourhome__number-of-people-header'),
        numOfBedOrBathLabel: '.homeprofile-reveal-section__heading',
        numberOfBedrooms: this.testDataAttr('number-of-bedrooms'),
        numberOfBathrooms: this.testDataAttr('number-of-bathrooms'),
        numberOfAdults: $(this.testDataAttr('number-of-adults')),
        numberOfChildren: $(this.testDataAttr('number-of-children')),

        getAllHomeTypeOptions: (): any => {
            return $$(this.radioButton);
        },

        getHomeTypeParentContainerElement: (homeType: string): ElementFinder => {
            let parentContainer = `${this.testDataAttr(homeType)} .maui-radio-button-container`;
            return $(parentContainer);
        },

        getTypeOfHomeRadioBtnElement: (homeType: string): ElementFinder => {
            let radioElement = this.yourHomePage.getHomeTypeParentContainerElement(homeType).$(this.radioButton);
            waits.waitForElement(radioElement);
            return radioElement;
        },

        selectWhatKindOfHomeRadioButton: (homeType: string): any => {
            this.yourHomePage.getTypeOfHomeRadioBtnElement(homeType).click();
            return waits.waitForVisibilityOf(this.yourHomePage.getHomeTypeParentContainerElement(homeType).$$(this.yourHomePage.numOfBedOrBathLabel).get(0));
        },

        getNumberOfBedroomsElement: (homeType: string, totalNumber: string): ElementFinder => {
            let numOfBedContainer = this.yourHomePage.getHomeTypeParentContainerElement(homeType).$(this.yourHomePage.numberOfBedrooms);
            waits.waitForElement(numOfBedContainer);
            return this.getSegmentedBtnByNumber(totalNumber, numOfBedContainer.$$(this.segmentedButtons), 0);
        },

        getNumberOfBathroomsElement: (homeType: string, totalNumber: string): ElementFinder => {
            let numOfBathContainer = this.yourHomePage.getHomeTypeParentContainerElement(homeType).$(this.yourHomePage.numberOfBathrooms);
            waits.waitForElement(numOfBathContainer);
            return this.getSegmentedBtnByNumber(totalNumber, numOfBathContainer.$$(this.segmentedButtons), 0);
        },

        getNumberOfAdultsElement: (totalNumber: string): ElementFinder => {
            waits.waitForVisibilityOf(this.yourHomePage.numberOfAdults);
            return this.getSegmentedBtnByNumber(totalNumber, this.yourHomePage.numberOfAdults.$$(this.segmentedButtons), 1);
        },

        getNumberOfChildrenElement: (totalNumber: string): ElementFinder => {
            waits.waitForVisibilityOf(this.yourHomePage.numberOfChildren);
            return this.getSegmentedBtnByNumber(totalNumber, this.yourHomePage.numberOfChildren.$$(this.segmentedButtons), 0);
        },

        questionLabelsUnderHomeTypeElement: (homeType: string): any => {
            let parentElement = this.yourHomePage.getHomeTypeParentContainerElement(homeType);
            return parentElement.$$(this.yourHomePage.numOfBedOrBathLabel);
        },
        isYourHomeSegmentedBtnSelected: (segmentedBtnElement: ElementFinder): boolean => this.isSegmentedBtnSelected(segmentedBtnElement),

    };

    public confirmationPage = {
        mainHeader: $('.homeprofile-heading'),
        thankYouBanner: $('.maui-confirmation-banner-content-item-text')
    };

    public coolingPage = {
        getSegmentedBtnByValue: (coolingTypeOption: string, value: string): ElementFinder => this.getSegmentedBtnByValue(coolingTypeOption, value),
        isSegmentedBtnSelected: (coolingTypeOption: string, value: string): boolean => this.isSegmentedBtnSelected(this.coolingPage.getSegmentedBtnByValue(coolingTypeOption, value))
    };

    public fridgeAndFreezerPage = {
        addAnotherFridgeParentElement: $('.homeprofile-fridge__add-secondary-fridge'),
        closeAnotherFridgeElement: $('.homeprofile-fridge__secondary-fridge-header-icon'),
        getAddAnotherFridgeElement: (): ElementFinder => {
            return this.fridgeAndFreezerPage.addAnotherFridgeParentElement.$('span');
        },
        isAddAnotherFridgeEnabled: (): boolean => {
            let isEnabled;
            isEnabled = this.fridgeAndFreezerPage.addAnotherFridgeParentElement.getAttribute('class').then((value) => {
                return (value.includes('disable')) ? false : true;
            });
            return isEnabled;
        },

        getFridgeTypeSpecificElement: (fridgeType: string, primaryOrSecondary: string, typeOfElement: string): ElementFinder => {
            let primaryParent = this.testDataAttr('mainFridgeRadioGroup');
            let secondaryParent = this.testDataAttr('secondaryFridgeRadioGroup');
            let segmentedButton = `.homeprofile-fridge__segmented-button`;
            let fridgeLabel = `.maui-radio-button-label-container`;
            let fridgeTypeElement = this.testDataAttr(fridgeType);

            const fridgeMapper = {
                primary: (): ElementFinder => {
                    let primaryElement = `${primaryParent} ${fridgeTypeElement}`;
                    const elementMapper = {
                        radio: (): ElementFinder => $(`${primaryElement} ${this.radioButton}`),
                        segmentedButton: (): ElementFinder => $(`${primaryElement} ${segmentedButton}`),
                        fridgeTypeLabel: (): ElementFinder => $(`${primaryElement} ${fridgeLabel}`),
                    };
                    return elementMapper[typeOfElement]();
                },
                secondary: (): ElementFinder => {
                    let secondaryElement = `${secondaryParent} ${fridgeTypeElement}`;
                    const elementMapper = {
                        radio: (): ElementFinder => $(`${secondaryElement} ${this.radioButton}`),
                        segmentedButton: (): ElementFinder => $(`${secondaryElement} ${segmentedButton}`),
                        fridgeLabel: (): ElementFinder => $(`${secondaryElement} ${fridgeLabel}`),
                    };
                    return elementMapper[typeOfElement]();
                }
            };
            return fridgeMapper[primaryOrSecondary]();
        },
        getFridgeRadioButton: (fridgeType: string, primaryOrSecondary: string): ElementFinder => {
            return this.fridgeAndFreezerPage.getFridgeTypeSpecificElement(fridgeType, primaryOrSecondary, 'radio');
        },
        getFridgeLabelText: (fridgeType: string, primaryOrSecondary: string): any => {
            return this.fridgeAndFreezerPage.getFridgeTypeSpecificElement(fridgeType, primaryOrSecondary, 'fridgeTypeLabel').getText();
        },
        getFridgeTypeSegmentedButton: (fridgeType: string, primaryOrSecondary: string, buttonValue: string): ElementFinder => {
            return this.fridgeAndFreezerPage.getFridgeTypeSpecificElement(fridgeType, primaryOrSecondary, 'segmentedButton').$(this.testDataAttr(`${buttonValue} yrs`));
        },
        isFridgeTypeSegmentedButtonSelected: (fridgeType: string, primaryOrSecondary: string, buttonValue: string): boolean => {
            let segmentedBtn = this.fridgeAndFreezerPage.getFridgeTypeSegmentedButton(fridgeType, primaryOrSecondary, buttonValue);
            return this.isSegmentedBtnSelected(segmentedBtn);
        }
    };

    public ovenAndCooktopPage = {
        getOvenOrCooktopRadioButton: (ovenOrCooktop: string, value: string): ElementFinder => {
            let ovenOrCooktopElement = `[name="group${ovenOrCooktop}Type"] input[value="${value}"]`;
            waits.waitForElement($(ovenOrCooktopElement));
            return $(ovenOrCooktopElement);
        }
    };

    public otherElectricalItemsPage = {
        getSegmentedBtnByValue: (electricItem: string, value: string): ElementFinder => this.getSegmentedBtnByValue(electricItem, value),
        isSegmentedBtnSelected: (electricItem: string, value: string): boolean => this.isSegmentedBtnSelected(this.otherElectricalItemsPage.getSegmentedBtnByValue(electricItem, value))
    };

    public heatingPage = {
        getSegmentedBtnByValue: (heatingItem: string, value: string): ElementFinder => this.getSegmentedBtnByValue(heatingItem, value),
        isSegmentedBtnSelected: (heatingItem: string, value: string): boolean => this.isSegmentedBtnSelected(this.heatingPage.getSegmentedBtnByValue(heatingItem, value)),
        getOtherHeatingRadioButton: (value: string): ElementFinder => $(this.testDataAttr('other-heating')).$(`input[value="${value}"]`)
    };

    public hotWaterPage = {
        getHotWaterTypeRadioButton: (type: string): ElementFinder => $(`[value="${type}"]`)
    };

    public poolAndSpaPage = {
        getPoolAndSpaSegmentedBtnByValue: (pool: string, value: string): ElementFinder => this.getSegmentedBtnByValue(pool, value),
        isPoolAndSpaSegmentedBtnSelected: (pool: string, value: string): boolean => this.isSegmentedBtnSelected(this.poolAndSpaPage.getPoolAndSpaSegmentedBtnByValue(pool, value)),
        getPoolSizeHeaterTypePoolAgeRadioButton: (poolSizeOrHeaterType: string, value: string): ElementFinder => {
            let poolSizeOrHeaterTypeElement = `[name="homeprofile-poolandspa-pool-${poolSizeOrHeaterType}"] input[value="${value}"]`;
            waits.waitForElement($(poolSizeOrHeaterTypeElement));
            return $(poolSizeOrHeaterTypeElement);
        },
    };

    constructor(context: Context) {
        this.currentContext = context;
    }

    public navigateToManageAccount(): any {
        settings.manageAccountHeaderLink.click();
        waits.waitForVisibilityOf(settings.settingsContainer);
    }

    public navigateToHomeProfileIntroPage(): any {
        this.navigateToManageAccount();
        waits.waitForElement(this.homeProfileLink);
        return this.homeProfileLink.click();
    }

    public homeProfileLinkDisplayed(): any {
        return this.homeProfileLink.isDisplayed();
    }

    // Only Questionnaire Pages. Excluding Home Profile Introduction and Confirmation Page
    public navigateToPage(pageName: string): any {
        let onPage;
        let goNextPage = (text) => {
            if (text === pageName) { return text; }
            this.questionnairePages.clickButton(this.nextButton);
            this.questionnairePages.getMainHeaderText()
                .then((t) => goNextPage(t));
        };
        this.navigateToHomeProfileIntroPage();
        this.introPage.clickStartOrManageHomeProfileButton();
        this.questionnairePages.getMainHeaderText().then((text) => { onPage = goNextPage(text); });
        return onPage;
    }

    public getUrlFromNewWindow(): any {
        let url;
        browser.ignoreSynchronization = true;
        browser.getAllWindowHandles().then((handles): any => {
            return browser.switchTo().window(handles[1]);
        });
        url = browser.getCurrentUrl();
        browser.ignoreSynchronization = false;
        this.closeWindow();
        return url;
    }

    public clickOnLinkWithText(linkText: string): any {
        let linkElement = element(by.linkText(linkText));
        waits.waitForVisibilityOf(linkElement);
        scroll.intoElementView(linkElement);
        linkElement.click();
    }

    public getUrlFromText(linkText: string): any {
        return element(by.linkText(linkText)).getAttribute('href');
    }

    private getSegmentedBtnByNumber(totalNumber: string, segmentedButtonContainer: protractor.ElementArrayFinder, seriesStartFrom: number): any {
        if (![0, 1].includes(seriesStartFrom)) {
            throw Error('Series can start either from 0 or 1. Please pass the correct parameters.');
        }

        const seriesMapper = {
            0: () => totalNumber.includes('+') ? segmentedButtonContainer.last() : segmentedButtonContainer.get(parseInt(totalNumber, 10)),
            1: () => totalNumber.includes('+') ? segmentedButtonContainer.last() : segmentedButtonContainer.get((parseInt(totalNumber, 10)) - 1)
        };

        return seriesMapper[seriesStartFrom]();
    }

    // Use only if data-test attribute is present as a part of segmented buttons
    private getSegmentedBtnByValue(parentItem: string, value: string): ElementFinder {
        let segmentedElement = $(this.testDataAttr(parentItem)).$(this.testDataAttr(value));
        waits.waitForVisibilityOf(segmentedElement);
        return segmentedElement;
    }

    private isSegmentedBtnSelected(segmentedButton: ElementFinder): boolean {
        let isBtnSelected;
        isBtnSelected = segmentedButton.getAttribute('class').then((attributeValue) => attributeValue.includes('selected'));
        return isBtnSelected;
    }

    private closeWindow(): any {
        browser.driver.close();
        return browser.getAllWindowHandles().then((handles): any => {
            return browser.switchTo().window(handles[0]);
        });
    }

}
