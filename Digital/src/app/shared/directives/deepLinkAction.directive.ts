import { AfterViewInit, Directive, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Directive({
    selector: '[aglDeepLinkAction]'
})
export class DeepLinkActionDirective implements AfterViewInit {
    @Output('aglDeepLinkAction') public aglDeepLinkAction = new EventEmitter<string>();

    constructor(private route: ActivatedRoute) {
    }

    public ngAfterViewInit(): void {
        // must use a whitelist as query string params are un-sanitized (plus 'run deep link action' values are being
        // routed through external systems and are more visible to people causing mischief)
        let whitelist = ['1', 'meterread']; // use '1' to know that a deep link is in use, else add a specific value that you need to this array.

        this.route.queryParamMap.subscribe((params: ParamMap) => {
            let paramVal = String(params.get('rdla'));

            if (paramVal && whitelist.some((v: string) => v === paramVal )) {
                console.info(`aglDeepLinkAction: Action requested`);
                this.aglDeepLinkAction.emit(paramVal);
            }
        });
    }
}
