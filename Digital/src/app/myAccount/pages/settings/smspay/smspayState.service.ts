import { Injectable } from '@angular/core';

import { IPaymentArrangementStateService, PaymentArrangementStateService } from '../../../../shared/component/paymentArrangement/paymentArrangementState.service';

@Injectable()
export class SmsPayStateService extends PaymentArrangementStateService implements IPaymentArrangementStateService {

}
