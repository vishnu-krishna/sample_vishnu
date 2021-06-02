import { Subject, Observable } from 'rxjs';

export class AnimatedScroller {

    public static scroll(newPosition: number, oldPosition: number, animationTime: number = 500, movementPercentage: number = 1): Observable<AnimatedScrollEvent> {
        let result = new Subject<AnimatedScrollEvent>();
        result.next(new AnimatedScrollEvent(AnimatedScrollEventType.Start));

        if (newPosition === oldPosition) {
            result.next(new AnimatedScrollEvent(AnimatedScrollEventType.Finish));
            result.complete();
        }

        let scrollForward = newPosition - oldPosition > 0;
        let overallMov = Math.abs(newPosition - oldPosition);
        let animationMillis = animationTime * movementPercentage;
        let startTime;

        let step = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }
            let progress = timestamp - startTime;
            let progPerc = Math.min(progress / animationMillis, 1);
            let mov = (overallMov * progPerc);
            let scrollTo = oldPosition + (scrollForward ? mov : -mov);

            result.next(new AnimatedScrollEvent(AnimatedScrollEventType.Scroll, scrollTo));

            if (progress <= animationMillis) {
                window.requestAnimationFrame(step);
            } else {
                result.next(new AnimatedScrollEvent(AnimatedScrollEventType.Finish));
                result.complete();
            }
        };

        window.requestAnimationFrame(step);

        return result;
    }

}

export enum AnimatedScrollEventType {
    Start,
    Scroll,
    Finish
}

export class AnimatedScrollEvent {
    constructor(public type: AnimatedScrollEventType, public scrollTo: number = null) {}
}
