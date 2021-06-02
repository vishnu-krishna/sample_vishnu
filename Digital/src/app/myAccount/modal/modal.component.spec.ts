import {
  inject,
  TestBed,
} from '@angular/core/testing';

// Load the implementations that should be tested
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { DeviceDetectorService } from '../../shared/service/deviceDetector.service';

describe('ModalComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalComponent,
        ModalService,
        DeviceDetectorService,
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    });
  });

  it('modal should activate', inject([ModalComponent], (modal: ModalComponent) => {
    let activateModal = modal.activate({
      title: 'Make a test',
      message: ` <p>Message</p> `,
      cancelText: 'cancel',
      okText: 'ok',
      modalType: 'normal',
    });
    expect(activateModal).toBeDefined();
  }));

});
