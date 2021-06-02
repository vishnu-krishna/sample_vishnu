import { Observable } from 'rxjs/Observable';
import { BaseMessage } from './../../messages/base.message';

export abstract class IMessageBusService {

    public abstract broadcast<T extends BaseMessage>(message: T): void;
    public abstract listenWithLatest<T extends BaseMessage>(messageType: { new(...args: any[]): T }): Observable<T>;
    public abstract listen<T extends BaseMessage>(messageType: { new(...args: any[]): T }): Observable<T>;
}
