import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../shared/service/config.service';

@Injectable()
export class CcPaymentUrlService {
  public useFakePaymentIframeUrl: Boolean;
  constructor(
    private sanitizer: DomSanitizer,
    private _config: ConfigService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.useFakePaymentIframeUrl = params['paymentGatewayUnreachable'] ? true : false;
    });
  }

  public get url(): any {
    let iframeUrl: any;
    if (this.useFakePaymentIframeUrl) {
      iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.thissitedoesnotexist.com');
    } else {
      let frameUrl = `${this._config.current.aglWebPaymentApiBaseUrl}/payByCreditCard?AllowedURI=https%3A%2F%2F${encodeURIComponent(window.location.host)}&&view=payByCredit`;
      iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(frameUrl);
    }
    return iframeUrl;
  }

  public get timeout(): number {
    if (this.useFakePaymentIframeUrl) {
      return 500;
    } else {
      return 5000;
    }
  }
}
