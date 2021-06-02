import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable, Subscriber } from 'rxjs';

import { ContentService } from '../../shared/service/content.service';
import { TrackerService } from '../services/tracker.service';

@Injectable()
export class OmmTrackerGuard implements CanActivate {

    constructor(private router: Router, public trackerService: TrackerService, private contentService: ContentService) {

    }
    public canActivate(route: ActivatedRouteSnapshot): Observable<any> {
        return this.canShowTracker();
    }

    // It checks the value of the feature flag set in the site core
    private canShowTracker(): Observable<any> {
        let sitecoreDataObs = this.trackerService.loadContent().map((data) => {
            let trackerFeatureFlag = false;
            if (data && data.showTracker) {
                trackerFeatureFlag = true;
            } else {
                trackerFeatureFlag = false;
            }
            return trackerFeatureFlag;
        });
        return new Observable((observer: Subscriber<any>) => {
            sitecoreDataObs.subscribe(
                (trackerFeatureFlag: any) => {
                    if (trackerFeatureFlag) {
                        observer.next(true);
                    } else {
                        this.router.navigate(['/overview']);
                        observer.next(false);
                    }
                    observer.complete();
                },
                (error) => {
                    observer.next(false);
                }
            );
        });
    }
}
