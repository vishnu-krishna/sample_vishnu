import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-maui-secondary-navigation',
    templateUrl: './secondaryNavigation.component.html',
    styleUrls: ['./secondaryNavigation.component.scss']
})
export class MauiSecondaryNavigationComponent {

    @Input() public text: string;
    @Input() public textMobile = '';
    @Input() public display = false;
    @Input() public displayBackButton = false;
    @Input() public displayPageNumber?: DisplayPageNumber;
    @Input() public pageNumber?: number;
    @Input() public pageTotal?: number;

    @Output() public clicked = new EventEmitter();

    public hideNavigation = false;
    private currentYPosition = 0;

    public goBack() {
        this.clicked.emit();
    }

    public displayPageNumberOnMobile(): boolean {
        return this.displayPageNumber === DisplayPageNumber.OnMobile;
    }

    public displayPageNumberOnDesktop(): boolean {
        return this.displayPageNumber === DisplayPageNumber.OnDesktop;
    }

    @HostListener('window:scroll', [])
    public onWindowScroll() {

        let newYPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let difference = newYPosition - this.currentYPosition;

        this.currentYPosition = newYPosition;

        if (newYPosition <= 0) { // to handle issue with iPhone where nav would disappear when scrolling back to top
            this.hideNavigation = false;
        } else if (Math.abs(difference) > 0) { // IE will give 0 when the scrolling end
            this.hideNavigation = difference > 0;
        }
    }
}

export enum DisplayPageNumber {
    OnMobile = 'OnMobile',
    OnDesktop = 'OnDesktop'
}
