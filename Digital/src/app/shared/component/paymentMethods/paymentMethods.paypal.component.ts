import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentArrangementContent } from '../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { PaymentValidators } from '../../validators/paymentValidators';

@Component({
    selector: 'agl-paymentpaypal',
    templateUrl: './paymentMethods.paypal.component.html',
    styleUrls: ['./paymentMethods.paypal.component.scss']
})

export class PaymentMethodsPaypalComponent implements OnInit {
    @Input() public content: PaymentArrangementContent;
    @Output() public onCancel = new EventEmitter();
    @Output() public onSave = new EventEmitter();

    public isSaving: boolean = false;
    public paypalForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _messageBusService: IMessageBusService,
        private _validators: PaymentValidators) {
    }

    public ngOnInit() {
        this.paypalForm = this._formBuilder.group({
            terms: [null, [Validators.required, Validators.pattern('true')]]
        });
    }

    public setupPaypal() {
        if (this.paypalForm.valid) {
            this.onSave.emit();
        } else {
            this.paypalForm.get('terms').markAsTouched();
        }
    }

    public cancelPayment() {
        this.onCancel.emit();
    }
}
