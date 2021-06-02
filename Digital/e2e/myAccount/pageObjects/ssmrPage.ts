import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../context';
import { PaygPageObject } from './components/paygPageObject';
import { settings } from '../pageObjects/settings';
import * as waits from '../../utilities/waits';

export class SsmrPage {
    public ssmrModal = $('agl-ssmr-modal');

    public contractGas = $('.contract.gas');
    public contractFirstElec = $$('.contract.elec').first();

    public safetyScreenContinueButton = $('.ssmr-safety-screen .button__continue');
    public multiMeterInfoContinueButton = $('.multiMeterInfo .button__continue');
    public multiRegisterContinueButton = $('.multi-register-onboard .button__continue');
    public meterEntryInput = $('#meter-entry-input');
    public meterEntryContinueButton = $('.meter-entry-wrapper .button__continue');
    public multiMeterSummaryContinueButton = $('.multiMetersummary .button__continue');
    public heading = $$('.heading').get(0);

    private currentContext: Context;

    constructor(context: Context) {
        this.currentContext = context;
    }

}
