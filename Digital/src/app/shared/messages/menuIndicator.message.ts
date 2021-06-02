import { BaseMessage } from './base.message';

export class MenuIndicatorMessage extends BaseMessage {
    constructor(public menuLabel: string, public showIndicator: boolean = false) {
        super();
    }
}
