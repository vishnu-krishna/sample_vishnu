import { FuelChipComponent } from '../fuelChip.component';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState, MauiSecondaryMessageStatusType } from '../fuelChip.component.enum';
import { FuelChipContract , FuelChipContractAccountDetails  } from '../fuelChip.component.model';
import { FuelChipMessageComponent } from '../fuelChipMessage/fuelChipMessage.component';

import { Component, DebugElement, QueryList } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { MauiFuelChipModule } from '../index';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                    [fuelChipState]="MauiFuelChipState.PreSetup"
                    [fuelType]="MauiFuelChipFuelType.Electricity"
                    [fuelContext]="MauiFuelChipFuelContextEnum.None"
                   >
                </agl-maui-fuel-chip>`,
                })

class TestWrapperComponent {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContextEnum = MauiFuelChipFuelContext;
}

describe('Fuel chip Message component', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;
    let de: DebugElement;
    let comp: FuelChipComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TestWrapperComponent ],
            imports: [ MauiFuelChipModule ]
        });

        fixture = TestBed.createComponent(TestWrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();
        comp = de.children[0].componentInstance;
    }));

    describe('Primary message', () => {
        it('should not show the primary message text when its not passed in', () => {
            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-with-address');
            expect(nativeElement).toBeNull();
        });

        it('should show the primary message text when its passed in', () => {
            const primaryMessage = 'Primary Msg';
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = primaryMessage;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-with-address').textContent;
            expect(nativeElementText).toContain(primaryMessage);
        });

        it('should show primary status link when passed in with no account details', () => {
            const primaryMessageLink = { key: 'key', title: 'title' };
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessageLink = primaryMessageLink;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-link-with-address').textContent;
            expect(nativeElementText).toContain(primaryMessageLink.title);
        });

        it('should call linkClick when the header message link is clicked when no account details are passed' , () => {
            const primaryMessageLink = { key: 'key', title: 'title' };
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessageLink = primaryMessageLink;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();
            spyOn(messageComponent.linkClick, 'emit');

            let linkDiv = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-link-with-address');
            linkDiv.click();
            expect(messageComponent.linkClick.emit).toHaveBeenCalled();

        });

        it('should not show version of primary status link (when the address is not shown) when nothing is passed in', () => {
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.ngOnInit();
            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-link-without-address');

            fixture.detectChanges();
            expect(nativeElement).toBeNull();
        });

        it('should show primary status link (when the address is not shown) when passed in with account details', () => {
            comp.contractAccountDetails = [
                new FuelChipContractAccountDetails('1112223334', [
                    new FuelChipContract('121210', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                    new FuelChipContract('121211', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
                ]),
                new FuelChipContractAccountDetails('1112223345', [
                    new FuelChipContract('121212', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract('121213', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Electricity, 'VIC')
                ])
            ];

            const primaryMessageLink = { key: 'key', title: 'title' };
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg1';
            messageComponent.primaryMessageLink = primaryMessageLink;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.contractNumber = '121212';
            comp.ngOnInit();
            fixture.detectChanges();

            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-link-without-address').textContent;

            fixture.detectChanges();
            expect(nativeElementText).toContain(primaryMessageLink.title);
        });

        it('should call linkClick when the header message link is clicked when account details are passed' , () => {

            comp.contractAccountDetails = [
                new FuelChipContractAccountDetails('1112223334', [
                    new FuelChipContract('121210', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                    new FuelChipContract('121211', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
                ]),
                new FuelChipContractAccountDetails('1112223345', [
                    new FuelChipContract('121212', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract('121213', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Electricity, 'VIC')
                ])
            ];

            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg1';
            messageComponent.primaryMessageLink = { key: 'key', title: 'title' };
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.contractNumber = '121212';

            comp.ngOnInit();
            fixture.detectChanges();

            spyOn(messageComponent.linkClick, 'emit');

            let linkDiv = fixture.nativeElement.querySelector('.maui-fuel-chip__primary-status-link-without-address');
            linkDiv.click();
            expect(messageComponent.linkClick.emit).toHaveBeenCalled();
        });

        it('should show the primary message text as normal when its passed in and the fuelChipState is preSetup', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__ineligible');
            expect(nativeElement).toBeNull();
        });

        it('should show the primary message text as normal when its passed in and the fuelChipState is PostSetupComplete', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PostSetupComplete;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__ineligible');
            expect(nativeElement).toBeNull();
        });

        it('should show the primary message text as normal when its passed in and the fuelChipState is PostSetupManage', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__ineligible');
            expect(nativeElement).toBeNull();
        });

        // todo
        it('should show the primary message text as ineligible when its passed in and the fuelChipState is ineligible', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.Ineligible;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__ineligible');
            expect(nativeElement).not.toBeNull();
        });
    });

    describe('Secondary message', () => {
        it('should not show the secondary message text when its not passed in', () => {
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__tertiary-message-details-container');
            expect(nativeElementText).toBeNull();
        });

        it('should show the secondary message text when its passed in', () => {
            const secondaryMessage = 'Secondary Msg';
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.secondaryMessage = secondaryMessage;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status-message-with-address').textContent;
            expect(nativeElementText).toContain(secondaryMessage);
        });

        it('should show secondary status message with text bolded (ie not highlighted with the success or warning colours) when no status type is passed', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.secondaryMessage = 'Secondary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status--success');
            expect(nativeElement).toBeNull();
            nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status---warning');
            expect(nativeElement).toBeNull();
        });

        it('should show secondary status message in the success format when a success type of Success is passed', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.secondaryMessage = 'Secondary Msg';
            messageComponent.secondaryMessageStatus = MauiSecondaryMessageStatusType.Success;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status--success');
            expect(nativeElement).not.toBeNull();
            nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status--warning');
            expect(nativeElement).toBeNull();
        });

        it('should show secondary status message in the warning format when a success type of warning is passed', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.secondaryMessage = 'Secondary Msg';
            messageComponent.secondaryMessageStatus = MauiSecondaryMessageStatusType.Warning;
            comp.fuelChipMessages.reset([messageComponent]);
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status--success');
            expect(nativeElement).toBeNull();
            nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__secondary-status--warning');
            expect(nativeElement).not.toBeNull();
        });
    });
});
