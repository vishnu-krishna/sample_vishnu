import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { FeatureIntro } from '../shared/featureIntro';

@Component({
    selector: 'agl-feature-intro',
    templateUrl: './featureIntroDetail.component.html',
    styleUrls: ['./featureIntroDetail.component.scss']
})
export class FeatureIntroDetailComponent {
    @Input() public featureIntro: FeatureIntro = new FeatureIntro();
    @Output() public dismissFeatureIntro = new EventEmitter<boolean>();

    @HostBinding('class.viewed') get hasViewed() {
        return this.featureIntro.hasViewed;
    }

    constructor(private router: Router) {}

    public ctaPositiveAction() {
        if (this.featureIntro.content.positiveCtaRoute) {
            this.router.navigate([this.featureIntro.content.positiveCtaRoute]).then(() => {

                // The history.pushState is needed because when the modal closes (via call to dismissFeatureIntro) it calls location.back
                // to handle browser back button scenarios.
                // Without the pushState added here the location.back will return us to where we were before the router.navigate (cancelling out the route)
                // making it look like nothing happened
                window.history.pushState(window.history.state, window.document.title, window.location.href);

                this.dismissFeatureIntro.emit(true);
            });
        }
    }

    public ctaNegativeAction() {
        this.dismissFeatureIntro.emit(false);
    }
}
