import { PaymentAssistanceNavigationStateModel } from '../models';
import { Injectable } from '@angular/core';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';

export abstract class IPaymentAssistanceNavigationPersistedStateService {
    public static sessionStorageKey = 'paymentAssistanceNavigationPersistedStateServiceKey';

    public static defaultState: PaymentAssistanceNavigationStateModel = {
        chooseBackUrl: '/bills',
        extensionApplicationBackUrl: '/bills/paymentassistance/extend/select'
    };

    public abstract hasState(): boolean;
    public abstract setState(state: PaymentAssistanceNavigationStateModel): void;
    public abstract getState(removeStateAfterGet?: boolean): PaymentAssistanceNavigationStateModel;
    public abstract resetState(): void;
}

@Injectable()
export class PaymentAssistanceNavigationPersistedStateService implements IPaymentAssistanceNavigationPersistedStateService {

    public hasState(): boolean {
        return this.hasSessionStorageState();
    }

    public getState(removeStateAfterGet: boolean = false): PaymentAssistanceNavigationStateModel {
        const state = this.hasSessionStorageState() ? this.getSessionStorageState() : null;
        if (removeStateAfterGet) {
            this.removeSessionStorageState();
        }
        return state || IPaymentAssistanceNavigationPersistedStateService.defaultState;
    }

    public setState(state: PaymentAssistanceNavigationStateModel): void {
        this.setSessionStorageState(state);
    }

    public resetState(): void {
        this.removeSessionStorageState();
    }

    private hasSessionStorageState() {
        return !!sessionStorage.getItem(IPaymentAssistanceNavigationPersistedStateService.sessionStorageKey);
    }

    private setSessionStorageState = (state: PaymentAssistanceNavigationStateModel): void =>
        sessionStorage.setItem(IPaymentAssistanceNavigationPersistedStateService.sessionStorageKey, JSON.stringify(state))

    private getSessionStorageState = (): PaymentAssistanceNavigationStateModel =>
        this.parseJSON(sessionStorage.getItem(IPaymentAssistanceNavigationPersistedStateService.sessionStorageKey))

    private removeSessionStorageState = () =>
        sessionStorage.removeItem(IPaymentAssistanceNavigationPersistedStateService.sessionStorageKey)

    private parseJSON = (json: string): any => {
        let object;
        try {
            object = JSON.parse(json);
        } catch (e) {
            console.warn(`unable to parse value of sessionStore key '${IPaymentAssistanceNavigationPersistedStateService.sessionStorageKey}'`);
            return null;
        }
        return object;
    }
}
