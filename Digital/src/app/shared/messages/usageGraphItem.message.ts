import { UsageGraphItemViewModel } from './../model/usage/usageGraphItemView.model';
import { BaseMessage } from './base.message';

export class UsageGraphItemMessage extends BaseMessage {

    public usageGraphItem: UsageGraphItemViewModel;

    constructor(usageGraphItem: UsageGraphItemViewModel) {
        super();
        this.usageGraphItem = usageGraphItem;
    }
}
