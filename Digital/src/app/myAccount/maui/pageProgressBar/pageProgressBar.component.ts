import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'agl-maui-page-progress-bar',
    templateUrl: './pageProgressBar.component.html',
    styleUrls: ['./pageProgressBar.component.scss']
})
export class MauiPageProgressBarComponent implements OnInit, OnChanges {
    @Input() public totalPages: string = '';
    @Input() public currentPage: string = '';

    public pageNumbers: number[];
    public current: number;
    public total: number;
    public pageError: boolean;

    public ngOnInit() {
        this.render();
    }

    public ngOnChanges() {
        this.render();
    }

    private render() {
        this.current = Number(this.currentPage);
        this.total = Number(this.totalPages);

        this.pageError = isNaN(this.current)
            || isNaN(this.total)
            || !Number.isInteger(this.current)
            || !Number.isInteger(this.total)
            || this.current < 1
            || this.total < 1
            || this.current > this.total;

        if (!this.pageError) {
            this.pageNumbers = Array.from(Array(this.total)).map((x, i) => i + 1);
        } else {
            this.pageNumbers = [];
        }
    }
}
