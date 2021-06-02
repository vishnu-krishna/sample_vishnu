import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 * Provides static mock content to the application.
 * Useful as a test dependency or local development when a Sitecore instance is not available.
 *
 * @export
 * @class ContentMockService
 */
@Injectable()
export class MockContentService {
    public getContent(): Observable<any> {
        return Observable.of({
            selfService: {
                payg: {
                    isActive: true,
                    buttonText: {
                        High: 'Top Up Immediately',
                        Medium: 'Top Up For Bonuses',
                        Low: 'Top Up',
                        Unavailable: 'Top Up'
                    },
                    contextualMessageHeader: {
                        High: 'You\'ve run out of credit',
                        Medium: 'You\'re running out of credit.',
                        Low: 'Your account is looking good.',
                        Unavailable: 'Sorry your balance isn\'t available'
                    },
                    contextualMessageContent: {
                        High: 'Top up to get back in credit',
                        Medium: 'Don\'t forget to top up soon so you get a bonus.',
                        Low: 'Keep topping up so you stay in credit and receive bonuses.',
                        Unavailable: 'You can still top up your account, just allow 1-2 business days for your new balance to be displayed.'
                    },
                    prepaidBalanceLabelText: 'Prepaid balance',
                    usageToolTipBody: 'This does not include any supply charges on your account.',
                    usageToolTipHeader: 'Supply Charges',
                    estimatedReadTooltip: 'Your prepaid balance shown contains estimated data based on your previous usage and will be updated when actual data becomes available.',
                    directDebitMessage1: 'Please continue to make prepayments to receive bonuses and remain in credit.',
                    directDebitMessage2: 'We’ll only direct debit from this account if and when a bill is due and your balance is in debit.',
                    highUrgencyTopupMessage: 'Looks like you have fallen behind.<br />\nTop up to get back in credit and receive bonuses.'
                },
                SolarCheckStatusResponse: {
                    status: 'good',
                    mer: '0.9',
                    confidence: '0.8',
                    date: '2017-04-30'
                },
            }
        });
    }

    public load(): Observable<any> {
        return Observable.of({});
    }

    public getLightMode(): Observable<boolean> {
        return Observable.of(true);
    }
}
