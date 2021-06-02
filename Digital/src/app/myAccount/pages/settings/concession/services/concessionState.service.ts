import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Concession } from './../concession';

export abstract class IConcessionStateService {
    public abstract get hasSession(): boolean;

    public abstract initSession(bpId: string, bpAccountHolderName: string): void;

    public abstract getCurrentConcession(): Concession;

    public abstract clearSession(): void;
}

@Injectable()
export class ConcessionStateService implements IConcessionStateService {
    private currentConcession: Concession = null;

    constructor(private router: Router) {
    }

    public get hasSession(): boolean {
        return this.getCurrentConcession() !== null;
    }

    public initSession(bpId: string, bpAccountHolderName: string): void {
        this.currentConcession = new Concession(bpId, bpAccountHolderName);
    }

    public getCurrentConcession(): Concession {
        return this.currentConcession;
    }

    public clearSession(): void {
        this.currentConcession = null;
    }
}
