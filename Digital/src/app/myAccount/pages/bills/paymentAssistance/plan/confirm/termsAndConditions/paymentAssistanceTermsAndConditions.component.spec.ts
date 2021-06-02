import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { PaymentAssistanceTermsAndConditionsComponent } from './paymentAssistanceTermsAndConditions.component';
import { By } from '@angular/platform-browser';
import { PaymentAssistanceTermsAndConditionsModule } from './paymentAssistanceTermsAndConditions.module';

@Component({
    selector: 'agl-test-wrapper-component',
    template: ` <agl-payment-assistance-terms-conditions></agl-payment-assistance-terms-conditions>`,
})

class TestWrapperComponent {
}

describe('AGL Payment Assistance Terms and Conditions component', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;
    let de: DebugElement;
    let comp: PaymentAssistanceTermsAndConditionsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestWrapperComponent
            ],
            imports: [
                PaymentAssistanceTermsAndConditionsModule
            ]
        });

        fixture = TestBed.createComponent(TestWrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();
        comp = de.children[0].componentInstance;
    }));

    it('should show the lightbox when the terms and conditions link is clicked', () => {

        // arrange
        const link = fixture.nativeElement.querySelector('#paymentAssistanceTermsAndCondtionsLink');
        link.click();
        fixture.detectChanges();
        const lightBox = de.query(By.css('.maui-lightbox'));

        // assert
        expect(lightBox).toBeDefined();
    });

    it('should call onClickButtonPrimary to close the lightbox and submit onchange event when the accept button is clicked ', () => {

        // arrange
        const link = fixture.nativeElement.querySelector('#paymentAssistanceTermsAndCondtionsLink');
        link.click();
        fixture.detectChanges();

        // act
        const acceptButton = fixture.nativeElement.querySelector('.maui-button--primary');
        spyOn(comp.termAccepted, 'emit');
        spyOn(comp.termsAndConditionsLightBox, 'showLightBox');
        acceptButton.click();
        fixture.detectChanges();

        // assert
        expect(comp.termAccepted.emit).toHaveBeenCalled();
        expect(comp.termsAndConditionsLightBox.showLightBox).toHaveBeenCalled();
    });

    it('should call onClickButtonDismiss to close the lightbox event when the close button is clicked ', () => {

        // arrange
        const link = fixture.nativeElement.querySelector('#paymentAssistanceTermsAndCondtionsLink');
        link.click();
        fixture.detectChanges();

        // act
        const closeButton = fixture.nativeElement.querySelector('.maui-button--tertiary');
        spyOn(comp, 'onClickButtonDismiss');
        closeButton.click();
        fixture.detectChanges();

        // assert
        expect(comp.onClickButtonDismiss).toHaveBeenCalled();
    });

});
