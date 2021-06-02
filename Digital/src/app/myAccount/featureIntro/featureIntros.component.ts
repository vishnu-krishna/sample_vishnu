import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ModalService } from '../modal/modal.service';
import { IRewardsEligibilityService } from '../rewards';
import { FeatureIntroService } from './services/featureIntro.service';
import { FeatureIntroAnalytics } from './services/featureIntro-analytics';

import { FeatureIntroModalComponent } from './featureIntroModal/featureIntroModal.component';
import { FeatureIntro } from './shared/featureIntro';
import { FeatureIntroHelper } from './shared/featureIntroHelper';

@Component({
    selector: 'agl-feature-intros',
    template: ''
})
export class FeatureIntrosComponent implements OnInit {
    private readonly rewardsFeatureId = 'Rewards';
    private featureIntros: FeatureIntro[] = [];

    constructor(private featureIntroService: FeatureIntroService, private modalService: ModalService, private rewardsEligibilityService: IRewardsEligibilityService, private analytics: FeatureIntroAnalytics) { }

    public ngOnInit() {
        Observable.forkJoin(
            this.featureIntroService.getFeatureIntros(),
            this.rewardsEligibilityService.checkEligibility()
        ).subscribe(([
            featureIntros,
            rewardsEligibility
        ]) => {
            let results: FeatureIntro[] = [];

            for (let featureIntro of featureIntros) {
                if (!this.featureIdStartsWith(featureIntro.featureId, this.rewardsFeatureId) || rewardsEligibility.isEligible) {
                    results.unshift(featureIntro); // need to reverse the order as we're stacking the feature intros (first on top)
                }
            }

            if (results.length > 0) {
                this.featureIntros = results;
                this.showFeatureIntros(results);
            }
        });
    }

    private showFeatureIntros(featureIntros: FeatureIntro[]) {
        this.analytics.showFeatureIntro(this.featureIntros[this.featureIntros.length - 1].featureId);
        this.modalService.activate({
            title: '',
            cancelText: '',
            okText: '',
            modalType: 'emptyComponent',
            component: FeatureIntroModalComponent,
            fullScreen: false,
            dialogContainerClosable: true,
            componentData: { featureIntros: featureIntros }
        }).then((closedByBtn: boolean) => {
            if (!closedByBtn) { // closed modal by clicking on background or escape so need to mark it as viewed still
                let topFeatureIntro = FeatureIntroHelper.getFirstNonViewedFeatureIntro(featureIntros);
                if (topFeatureIntro) {
                    this.featureIntroService.markFeatureIntroAsViewed(topFeatureIntro.featureId).subscribe();
                    this.analytics.dismissFeatureIntro(topFeatureIntro.featureId);
                }
            }
        });
    }

    private featureIdStartsWith(featureId: string, match: string): boolean {
        featureId = (featureId + '').toUpperCase();
        match = (match + '').toUpperCase();

        return featureId.indexOf(match) === 0;
    }

}
