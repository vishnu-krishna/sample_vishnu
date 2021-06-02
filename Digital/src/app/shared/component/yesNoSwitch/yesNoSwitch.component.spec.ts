import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { YesNoModel, YesNoSwitchComponent } from './yesNoSwitch.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe ('YesNo Component', () => {
    let comp: YesNoSwitchComponent;
    let fixture: ComponentFixture<YesNoSwitchComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let messageBusService = {
        // tslint:disable-next-line:no-empty
        broadcast: (): any => {
        },
        listenWithLatest: (): any => {
            return Observable.of({});
        },
        listen: (): any => {
            return Observable.of({});
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                YesNoSwitchComponent
            ],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: IMessageBusService, useValue: messageBusService }
            ]
        });

        fixture = TestBed.createComponent(YesNoSwitchComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('yesNoSwitch', () => {
            it ('should display Yes button', () => {
                let desktopLinkElement = de.query(By.css('.yes-no-switch-toggle__on'));
                el = desktopLinkElement.nativeElement;
                expect(el.innerText.trim()).toBe('Yes');
            });

            it ('should display tick icon', () => {
                const compiled = fixture.debugElement.nativeElement;
                let model = new YesNoModel();
                model.isYes = true;
                comp.yesNoModel = model;
                comp.toggleSwitch();
                fixture.detectChanges();
                el = de.query(By.css('span.no')).nativeElement;
                expect(el).toBeTruthy();
            });

            it ('should display busy icon', () => {
                const compiled = fixture.debugElement.nativeElement;
                let model = new YesNoModel();
                model.isYes = false;
                comp.yesNoModel = model;
                comp.toggleSwitch();
                fixture.detectChanges();
                el = de.query(By.css('span.yes')).nativeElement;
                expect(el).toBeTruthy();
            });
    });
});
