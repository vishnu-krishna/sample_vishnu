export abstract class IAuthenticationEventService {
    public abstract sendAuthenticationEvent(): void;
    public abstract clearAuthenticatedEventFlag(): void;
}
