import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-page-progress-bar',
    templateUrl: './showcasePageProgressBar.component.html',
    styleUrls: ['./showcasePageProgressBar.component.scss']
})

export class ShowcaseMauiPageProgressBarComponent implements OnInit {
    public display: boolean;
    public currentPage: string = '1';
    public totalPages: string = '10';
    public noPrevious: boolean;
    public noNext: boolean;

    public codeUsage: string = `
        <agl-maui-page-progress-bar
            currentPage="1"
            totalPages="10">
        </agl-maui-page-progress-bar>
    `;

    public ngOnInit() {
        this.switchBackAndNext();
    }

    public changePageProgressBar(current: string, total: string) {
        this.currentPage = current;
        this.totalPages = total;
        this.switchBackAndNext();
    }

    public nextPage() {
        let current = Number(this.currentPage);
        if (!isNaN(current) && Number.isInteger(current)) {
            this.currentPage = (++current).toString();
        }
        this.switchBackAndNext();
    }

    public previousPage() {
        let current = Number(this.currentPage);
        if (!isNaN(current) && Number.isInteger(current)) {
            this.currentPage = (--current).toString();
        }
        this.switchBackAndNext();
    }

    private switchBackAndNext() {
        let current = Number(this.currentPage);
        let total = Number(this.totalPages);
        this.noPrevious = isNaN(current) || !Number.isInteger(current) || current === 1;
        this.noNext = isNaN(current) || !Number.isInteger(current) || isNaN(total) || !Number.isInteger(total) || current === total;
    }
}
