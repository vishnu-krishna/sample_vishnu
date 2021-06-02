import { Injectable }           from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable }           from 'rxjs/Observable';
import { ConfigService }        from '../service/config.service';

@Injectable()
export class EmailReceiptService {

   private siteCoreUrl: string;

  /**
   * Creates an instance of ApiService.
   */
  constructor(
      private _http: Http,
      private _config: ConfigService) {
          this.siteCoreUrl = this._config.current.aglSiteCoreWebsiteBaseUrl;
      }

  public postEmail(data): Observable<{}> {
      return this.postEmailService({ url: `${this.siteCoreUrl}/svc/MakePayment/SendPaymentReceiptEmail`, emailInformation: data });
  }

   public postEmailOld(data): Observable<{}> {
      return this.postEmailService({ url: `${this.siteCoreUrl}/svc/MakePayment/submitEmailForReceipt`, emailInformation: data });
  }

  private postEmailService<T>(data): Observable<T> {
    return this._http.post(data.url, data.emailInformation, new RequestOptions({ withCredentials: true }))
        .catch((err) => {
            return Observable.throw(err.json());
        })
        .map((response) =>
            <T> response.json());
  }
}
