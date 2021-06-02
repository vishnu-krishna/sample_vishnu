import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PageScroller } from '../../shared/page-scroller';

@Component({
    selector: 'agl-rewards-generic-error',
    templateUrl: 'rewards-generic-error.component.html',
    styleUrls: ['rewards-generic-error.component.scss']
})

export class RewardsGenericErrorComponent implements AfterViewInit {

    @Output() public backClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngAfterViewInit() {
       setTimeout(() => PageScroller.scrollToTop(), 100);
    }
    public navigateBack() {
        this.backClick.emit(true);
    }
}
