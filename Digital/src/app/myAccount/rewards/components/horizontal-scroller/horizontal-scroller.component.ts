import { Component, Input, AfterViewInit, OnChanges, OnDestroy, SimpleChanges, ViewChild, ElementRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { AnimatedScroller, AnimatedScrollEventType } from '../../shared/animated-scroller';

@Component({
    selector: 'agl-horizontal-scroller',
    templateUrl: './horizontal-scroller.component.html',
    styleUrls: ['./horizontal-scroller.component.scss']
})
export class HorizontalScrollerComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() public indicatorCount = 0;
    @Input() public scrollDuration = 400;
    @Input() public showNavButtons = false;
    @HostBinding('class.mobile-only') @Input() public mobileOnly = true;
    @Output() public indicatorChanged: EventEmitter<number> = new EventEmitter<number>();
    public isScrollable = false;
    public indicators: number[] = [];
    public activeIndicator: number = 0;

    @ViewChild('scroller') private scrollerElement: ElementRef;
    @ViewChild('spacerLeft') private spacerLeftElement: ElementRef;
    @ViewChild('spacerRight') private spacerRightElement: ElementRef;
    @ViewChild('scrollerItems') private scrollerItemsElement: ElementRef;
    private scroller = new HorizontalScrollerHelper();
    private windowResizeTimeout: any;
    private scrollTimeout: any;
    private ignoreScrollEvents = false;

    public ngOnChanges(changes: SimpleChanges): void {
        let change = changes['indicatorCount'];
        if (change) {
            this.setupIndicatorsArray();
            if (!change.firstChange) {
                this.scroller.reset(this.scrollerElement, this.spacerLeftElement, this.spacerRightElement, this.scrollerItemsElement, this.indicatorCount);
            }
        }
    }

    public ngAfterViewInit() {
        this.scrollerElement.nativeElement.addEventListener('scroll', this.scrollerScrollEvent);

        window.addEventListener('resize', this.windowResizeEvent);

        setTimeout(() => {
            this.scroller.reset(this.scrollerElement, this.spacerLeftElement, this.spacerRightElement, this.scrollerItemsElement, this.indicatorCount);
            this.checkIsScrollable();
        });
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this.windowResizeEvent);
        this.scrollerElement.nativeElement.removeEventListener('scroll', this.scrollerScrollEvent);
    }

    public setActiveIndicator(index: number, scrollToPosition: boolean = true, scrollDuration: number = this.scrollDuration) {
        if (index < this.indicatorCount && index >= 0) {

            if (!scrollToPosition && index === this.activeIndicator) {
                return;
            }
            const prevIndicator = this.activeIndicator;
            this.activeIndicator = index;

            if (this.scroller && scrollToPosition) {
                this.ignoreScrollEvents = true;

                this.animatedScrollLeft(this.scroller.indicatorScrollPosition(index), Math.abs(index - prevIndicator) / 4, scrollDuration).subscribe( () => {
                    setTimeout( () => this.ignoreScrollEvents = false, 200);
                    if (prevIndicator !== this.activeIndicator) {
                        this.indicatorChanged.emit(this.activeIndicator);
                    }
                });
            } else {
                this.indicatorChanged.emit(this.activeIndicator);
            }
        }
    }

    public showPreviousItem() {
        this.setActiveIndicator(this.activeIndicator - 1);
    }

    public showNextItem() {
        this.setActiveIndicator(this.activeIndicator + 1);
    }

    private setupIndicatorsArray() {
        const results: number[] = [];

        for (let i = 0; i < this.indicatorCount; i++) {
            results.push(i);
        }

        this.indicators = results; // need an array to loop through for the ngFor (can't seem to loop through a count)
    }

    private checkIsScrollable() {
        this.isScrollable = this.scroller.isScrollable();
    }

    private setActiveIndicatorBasedOnScrollPosition() {
        const closestIndicator = this.scroller.findClosestIndicatorToScrollPosition();
        this.setActiveIndicator(closestIndicator, false);
    }

    private scrollerScrollEvent = (e: any) => {
        if (this.indicatorCount > 0 && !this.ignoreScrollEvents) {
            this.setActiveIndicatorBasedOnScrollPosition();
        }
    }

    private windowResizeEvent = (e: UIEvent) => {
        if (this.indicatorCount <= 0) {
            return;
        }

        if (this.windowResizeTimeout) {
            clearTimeout(this.windowResizeTimeout);
        }
        this.windowResizeTimeout = setTimeout( () => {
            this.scroller.reset(this.scrollerElement, this.spacerLeftElement, this.spacerRightElement,  this.scrollerItemsElement, this.indicatorCount);
            this.checkIsScrollable();
            this.setActiveIndicatorBasedOnScrollPosition();
        }, 200);
    }

    private animatedScrollLeft(scrollLeft: number, movementPercentage: number = 1, scrollDuration: number): Observable<boolean> {
        let result = new Subject<boolean>();

        AnimatedScroller.scroll(scrollLeft, this.scroller.scrollLeft, scrollDuration, movementPercentage).subscribe( (event) => {
            if (event.type === AnimatedScrollEventType.Scroll) {
                this.scroller.scrollLeft = event.scrollTo;
            } else if (event.type === AnimatedScrollEventType.Finish) {
                result.next(true);
                result.complete();
            }
        });

        return result;
    }

}

class HorizontalScrollerHelper {
    public hasSpacers = false;
    private scroller: ElementRef;
    private spacerLeft: ElementRef;
    private spacerRight: ElementRef;
    private scrollerItems: ElementRef;
    private itemCount: number = 0;
    private itemWidth: number = 0;

    public reset(scroller: ElementRef, spacerLeft: ElementRef, spacerRight: ElementRef, scrollerItems: ElementRef, itemCount: number) {
        this.scroller = scroller;
        this.spacerLeft = spacerLeft;
        this.spacerRight = spacerRight;
        this.scrollerItems = scrollerItems;
        this.itemCount = itemCount;
        this.itemWidth = this.calcItemWidth();
        this.setSpacerSizes();
    }

    public get scrollLeft(): number {
        if (this.scroller) {
            return this.scroller.nativeElement.scrollLeft;
        } else {
            return 0;
        }
    }

    public set scrollLeft(val: number) {
        if (this.scroller) {
            this.scroller.nativeElement.scrollLeft = val;
        }
    }

    public indicatorScrollPosition(index: number): number {
        if (this.scroller && this.itemCount > 0) {
            if (index === 0) {
                return 0;
            } else if (index === this.itemCount - 1) {
                return this.scrollableWidth();
            } else {
                let spacerWidth = this.spacerWidth();
                let screenScroll = (index * this.itemWidth);
                let offset = (this.clientWidth - this.itemWidth) / 2;
                return (screenScroll - offset) + spacerWidth;
            }
        } else {
            return 0;
        }
    }

    public isScrollable() {
        if (this.scroller) {
            return this.scroller.nativeElement.scrollWidth !== this.clientWidth;
        } else {
            return false;
        }
    }

    public findClosestIndicatorToScrollPosition(): number {
        const scrollLeft = this.scrollLeft;

        let result = null;
        let closestPos = 0;
        for (let i = 0; i < this.itemCount; i++) {
            const pos = this.indicatorScrollPosition(i);

            if (result === null || Math.abs(scrollLeft - pos) < Math.abs(scrollLeft - closestPos)) {
                result = i;
                closestPos = pos;
            }
        }
        return result;
    }

    private setSpacerSizes() {
        if (this.scroller) {
            if (this.spacerLeft) {
                this.spacerLeft.nativeElement.style.minWidth = this.spacerWidth() + 'px';
                this.spacerLeft.nativeElement.style.maxWidth = this.spacerWidth() + 'px';
            }
            if (this.spacerRight) {
                this.spacerRight.nativeElement.style.minWidth = this.spacerWidth() + 'px';
                this.spacerRight.nativeElement.style.maxWidth = this.spacerWidth() + 'px';
            }
        }
    }

    private scrollableWidth(): number {
        if (this.scroller) {
            return this.scroller.nativeElement.scrollWidth - this.clientWidth;
        } else {
            return 0;
        }
    }

    private get clientWidth(): number {
        if (this.scroller) {
            return this.scroller.nativeElement.clientWidth;
        } else {
            return 0;
        }
    }

    private calcItemWidth(): number {
        if (this.scrollerItems && this.itemCount > 0) {
            return this.elementWidth(this.scrollerItems.nativeElement) / this.itemCount;
        }

        return 0;
    }

    private spacerWidth(): number {
        if (this.scroller && this.spacerLeft && this.spacerRight) {
            return (this.clientWidth - this.itemWidth) / 2;
        } else {
            return 0;
        }
    }

    private elementWidth(element: any): number {
        return element.offsetWidth;
    }

}
