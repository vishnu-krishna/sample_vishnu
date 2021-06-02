import { Injectable } from '@angular/core';

export abstract class IContactDetailsStateService {
    /**
     * The contract or contract account id for which the change to contact details was initialed for (if applicable)
     */
    public abstract contextId(): string | null;
    public abstract detailsUpdatedSuccessfully(id: string): void;
    public abstract canNotifyOfSuccessfulUpdate(): boolean;
    public abstract hasNotifiedOfSuccessfulUpdate(): void;

    public abstract setControlsUpdated(fields: string[]): void;

    public abstract getControlsUpdated(): string[];

}

@Injectable()
export class ContactDetailsStateService implements IContactDetailsStateService {
    private canNotify: boolean = false;
    private id: string | null;
    private fieldsUpdated: string[] = [];

    public contextId(): string | null {
        return this.id;
    }

    public detailsUpdatedSuccessfully(contextId: string | null): void {
        this.canNotify = true;
        this.id = contextId;
    }

    public canNotifyOfSuccessfulUpdate(): boolean {
        return this.canNotify;
    }

    public hasNotifiedOfSuccessfulUpdate(): void {
        this.canNotify = false;
    }

    public setControlsUpdated(fields: string[]) {
        this.fieldsUpdated = fields;
    }

    public getControlsUpdated() {
        return this.fieldsUpdated;
    }
}
