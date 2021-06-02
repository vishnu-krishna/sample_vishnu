# AGL My Account v2.0

This the base directory for the custom AGL modal component, this document will outline how to implement the modal inside your own components.

### Quick start

Quick implementation: Typescript

```ts
import {ModalService} from '../modal/modal.service';
import {ModalComponent} from '../modal/modal.component';
@Component({
    selector: 'agl-anything',
    template: require('./anything.component.html'),
    styleUrls: ['./anything.component.scss'],
    directives: [
        ModalComponent
    ],
    providers: [ModalService]
})
export class DashboardComponent {
  showConfirmDialog() {
      this._confirmService.activate(
        {
          message: '<h1>Test</h1>',
          title: '',
          modalType: 'normal',
        }
      ).then(res => console.log(`Confirmed: ${res}`));
  }
}
```

Quick implementation: HTML

```html
<div (click)="showConfirmDialog()">Click Me</div>
<agl-modal-confirm></agl-modal-confirm>
```

### Modal options

```js
{
  title: 'Error', // Optional | Has Default
  message: 'An error has occurred within the application, please try again.', // Required (HTML applicable)
  cancelText: 'Cancel Text', // Optional | Has no default, will not show if blank.
  okText: 'Ok Test', // Optional | Has no default, will not show if blank.
  modalType: 'error' // Required | Use 'error' or 'normal'
}
```
