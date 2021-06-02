import { IAglAuthTokenProvider } from '../../shared/repository/contract/iaglauthtokenprovider';

export class AglAuthTokenProviderStub implements IAglAuthTokenProvider {

    private fakeToken = `mocktoken`;
    public getToken(): string {
        return this.fakeToken;
    }
    public setToken(token: string) {
        this.fakeToken = token;
    }
    public clearToken() {
        this.fakeToken = '';
    }
    public hasToken() {
        return true;
    }
}
