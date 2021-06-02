import { Component, EventEmitter, Input, OnInit, Output, SecurityContext, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertType } from '../../globals/alertType';

@Component({
    selector: 'agl-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
    @Input() public alertType: string;
    @Input() public heading: string = '';
    @Input() public body: string = '';

    // This bypasses Angular default HTML Sanitization to allow all HTML
    @Input() public allowAllHtml: boolean;
    @Input() public isDismissible: string;
    @Input() public showIcon: boolean = true;

    public showClose: boolean = true;
    public hasAlertType: boolean = false;
    public dismissAlert: boolean = false;
    public headingHtml: SafeHtml | string;
    public bodyHtml: SafeHtml | string;

    @Output() public closeEvent = new EventEmitter();

    constructor(private sanitizer: DomSanitizer) {
    }

    /**
     * Converts the Alert Type Enum to string
     * @param {string} alertType
     * @memberOf AlertComponent
     */
    public convertAlertTypeEnumToString(alertType: string) {
        if (AlertType[AlertType[alertType.toLowerCase()]]) {
            this.hasAlertType = true;
        }
    }

    public ngOnInit() {
        this.showClose = (this.isDismissible === 'true');

        this.convertAlertTypeEnumToString(this.alertType);
        if (!this.hasAlertType) {
            let errorMessage = (
                `---------
                Alert Type is not recognised.
                Accepted types: Pending, Inform, Success, Warning or Error.
                ---------`
            );
            console.error(errorMessage.replace(/  +/g, ' '));
        } else {
            if (this.allowAllHtml) {
                this.headingHtml = this.sanitizer.bypassSecurityTrustHtml(this.heading);
                if (this.headingHtml == null) {
                    this.headingHtml = '';
                }
                this.bodyHtml = this.sanitizer.bypassSecurityTrustHtml(this.body);
                if (this.bodyHtml == null) {
                    this.bodyHtml = '';
                }
            } else {
                this.headingHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.heading);
                if (this.headingHtml == null) {
                    this.headingHtml = '';
                }
                this.bodyHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.body);
                if (this.bodyHtml == null) {
                    this.bodyHtml = '';
                }
            }
        }
    }

    public dismiss() {
        this.dismissAlert = true;
        this.closeEvent.emit(false); // show flag set to false;
    }
}
