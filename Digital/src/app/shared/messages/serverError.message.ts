import { BaseMessage } from './base.message';

export class ServerErrorMessage extends BaseMessage {

    constructor(msg: string) {
        super();
        this.message = msg;
    }
}
