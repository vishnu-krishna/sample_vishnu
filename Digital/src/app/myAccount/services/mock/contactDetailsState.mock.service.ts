import { Injectable } from '@angular/core';
import { IContactDetailsStateService } from '../../pages/settings/contactDetails/contactDetailsState.service';

@Injectable()
export class ContactDetailsStateMockService implements IContactDetailsStateService {
    public setControlsUpdated(fields: string[]): void {
        throw new Error('Property not implemented.');
    }
    public getControlsUpdated(): string[] {
        throw new Error('Property not implemented.');
    }
    public contextId(): string | null {
        throw new Error('Property not implemented.');
    }
    public detailsUpdatedSuccessfully(): void {
        throw new Error('Method not implemented.');
    }
    public canNotifyOfSuccessfulUpdate(): boolean {
        throw new Error('Method not implemented.');
    }
    public hasNotifiedOfSuccessfulUpdate(): void {
        throw new Error('Method not implemented.');
    }
}
