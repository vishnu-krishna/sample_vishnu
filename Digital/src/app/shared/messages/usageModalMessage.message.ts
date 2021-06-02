import { BaseMessage } from './base.message';

export class UsageModalMessage extends BaseMessage {

    public visibility: string;

    constructor(visibility: string) {
        super();
        this.visibility = visibility;
    }
}
