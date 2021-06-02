import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule }                       from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../modules/my-account.material.module';

import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { SSMRComponent } from './ssmr.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('SSMR Component Tests', () => {
    let comp: SSMRComponent;
    let fixture: ComponentFixture<SSMRComponent>;
    let de: DebugElement;

    let routeParams = {
        backTo: '/usage',
        scrollToY: 10,
    };

    let routerStub = {
        navigate: ( commands: any, extras: any ) => {
            console.log(`commands: ${commands}. extras: ${extras}`);
        }
    };

    let activatedRouteStub = {
        get params(): Observable<{}> {
            return Observable.of(routeParams);
        }
    };

    let locationStub = {
        back(): void {
            console.log('Back');
        }
    };

    describe( 'Test component initial state', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    SSMRComponent
                ],
                imports: [
                    MyAccountMaterialModule,
                    HttpModule,
                    HttpClientTestingModule,
                ],
                providers: [
                    { provide: Router, useValue: routerStub },
                    { provide: Location, useValue: locationStub },
                    { provide: ActivatedRoute, useValue: activatedRouteStub },
                    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
                ]
            });
            fixture = TestBed.createComponent( SSMRComponent );
            comp = fixture.componentInstance;
        });

        it( 'Should show the SSMR view.', () => {
            de = fixture.debugElement;
            fixture.detectChanges();
            let headingElement = de.query( By.css( '.heading' ));
            const headingText = 'Please take care';
            expect( headingElement.nativeElement.textContent.trim()).toBe(headingText,
                'headingElement');
        });

        // it( 'Activated route parameters should be assigned on initialization.', () => {
        //     fixture.detectChanges();
        //     expect( comp.backTo ).toBe(routeParams.backTo);
        //     expect( comp.scrollToY ).toBe(routeParams.scrollToY);
        // });

        // fit( 'Should tell Router to navigate when close button is clicked.', inject( [Router], (router: Router) => {
        //     fixture.detectChanges();
        //     spyOn(routerStub, 'navigate');
        //     spyOn(comp, 'onClickClose');
        //     spyOn(comp, 'goBack');

        //     comp.onClickClose();
        //     // routerStub.navigate(null, null);
        //     fixture.detectChanges();
        //     //expect(comp.goBack).toHaveBeenCalled();
        //     expect(comp.onClickClose).toHaveBeenCalled();

        //     //expect(routerStub.navigate).toHaveBeenCalled();
        //     // const navigateSpyArgs = navigateSpy.calls.first().args;
        //     // console.log('nav args: ', navigateSpyArgs);
        //     // expect( navigateSpyArgs[0] ).toBe('',
        //     //     'should navigate back to usage');
        // }));
        //     inject( [Router], (router: Router) => {
    });
});
