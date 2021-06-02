import { BaseMessage } from './base.message';

export class PageLoadingMessage extends BaseMessage {

    public isLoading: Boolean;

    constructor(isLoading: Boolean, message: string = '', subMessage: string = '') {
        super();
        this.isLoading = isLoading;
        if (message !== '') {
            this.message = message;
        }
        if (subMessage !== '') {
            this.subMessage = subMessage;
        }
    }
}
