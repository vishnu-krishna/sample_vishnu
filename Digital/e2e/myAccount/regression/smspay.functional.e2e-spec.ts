// import { browser, by, element, $, $$ } from 'protractor';
// import { Context } from '../../context';
// import { OverviewPage } from '../pageObjects/overviewPage';
// import { Pages } from '../../pages';
// import { settings } from '../pageObjects/settings';
// import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';

// describe('sms pay feature functional', () => {

//     let user;
//     let currentAccount;
//     let currentElectricityContract;
//     let currentGasContract;
//     let context: Context;
//     let overview: OverviewPage;

//     beforeAll(() => {
//         context = new Context(browser.params.environment);
//         overview = new OverviewPage(context);
//     });
//     describe('with the default user', () => {
//         beforeAll(() => {
//             user = context.getUser('DEFAULT');
//             currentAccount = user.accounts[0];
//             currentElectricityContract = currentAccount.contracts.electricity[0];
//             currentGasContract = currentAccount.contracts.gas[0];
//             return context.authenticateAsUser(user);

//         });
//         describe('when SMS pay feature toggle is on', () => {
//             beforeAll(() => {
//                 context.setFeatureFlag(FeatureFlagTypes.smsPayEnabled, true);
//                 overview.navigate();
//             });
//             it('"SMS Pay is here" text should be displayed', () => {
//                 expect(overview.smsPay.smsPayIsHere.isPresent()).toBeTruthy();
//             });
//             it('SMS Pay subtext should be displayed', () => {
//                 expect(overview.smsPay.smsPaySubText.isPresent()).toBeTruthy();
//             });
//             it('Set up SMS Pay button should be displayed', () => {
//                 expect(overview.smsPay.smsPayButton.isPresent()).toBeTruthy();
//             });

//             describe('Navigate to Manage Account', () => {
//                 beforeAll(() => {
//                     settings.manageAccountHeaderLink.click();
//                 });
//                 it('SMS Pay tile should be present', () => {
//                     expect(settings.smsPay.smsPayTile.isPresent()).toBeTruthy();
//                     settings.smsPay.smsPayTile.click();
//             });

//             });

//         });

//     });
//     // change to after all???
//     // move reference from smoke test
//     // create regression e2e test for bamboo
//     it('should logout', () => {
//         context.logout();
//     });
// });
