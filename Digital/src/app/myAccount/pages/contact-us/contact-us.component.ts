import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService }   from '../../../shared/service/document.service';

@Component({
    selector: 'agl-account-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  constructor(
     private _dom: DocumentService
  ) { }

  public ngOnInit() {
      // This is temporary, we cannot directly access the body so we change it here.
      this._dom.setStyle(this._dom.querySelector('', 'body'), 'background-image', 'radial-gradient(circle at 51% 48%, hsla(210, 13%, 13%, 0.8), hsla(0,0%,0%,1) 41%)');
  }

  public ngOnDestroy() {
      // This is temporary, we cannot directly access the body so we remove it here.
      this._dom.removeAttribute(this._dom.querySelector('', 'body'), 'style');
  }
}
