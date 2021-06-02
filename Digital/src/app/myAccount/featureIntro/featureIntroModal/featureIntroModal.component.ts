import { Component, Input } from '@angular/core';

import { ModalService } from '../../modal/modal.service';
import { FeatureIntroService } from '../services/featureIntro.service';
import { FeatureIntro } from '../shared/featureIntro';
import { FeatureIntroHelper } from '../shared/featureIntroHelper';
import { FeatureIntroAnalytics } from '../services/featureIntro-analytics';

@Component({
    selector: 'agl-feature-intro-modal',
    templateUrl: './featureIntroModal.component.html',
    styleUrls: ['./featureIntroModal.component.scss']
})
export class FeatureIntroModalComponent {
    @Input() public featureIntros: FeatureIntro[] = []; // last intro will show first

    constructor(private modalService: ModalService, private featureIntroService: FeatureIntroService, private analytics: FeatureIntroAnalytics) { }

    public dismissFeatureIntro(pageNavigationOccurred: boolean) {
        let currentFeatureIntro = FeatureIntroHelper.getFirstNonViewedFeatureIntro(this.featureIntros);
        if (pageNavigationOccurred) {
            this.analytics.navigateToFeature(currentFeatureIntro.featureId);
        } else {
            this.analytics.dismissFeatureIntro(currentFeatureIntro.featureId);
        }
        this.showNextFeatureOrCloseModal(pageNavigationOccurred);
    }

    public showCloseBtn() {
        let currentFeatureIntro = FeatureIntroHelper.getFirstNonViewedFeatureIntro(this.featureIntros);
        return currentFeatureIntro && !currentFeatureIntro.content.showCta;
    }

    private showNextFeatureOrCloseModal(pageNavigationOccurred: boolean) {
        let currentFeatureIntro = FeatureIntroHelper.getFirstNonViewedFeatureIntro(this.featureIntros);
        if (currentFeatureIntro) {
            this.featureIntroService.markFeatureIntroAsViewed(currentFeatureIntro.featureId).subscribe(); // don't wait - don't care if it fails
            currentFeatureIntro.hasViewed = true;

            let nextFeatureIntro = FeatureIntroHelper.getFirstNonViewedFeatureIntro(this.featureIntros);
            if (!nextFeatureIntro || pageNavigationOccurred) {
                this.modalService.close();
            } else {
                this.analytics.showFeatureIntro(nextFeatureIntro.featureId);
            }
        } else {
            this.modalService.close(); // this shouldn't occur - should always be featureIntros
        }
    }
}
