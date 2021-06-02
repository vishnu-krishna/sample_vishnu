export abstract class IAglAuthTokenProvider {

    public abstract getToken(): string;
    public abstract setToken(token: string);
    public abstract clearToken();

}
