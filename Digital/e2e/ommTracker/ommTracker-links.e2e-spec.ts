import { ProtractorExtensions } from '../../src/app/shared/e2e/protractor.extensions';
import { ommTrackerObject } from '../ommTracker/myAccount.e2e-ommtracker';
import { browser, by, element, $, $$ } from 'protractor';

let e2e = new ProtractorExtensions();
let ommTracker = new ommTrackerObject();
let now = new Date('2016-04-28');
describe('OMMTracker', () => {

    beforeAll(() => {
        let mockData = {

            'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68F7'
        };
        e2e.openPage('/overview', 'desktop', mockData)
        console.log(mockData);
    });

    describe('To verify the Links in the Overview page for OMM', () => {
        it('Should display the correct label for Move Home', () => {
            expect(ommTracker.jumpLinkButton.getText()).toBe('MOVE HOME');
        });
        // it('Should navigate to the correct URL for Move Home', () => {
        //     ommTracker.jumpLinkButton.click().then(function () {
        //         ommTracker.checkNavigation('apps/one-minute-move');
        //     });
        // });
    });
});

describe('OMMTracker', () => {
    beforeAll(() => {
        let mockData = {

            'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68E3'
        };
        e2e.openPage('/overview', 'desktop', mockData)
        console.log(mockData);
    });

    describe('To verify the Links in the Overview page for OMM', () => {
        it('Should display the correct label for Track my move', () => {
            expect(ommTracker.jumpLinkButton.getText()).toBe('TRACK MY MOVE');
        });
        it('Should navigate to the correct URL for Track my move', () => {
            ommTracker.jumpLinkButton.click().then(function () {
                ommTracker.checkNavigation('ommtracker');
            });
        });

    });
});

describe('OMMTracker', () => {

    beforeAll(() => {
        let mockData = {

            'mock.businessPartner': 'AGL_E395B5CFC36FFEF18D470000C99D68E2'
        };
        e2e.openPage('/overview', 'desktop', mockData)
        console.log(mockData);
    });

    describe('To verify the Links in the Overview page for OMM', () => {
        it('Should display the correct label for rate my move', () => {
            expect(ommTracker.jumpLinkButton.getText()).toBe('RATE MY MOVE');
        });
        it('Should navigate to the correct URL for rate my move', () => {
            ommTracker.jumpLinkButton.click().then(function () {
                ommTracker.checkNavigation('ommtracker');
            });
        });
    });
});




