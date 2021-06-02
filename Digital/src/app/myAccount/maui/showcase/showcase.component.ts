
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { DisplayPageNumber } from '../secondaryNavigation/secondaryNavigation.component';
import { PageInfo } from '../secondaryNavigation/showcase/secondaryNavigation.showcase.component';

@Component({
    selector: 'agl-maui-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, AfterViewInit {
    public display: boolean;
    public displayBackButton: boolean;
    public pageInfo = {
        pageNumber: 1,
        pageTotal: 10
    };
    public displayPageNumber: DisplayPageNumber;
    public showcaseList: string[] = [];
    public displayMobileMenu: boolean;
    private componentNamingConvention: string = 'AGL-MAUI-SHOWCASE-';

    public constructor(
        private elementRef: ElementRef
    ) {}

    public updateDisplay(display: boolean) {
        this.display = display;
    }

    public updateDisplayBackButton(displayBackButton: boolean) {
        this.displayBackButton = displayBackButton;
    }

    public updatePageNumberVisibility(displayPageNumber: DisplayPageNumber) {
        this.displayPageNumber = displayPageNumber;
    }

    public updatePageNumber(pageInfo: PageInfo) {
        this.pageInfo = pageInfo;
    }

    public toggleMobileMenu() {
        this.displayMobileMenu = !this.displayMobileMenu;
    }

    public scrollToComponent(showcaseItem: string) {
        const showcaseElement = document.querySelector(this.componentNamingConvention + showcaseItem);
        if (showcaseElement) {
            showcaseElement.scrollIntoView();

            const headerHeight = document.getElementsByClassName('showcase__mobile-header')[0].clientHeight;
            if (headerHeight > 0) {
                window.scroll(0, window.pageYOffset - headerHeight);
            }

            this.displayMobileMenu = false;
        }
    }

    public ngOnInit() {
        // Getting an array of all the components for display in the side nav
        const components = this.elementRef.nativeElement.querySelector('.showcase__components').children;
        for (let component of components) {
            const linkName = component.tagName.substring(this.componentNamingConvention.length).toLowerCase();
            this.showcaseList.push(linkName);
            this.showcaseList.sort();
        }
    }

    // this dynamically embeds google code-pretty (https://github.com/google/code-prettify) and
    // injects the code, to avoid bundling this library with the production build (only required for the showcase page)
    public ngAfterViewInit() {
        const script = document.createElement('script');
        script.type = 'text/javascript';

        // executed one script is loaded
        script.innerHTML = 'PR.prettyPrint();';

        script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
        this.elementRef.nativeElement.appendChild(script);
    }
}
