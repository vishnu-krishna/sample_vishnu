import { Component } from '@angular/core';

@Component({
    selector: 'agl-usage-legal-message',
    templateUrl: './usageLegalMessage.component.html',
    styleUrls: ['./usageLegalMessage.component.scss']
})
export class UsageLegalMessageComponent {

   public isUsageInsightWarningReadMore: boolean = false; // True if user clicks the Read more link in the usage Insight warning message

    public usageInsightWarningReadMore(result) {
        this.isUsageInsightWarningReadMore = result;
    }

}
