import { AnimatedScroller, AnimatedScrollEventType } from './animated-scroller';

export class PageScroller {

    public static scrollIntoView(querySelector: string, offsetBelowElement: number = 0, movementPercentage: number = 1, animationTime: number = 450) {
        let element = PageScroller.getElement(querySelector);
        if (!PageScroller.isElementInView(element)) {
            let elementPos = PageScroller.elementPosition(element);
            let pageBottomPos = PageScroller.pageBottomPosition();
            let pageTopPosition = PageScroller.scrollPosition();
            let elementHeight = PageScroller.elementHeight(element);

            let diff = elementPos - pageBottomPos;

            PageScroller.animatedScroll(pageTopPosition + diff + elementHeight + offsetBelowElement, animationTime, movementPercentage);
        }
    }

    public static scrollIntoViewFromTop(querySelector: string, offsetAboveElement: number = 0, movementPercentage: number = 1, animationTime: number = 450) {
        let element = PageScroller.getElement(querySelector);
        if (!PageScroller.isElementInView(element)) {
            let elementPos = PageScroller.elementPosition(element);

            PageScroller.animatedScroll(elementPos - offsetAboveElement, animationTime, movementPercentage);
        }
    }

    public static scrollToTop() {
        window.scrollTo(0, 0);
    }

    public static getElement(querySelector: string): Element {
        return document.querySelector(querySelector);
    }

    public static isElementInView(element: Element): boolean {
        let elementPos = PageScroller.elementPosition(element);
        let pageBottomPos = PageScroller.pageBottomPosition();
        let pageTopPosition = PageScroller.scrollPosition();

        return elementPos < pageBottomPos && elementPos >= pageTopPosition;
    }

    private static documentHeight(): number {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    private static viewportHeight(): number {
        return Math.max(window.innerHeight, document.body.clientHeight);
    }

    private static scrollPosition(): number {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    private static elementPosition(element: Element): number {
        let rect = element.getBoundingClientRect();
        return rect.top + PageScroller.scrollPosition();
    }

    private static pageBottomPosition(): number {
        return PageScroller.viewportHeight() + PageScroller.scrollPosition();
    }

    private static elementHeight(element: Element): number {
        return element.getBoundingClientRect().height || element.clientHeight;
    }

    private static animatedScroll(scrollToPosition: number,  animationTime: number, movementPercentage: number = 1) {
        AnimatedScroller.scroll(scrollToPosition, PageScroller.scrollPosition(), animationTime, movementPercentage).subscribe((event) => {
            if (event.type === AnimatedScrollEventType.Scroll) {
                window.scrollTo(0, event.scrollTo);
            }
        });
    }

}
