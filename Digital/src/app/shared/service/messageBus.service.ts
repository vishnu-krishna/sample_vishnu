import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject  } from 'rxjs/Subject';
import { IMessageBusService } from './contract/imessageBus.service';

interface Message {
    channel: string;
    data: any;
}

@Injectable()
export class MessageBusService implements IMessageBusService {

    private replayMessage$: ReplaySubject<Message>;
    private message$: Subject<Message>;

    constructor() {
        this.replayMessage$ = new ReplaySubject<Message>(1); // The 1 param inside the constructor stipulates that the 'stack' of replay subjects is limited to 1 item.
        this.message$ = new Subject<Message>();
    }

    public broadcast<T>(message: T): void {
        const channel = (<any> message.constructor).name;
        this.replayMessage$.next({ channel: channel, data: message });
        this.message$.next({ channel: channel, data: message });
    }

    public listenWithLatest<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (<any> messageType).name;
        return this.replayMessage$.filter((m) => m.channel === channel).map((m) => m.data);
    }

    public listen<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (<any> messageType).name;
        return this.message$.filter((m) => m.channel === channel).map((m) => m.data);
    }

}
