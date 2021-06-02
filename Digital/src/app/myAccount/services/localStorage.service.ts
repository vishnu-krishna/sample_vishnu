import { Injectable } from '@angular/core';
import { HashMap } from '@typed/hashmap';
import defaultsDeep from 'lodash-es/defaultsDeep';

@Injectable()
export class LocalStorageService {
    public addKey(key) {
        let storedKeys: LocalStorageModel = JSON.parse(localStorage.getItem('myaccount.persistence'));
        let keyObject = new LocalStorageModel(key);

        if (!storedKeys) {
            localStorage.setItem('myaccount.persistence', JSON.stringify(keyObject));
        } else {
            let assignKey = keyObject;
            let assignKeyDeep = defaultsDeep(assignKey, storedKeys);
            localStorage.setItem('myaccount.persistence', JSON.stringify(assignKeyDeep));
        }
    }

    public getKeys() {
        let storedKeys: LocalStorageModel = JSON.parse(localStorage.getItem('myaccount.persistence'));
        if (!storedKeys) {
            return false;
        }
        return storedKeys;
    }
}

export class LocalStorageModel {
    constructor(
        public localAlertDismissables?: LocalAlertDismissablesModel,
    ) {}
}

export class LocalAlertDismissablesModel {
    constructor(
        public myWalletPaymentMethodWarning?: Boolean,
        public isSmsPayBannerClose?: HashMap<string, Boolean>,
        public displaySolarCheckOffer?: HashMap<string, Boolean>
    ) {}
}
