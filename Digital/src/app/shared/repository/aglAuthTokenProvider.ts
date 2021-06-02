import { Injectable } from '@angular/core';
import { IAglAuthTokenProvider } from './contract/iaglauthtokenprovider';

@Injectable()
export class AglAuthTokenProvider implements IAglAuthTokenProvider {
    private bearerTokenStorageKey: string = 'Bearer';

    public getToken(): string {
        return sessionStorage.getItem(this.bearerTokenStorageKey);
    }

    public setToken(token: string) {
        sessionStorage.setItem(this.bearerTokenStorageKey, token);
    }

    public clearToken() {
        sessionStorage.removeItem(this.bearerTokenStorageKey);
    }

    public hasToken(): boolean {
        return this.getToken() !== null;
    }
}
