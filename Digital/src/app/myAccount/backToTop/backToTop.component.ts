import { Component }  from '@angular/core';

@Component({
    selector: 'agl-back-to-top',
    templateUrl: './backToTop.component.html',
    styleUrls: ['./backToTop.component.scss'],
})
export class BackToTopComponent {

    private _scrollSpeed: number = 4;

    public smoothScrollToTop() {
        let startY = this.currentYPosition();
        let stopY = 0;
        let distance = (stopY > startY) ? (stopY - startY) : (startY - stopY);
        if (distance < 100) {
            window.scrollTo(0, stopY);
            return;
        }
        let step = Math.round(distance / 100);
        let leapY = (stopY > startY) ? (startY + step) : (startY - step);
        let timer = 0;
        for (let i = startY; i > stopY; i -= step) {
            this.scrollTo(leapY, timer * this._scrollSpeed);
            leapY -= step;
            if (leapY < stopY) {
                leapY = stopY;
            }
            timer++;
        }
    }

    private scrollTo(yPoint: number, duration: number) {
        setTimeout(() => {
            window.scrollTo(0, yPoint);
        }, duration);
    }

    private currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
            return self.pageYOffset;
        }
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
            return document.body.scrollTop;
        }
        return 0;
    }
}
