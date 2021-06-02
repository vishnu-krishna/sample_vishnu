import { startCase } from 'lodash';
import { IPersistable } from '../mockIdentityStorage.service';

export class Tag implements IPersistable {
    public get displayName(): string {
        return startCase(this.key);
    }

    public get storageKey(): string {
        return `tags.${this.key}`;
    }

    public get storageValue(): string {
        return 'true';
    }

    constructor(public readonly key: string,
                public isSelected: boolean) {
    }
}
