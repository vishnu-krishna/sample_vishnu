import { PaymentAssistancePlanOptionsHelperService } from '../paymentAssistancePlanOptionsHelper.service';
import { Spied } from '../../../../../../../services/generics/tsmocks/spied.type';
import remove from 'lodash-es/remove';

export class PaymentAssistancePlanOptionsHelperMockFactory {
    public createMock(): Spied<PaymentAssistancePlanOptionsHelperService> {
        const properties = this.getProperties();
        return jasmine.createSpyObj(typeof PaymentAssistancePlanOptionsHelperService, properties);
    }

    private getProperties() {
        const names = Object.getOwnPropertyNames(PaymentAssistancePlanOptionsHelperService.prototype);
        return remove(names, 'constructor');
    }
}
