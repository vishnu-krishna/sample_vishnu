import { Injectable } from '@angular/core';

export interface IPersistable {
    readonly storageKey: string;
    readonly storageValue: string;
    isSelected: boolean;
}

@Injectable()
export class MockIdentityStorageService {
    public saveValue(item: IPersistable): void {
        const key = `selfService.mockIdentity.${item.storageKey}`;
        item.isSelected ? localStorage.setItem(key, `${item.storageValue}`) : localStorage.removeItem(key);
    }

    public loadValues(items: IPersistable[]): void {
        for (let item of items) {
            let val: string = localStorage.getItem(`selfService.mockIdentity.${item.storageKey}`);
            item.isSelected = (val && val.toLowerCase() === item.storageValue.toLowerCase());
        }
    }
}
