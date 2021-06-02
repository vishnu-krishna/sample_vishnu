import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FeatureFlagTypes, FeatureFlagService } from '../../../services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { IConcessionStatusService } from './services/concessionStatus.service';
import { ConcessionStatus, ConcessionApplied, ConcessionNotAppliedFor, IneligibleForConcession, ConcessionRejected, ConcessionRejectedReasons } from './services/concessionStatus';

@Component({
    selector: 'agl-concession',
    templateUrl: 'concession.component.html',
    styleUrls: ['concession.component.scss']
})

export class ConcessionComponent implements OnInit {
    public isFeatureFlagApplyForConcession: boolean = false;
    public isLoading: boolean = true;

    private canApplyForConcession: boolean = false;

    public cardNumber: string;
    public cardDescription: string;
    public showAppliedConcessionDetails: boolean = false;
    public addConcessionInAeoUrl: string;

    public concessionRejectedChatWithUsSubheading: string;
    public concessionRejectedTryAgainSubheading: string;
    public hasMultipleBusinessPartners: boolean = false;
    public shouldContactSouthAustraliaDeptOfCommunities: boolean = false;
    public isWesternAustraliaFairerWayPackageApplicable: boolean = false;
    public unableToResolveConcessionStatus: boolean = false;

    public get showApplyForConcessionLink(): boolean {
        return this.canApplyForConcession && !this.isLoading;
    }

    public get cardDescriptionEndsWithCard(): boolean {
        // TODO replace with duplicate word directive in dsp-26354
        return this.cardDescription && /[\s]card$/i.test(this.cardDescription);
    }

    constructor(private concessionStatusService: IConcessionStatusService,
                private featureFlagService: FeatureFlagService,
                private config: ConfigService,
                private router: Router) {
        this.addConcessionInAeoUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/myaccount/concession-cards`;
    }

    public ngOnInit() {
        this.featureFlagService.featureFlagged(FeatureFlagTypes.applyForConcessionEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isFeatureFlagApplyForConcession = featureIsEnabled;
                if (this.isFeatureFlagApplyForConcession) {
                    this.concessionStatusService.fetchConcessionStatusDetails()
                        .finally(() => {
                            this.isLoading = false;
                        })
                        .subscribe((status: ConcessionStatus) => {
                            this.concessionStatusToViewProperties(status);
                        },
                        (err) => {
                            console.error('ERROR: loading concession status', err);
                            this.unableToResolveConcessionStatus = true;
                        });
                }
            }
        );
    }

    public onClickAdd() {
        this.isLoading = true;
        this.router.navigate(['/settings/concession']).then(() => {
            this.isLoading = false; // in case the routing guard prevent access (for example due to an api error)
        });
    }

    private concessionStatusToViewProperties(status: ConcessionStatus): void {
        if (status instanceof ConcessionApplied) {
            this.showAppliedConcessionDetails = true;
            this.isWesternAustraliaFairerWayPackageApplicable = status.isWesternAustraliaFairerWayPackageApplicable;
            this.cardNumber = status.cardNumber;
            this.cardDescription = status.cardDescription;
        } else if (status instanceof ConcessionNotAppliedFor) {
            this.canApplyForConcession = true;
        } else if (status instanceof IneligibleForConcession) {
            this.hasMultipleBusinessPartners = status.hasMultipleBusinessPartners;
            this.shouldContactSouthAustraliaDeptOfCommunities = status.shouldContactSouthAustralianDeptOfCommunities;
        } else if (status instanceof ConcessionRejected) {
            this.concessionRejectedToViewProperties(status);
        } else {
            this.unableToResolveConcessionStatus = true;
        }
    }

    private concessionRejectedToViewProperties(status: ConcessionRejected): void {
        this.canApplyForConcession = status.canApplyAgain;
        switch (status.reason) {
            case ConcessionRejectedReasons.DetailsDidNotMatch:
                this.concessionRejectedChatWithUsSubheading = 'The concession details you provided doesn\'t match the details listed on your AGL account.';
                break;
            case ConcessionRejectedReasons.CouldNotBeValidated:
                this.concessionRejectedChatWithUsSubheading = 'The concession card details could not be validated.';
                break;
            case ConcessionRejectedReasons.IsIneligible:
                this.concessionRejectedTryAgainSubheading = 'The concession card is ineligible. Please provide a valid concession card.';
                break;
            case ConcessionRejectedReasons.IsInvalid:
                this.concessionRejectedTryAgainSubheading = 'The concession card is invalid. Please provide a valid concession card.';
                break;
            default:
                this.unableToResolveConcessionStatus = true;
                break;
        }
    }
}
