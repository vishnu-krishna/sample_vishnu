import {
  TestBed,
} from '@angular/core/testing';

import { FormControl } from '@angular/forms';

// Load the implementations that should be tested
import { PaymentValidators } from './paymentValidators';

describe('PaymentValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentValidators
      ]
    });
  });

  it('should validate the group', () => {
        let paymentValidator = new PaymentValidators();
        let group = new FormControl();
        group.setValue({ creditCardExpiryDateMonth: 12, creditCardExpiryDateYear: 2016 });
        let validationGroup = paymentValidator.validateCombinedDate(group);
        expect(validationGroup.validateCombinedDate).toBe(true);
  });

  it('should invalidate the group', () => {
        let paymentValidator = new PaymentValidators();
        let group = new FormControl();
        group.setValue({ creditCardExpiryDateMonth: 12, creditCardExpiryDateYear: 2025 });
        let validationGroup = paymentValidator.validateCombinedDate(group);
        expect(validationGroup).toBe(null);
  });
});
