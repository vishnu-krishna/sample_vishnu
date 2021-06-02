import { startCase, uniq } from 'lodash';
import { IPersistable } from '../mockIdentityStorage.service';

export class DynamicMock {
    public static generateKey(key: DynamicMockKey, state: DynamicMockDesiredState): string {
        return `${key}|${state}`;
    }

    public get groupKey(): DynamicMockKey {
        if (uniq(this.states.map((s) => s.groupKey)).length !== 1) {
            throw new Error('DynamicMockState.groupKey must all match within a DynamicMock');
        }
        return this.states[0].groupKey;
    }

    public get selectedState(): DynamicMockState {
        let selectedKey = this.states.filter((s) => s.isSelected);
        if (selectedKey.length !== 1) {
            throw new Error('A single selectedState was expected');
        }
        return selectedKey[0];
    }

    public shouldBeApplied(lifecycle: DynamicMockLifecycle): boolean {
        return this.lifecycle === lifecycle &&
               this.states.some((o) => o.state !== DynamicMockDesiredState.ignored && o.isSelected);
    }

    constructor(private readonly lifecycle: DynamicMockLifecycle,
                public readonly states: DynamicMockState[],
                public readonly description: string = '') {
    }
}

export class DynamicMockState implements IPersistable {
    public get displayName(): string {
        return startCase(this.key);
    }

    /**
     * To be used in JWT token claims
     */
    public get key(): string {
        return DynamicMock.generateKey(this.groupKey, this.state);
    }

    public get storageKey(): string {
        return `dynamicMocks.${this.groupKey}`;
    }

    public get storageValue(): string {
        return this.key;
    }

    public isSelected: boolean;

    constructor(public readonly groupKey: DynamicMockKey,
                public readonly state: DynamicMockDesiredState) {
    }
}

export enum DynamicMockLifecycle {
    initialisePriorToLogin,
    appliedViaMiddleware
}

export enum DynamicMockDesiredState {
    ignored = <any> 'unaltered',
    enabled = <any> 'on',
    disabled = <any> 'off',
}

export enum DynamicMockKey {
    potdProducts = <any> 'potd-products',
    directDebit = <any> 'direct-debit',
}
