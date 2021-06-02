import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IConcessionApplicationService, SubmissionResult } from '../services/concessionApplication.service';
import { IConcessionStateService } from '../services/concessionState.service';
import { Concession } from './../concession';

@Component({
    selector: 'agl-concession-application',
    templateUrl: 'concessionApplication.component.html',
    styleUrls: ['concessionApplication.component.scss'],
})
export class ConcessionApplicationComponent implements OnInit {
    public cardNumberForm: FormGroup;
    public continueButtonClickInProgress: boolean = false;
    public cardIconName: string = '';
    public submissionResultEnum = SubmissionResult; /* to allow the enum to be used in the template */
    public submissionResult: SubmissionResult = null;

    private isTermsAndConditionsChecked: boolean = false;
    private concession: Concession;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private concessionStateService: IConcessionStateService,
                private concessionApplicationService: IConcessionApplicationService) {
        this.createForm();
    }

    public ngOnInit(): void {
        this.concession = this.concessionStateService.getCurrentConcession();
        this.cardIconName = this.concession.selectedCard.iconName;
    }

    public termsAndConditionChecked(value: boolean): void {
        this.isTermsAndConditionsChecked = value;
    }

    public get continueButtonEnabled(): boolean {
        return this.cardNumber.length > 0 && this.isTermsAndConditionsChecked;
    }

    public continue(): void {
        this.continueButtonClickInProgress = true;

        this.submissionResult = null; // reset

        this.concession.setCardNumber(this.cardNumber);
        this.concessionApplicationService.submit(this.concession)
            .subscribe((result: SubmissionResult) => {
                if (result === SubmissionResult.Success) {
                    this.router.navigate(['/settings/concession/confirmation']);
                } else {
                    this.submissionResult = result;
                    this.continueButtonClickInProgress = false;
                }
            });
    }

    private get cardNumber(): string {
        return (this.cardNumberForm.get('cardNumber').value || '').trim();
    }

    private createForm(): void {
        this.cardNumberForm = this.formBuilder.group({
            cardNumber: ['', Validators.required]
        });

        let control = this.cardNumberForm.get('cardNumber');
        control.valueChanges.subscribe((val) => {
            this.submissionResult = null; // reset
        });
    }
}
