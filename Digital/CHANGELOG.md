<a name="3.0.11"></a>

# 3.0.11 (2018-06-05) Diamond
## Features
    * UI changes (mostly alignment and wording) to the overview an bill screens
## Toggles
    * Feature Flag toggled on for `payOnTimeDiscountFixEnabled` (to show the 'bill breakdown' and 'bill date' components)

# 3.0.10.3 (2018-05-31) Diamond
## Features
    * Analytics setup for Instalment Plans
## Fixes
    * Analytics fix for deep links (CIDE)
## Toggles
    * Feature Flag toggled on for `paymentAssistanceEnabled`

# 3.0.10.1 (2018-05-31) Diamond
## Features
  * Final feature work for Instalment Plans
  * Webchat and lean engage for Instalment Plans
  * Billing and Overview panel updates for Instalment Plans

# 3.0.10 (2018-05-24) Obsidian
## Features

- Final work for Energy Insights: Phase 1 (Multi-account & edge cases, in-flight & restricted)
- Feature flagged-off work for Energy Insights: Phase 2

# 3.0.9 (2018-05-22) - Zenith
## Features
    * Numerous styling and wording changes to the 'bill panel' set of components on the overview and billing pages
    * New 'dynamic mocking' of potd and direct debit in mock server
    * New components for bill breakdown and bill dates will remain feature flagged off in this release
    * Basic e2e navigation test for concessions

## Fixes
    * Fixed the 'Next bill issued in xx days' logic to handle dates in the past

# 3.0.8 (2018-05-21) - Quasar
## Features
    * Log the user out if rewards api returns 401

# 3.0.7 (2018-05-15) - Revolution
## Features
## Fixes
    * Bill Smoothing review feature flag
    * Lodash porting to lodash-es
    * Replacing node Crypto library

# 3.0.6 (2018-05-11) - Quasar
## Features
    * My Rewards - Completion of benefit tiles in new agl rewards integration component
## Fixes
    * Various UI bug fixes

# 3.0.5 (2018-05-08) - Diamond + Obsidian
## Features
    * MAUI: Expandable Container (DSP- 26659)
    * Ongoing features for Instalment Plans (toggled off)
    * Added basic energy insights functionality for multi-account
    * Handled scenario of customer who is not on ebilling for energy insights

## Fixes
    * Bill Smoothing settings page not displaying details (DSP-29265)
    * Restored the SSMR survey

# 3.0.4 (2018-04-24) - Diamond
## Features
    * Confirm screen - upload new T&C - include accept button in T&C lightbox

## Fixes
    * Fixed large alignment problem in usage graphs

# 3.0.3 (2018-04-23) - Obsidian
## Fixes
    * Changed link to Energy Insights copy on website, as the original link required a redirect, and the google analytics data was causing it some issues.
## Toggles
    * Feature Flag toggled on for `energyInsightsEnabled`

# 3.0.2 (2018-04-22) - Revolution
## Features
    * Multi Account Selection for user with multi accounts
    * Thank You page update for summary
    * Lean Engage Survey on Thank you Page
    * Refresh Contract on Survey Page

## Toggles
    * Feature Flag toggled on for `homeProfileEnabled`

# 3.0.1 (2018-04-19) - Obsidian
## Features
    * Energy Insights - Phase 1
    * Automation tests covering SSMR and SMS Pay scenarios

## Toggles
    * Feature Flag toggled off for `rewardsBenefitsMembershipEnabled`

# 3.0.0 (2018-04-16) - All Teams

## Features
    * ANGULAR 5
    * https://aglenergy.atlassian.net/wiki/spaces/AGLDST/pages/336430721/Angular+Upgrade+-+Regression+Testing
    * https://github.com/angular/angular/blob/master/CHANGELOG.md

# 2.0.23 (2018-04-10) - Diamond
## Features
    * Ongoing work for Instalment Plans (feature flag off)
    * MAUI: Link Button (DSP-26645)
    * Copy change for Home Profile (Revolution) https://aglenergy.atlassian.net/browse/DSR-175
    * Copy change for usage tooltip (SWOT)

# 2.0.22 (2018-04-05) - Zenith
## Features
    * Link to 'view usage' on overview taking the place of the 'usage changes' section
    * Change the mobile hamburger menu size and logo alignment (both authenticated and authenticated menus)
    * Ongoing work to apply for a concession (feature flag remains off)
    * Moved first/last name from ContactDetailModel to BusinessPartnerModel (will not be populated by the api until an Apr/May 2018 SAP release)

## Fixes
    * Moved update contact details functionality to be under light mode protection

# 2.0.21 (2018-03-26)
## Features
    * My Rewards phase 2 front end work to integrate with AGL rewards external site
## Toggles
    * Feature Flag toggled off for `rewardsBenefitsMembershipEnabled`

# 2.0.20 (2018-03-15)
## Features
    * Additional of Call to action buttons on Feature intro (configurable through sitecore)
# 2.0.19 (2018-02-26)
## Features
    * DSP-24402 Update My Account entry points to "See payment assistance options"
    * DSP-24403 Update copy on welcome to payment extensions page
## Fixes
    * DSP-25736 Issues with payment extensions analytics implementation
    * DSP-26289 Payment extension when toggle on should display the payment extension on secondary navigation panel
    * DSP-25471 Payment Extension unexpected ineligible message handling (error #30)
    * DSP-25978 Refresh on the bill smoothing displays the my account as app across all the browsers
    * DSP-25981 Upcoming direct debit - display of upcoming direct debit is not visible for some
    * DSP-25983 OPA Calendar reminder does not work on devices like iphone
    * DSP-26071 IE does not load the welcome screen - with deep link and vanity (payment extension)
    * DSP-26078 issue with IE browser - not able to load my account after login (payment assistance)
## Toggles
    * Feature Flag toggled on for `ebillEnabled`

# 2.0.18 (2018-02-12)
## Features
    * MAUI: Checkbox and Checkbox-list component added (DSP-24799)
    * MAUI: Radio-list component added (DSP-24752)
    * Exposed `/maui` URL in production
    * Ask Jane promotion tile added to Billing page (DSP-25266)
    * Capitalise Due and Debited Date on Overview and Billing pages (DSP-25230)
## Fixes
    * Analytics fixes for Payment Extensions (DSP-25451)
    * Modal usabilities improvements (DSP-24084 and DSP-25726)
## Toggles
    * Feature Flag added for Payment Assistance `paymentAssistanceEnabled` (toggled off - DSP-24889)

# UNVERSIONED UPCOMING FEATURES

## Features
    * Feature complete monthly billing

# 2.0.17 (2018-02-01)
## Features
    * Update contact details (feature flag still off).
      * change validation/UI
      * add Tealium tracking
    * Show intro text in sms pay when sms pay is turned off and mobile is invalid.
## Fixes
    * Fixed fuel type message on Payment Extension confirmation page

# 2.0.16 (2018-01-31)
## Toggles
    * Feature Flag on for Payment Extensions
    * Feature Flag on for PAYG
## Fixes
    * Fix for Monthly Billing link and frequency component
    * Fixed Payment Extension welcome deeplink url
    * Fixed PaymentExtension default option (7 days) not being submitted to API

# 2.0.15 (2018-01-30)
## Features
    * Feature complete for Payment Extention initiative
      * Copy and legal changes
      * Add calendar event functionality
      * Added analytics and lean engage survey
      * Updated deeplinks
      * Updates to Direct Debit and SMS Pay screens
    * MAUI showcase enhancement

# 2.0.14 (2018-01-25)
## Features
    * Update contact details (feature flag off) - used for general contact details (currently aeo), ebilling (email) and sms pay (mobile).
    * Refactor of sms pay web chat component into a general use web chat component so it can used throughout my account.

## Fixes
    * Prevent SSMR when all accounts are restricted
    * Remove the weekend average from the usage page if the weekend data is not available
    * Monthly billing: Removed call to the predicted eligibility check to fix P3 issue when switching to billing tab multiple times

# 2.0.13 (2018-01-19)
## Features
    * 3/4 completion of Monthly Billing, which will remain feature flagged off until it's launch
    * Monthly Billing has it's own unique entry points and can be hidden until ready

# 2.0.12 (2018-01-16)
## Features
    * Added Decisioning Authentication Event to write to Single Customer ID database.

# 2.0.11 (2018-01-08)
## Features
   * SSMR Deep Link to SSMR Modal

# 2.0.10 (2017-12-07)
## Features
    * Partially completed Payment Extensions feature (toggled off)
    * Added rewards safari fix (DSP-23818)
    * MAUI Components (Fuel Chip, Buttons, Navigation, Container, T&C, Confirmation Banner, Day of Month picker, Headings, Lightbox, Flash Message, Accordion, Dropdown, Icon List)

# 2.0.9

## Features
    * Added Decisioning Offer Tile. Tile displays personalised offer.
    * Added Decisioning offer impression and offer click-through recording by sending to Api.
    * Added BpId and hashed BPId to Tealium data layer.

# 2.0.8

## Features
    * My Rewards Flybuys Tile.
	* My Rewards view Flybuys transactions.
    * My Rewards Discount Tile.

# 2.0.7

## Features
    * Tealium Tag Manager Implementation.
    * Accounts pushed on dashboard to tealium.
    * UI Updates to smart meter.
    * Additional tweaks based on UI feedback.

# 2.0.6

## Features
    * Monthly billing team progress work (feature flagged off)
    * Chrome extension for management of feature flags
    * Introduction of ts-mocks for test mocking
    * SMS Pay slow roll-out

## Fixes
    * Refactoring of feature-flag service to add caching and allow localstorage keys to override values to FALSE. (Currently they can only override to TRUE)

# 2.0.5

## Features
* **Mock Server**
    * Mock server now allows concurrent sessions (each time a new mock identity is selected)
## Fixes
    * Fix for caching of featureFlags.json (and other /config files)
    * Fix for deep linking in IE11
    * Fix for bill smoothing V2 messaging
    * Fix for paypal direct debit feature flag not working on mobile

# 2.0.4

## Features
* **Bill Smoothing**
    * Bill Smoothing final release (feature flag will be permanently turned on 1 day after release).
    * Enabled web chat buttons for various scenarios.
* **Deep links**
    * Customers can now be routed directly (intended for email/sms links) to pages within the site (rather than just /overview)
* **OMM**
    * links to /ommtracker have been changed to point externally ({sitecore}/tracker) away from /ommtracker

## Fixes
    * Fix for external link to OMM not working in firefox
    * Fix for permissions error when refreshing browser on /bills page
    * Fix for endless spinner when refreshing browser on /usage page

# 2.0.3 (2017-10-18)

## Features
* **My Wallet**
    * Added scenario for credit card that is approaching its expiration date to bring it inline with Direct Debit
* **Direct Debit**
    * Refactoring work to move components to base PaymentArrangement, where Direct Debit and SMS pay extend upon it
* **SMS Pay**
    * Added full customer flow for SMS pay - Feature is now complete

# 2.0.2 (2017-10-16)
## HOTFIX Feature flag off ebilling
    * EBilling is now feature flagged and it is off.
    * Fixes removal of new relic.
    * Fixes the liveperson non-prod id.
    * Fixes an issue where in the tracker the colours are incorrect.


# 2.0.1 (2017-09-20)
## X-Men MINOR RELEASE
    * Error messages in case of api failure on solar check update functionality
    * log out in case of api 401 errors
    * google analytics event push for eligibility offer / close offer.

# 2.0.0 (2017-09-20)
## MAJOR RELEASE
### AOT Compilation
### Lazy Loading

#1.3.6
## Features
* **Solar Command Check**
    * Maintain solar details (pv info and battery)
    * Maintain solar email preferences
    * Caching of Solar Command Check Eligibility Calls
* **Common**
    * Added Google Materialise Calendar component
    * Added YesNo component
    * Extended AGL Loader to have largerText attibute

# 1.3.5 (2017-09-18)
## Features
* **PayPal**
    * Fix and enable PayPal payment
* **Bill Smoothing**
    * Add more features

# 1.3.4 (2017-08-29)
## Fixes
* Fix double pay for old browser.
* Fix payment method credit card expiry date.
* **Bill Smoothing**
    * Bill Smoothing link is now controlled by feature flag.

# 1.3.3 (2017-14-03)
## Features
* **Solar Command Check**
    * Added link in menu for solar settings
    * Retrieval of solar system details
    * Survey popup from Lean Engage
    * Hiding of solar check offer via local storage

# 1.3.2 (2017-08-03)
## Fixes
* Google Analytics and Lean engage survey for Direct debit and copy changes.
* **Bill Smoothing**
    * Bill Smoothing feature flag

# 1.3.1 (2017-07-31)
## Fixes
* Solar command check fix for cross field validation for system details and panels.

# 1.3.0 (2017-07-26)
## Features
* **Direct Debit**
    * Functionality complete and feature flagged
    * Version updated because of a whole new peice of functionality added
## Fixes
* SSMR changes
* Highcharts Removal
* Speed improvements

# 1.2.2 (2017-07-10)
## Features
* **Direct Debit**
    * Switched off, but a chunk of functionality has been done.
## Fixes
* Payment receipt page has been rewritten
* Payg payment with stored credit / bank accounts now works
* Payments now will create the correct reference number

# 1.2.1 (2017-07-10)

## Features
* **Solar Check Offer**
    * Added loading screen to solar check offer process
## Fixes
* SSMR banner will be displayed when solar customer is not eligible to solar check offer
* Solar check status visibility is based on hasSolar flag instead of solarCheckRegistration

# 1.2.0 (2017-07-05)

## Features
* **My Wallet**
    * Save bank account details in my wallet.
    * Save CC details in my wallet.
* **Payment Modal**
    * Make a payment in my wallet with a bank account.
    * Make a payment in my wallet with a credit card and have the same card be saved to my wallet.
    * Make a payment with stored bank accound and credit card.
* **Direct Debit**
    * Direct Debit feature flag

## Fixes
* Transfer direct debit to bank account or CC will refresh the UI.
* Message to display direct debit linking.
* Removal of placeholders in the CC and Bank account forms
* Unable to save credit card into my wallet fixed with iframe PCIDSS changes.
* IE Fix - Null appearing in the payment modal.
* Validation message is now disapled when an incorrect CC is added.
* Fixed credit card labels
* Direct Debit no longer relies on sitecore

# 1.1.0 (2017-06-30)

## Features
* **Added Solar Command Check Offer**
    * Displays an offer for an eligible customer and allows registration via a popup modal.
    * Eligibility is determined based on Solar Check API
* **Added Solar Command Check Status**
    * Displays the solar check status for a registered customer
* **Optimisation to Solar Check API** calls so that it only occur for solar customers
* **Updated mock data** to include responses for Solar Check API
* **Updated modal service** to include no padding option
* **Updated tooltip component** to render HTML elements in content

# 1.0.0 (2017-06-21)

## Features
* **Changelog Added!!!**
* **Angular upgrade:** upgraded to 4.2.3
* **Angularitics:** upgraded to 2.2.2
* **codelyzer:** upgraded to 3.1.0
* **tslint:** upgraded to  5.4.3
* **webpack:** upgraded to  3.0.0
* **webpack-dev-server:** upgraded to webpack-dev-server 2.5.0
