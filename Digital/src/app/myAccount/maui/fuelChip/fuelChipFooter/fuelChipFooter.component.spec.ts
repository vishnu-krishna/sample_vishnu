import { FuelChipComponent } from '../fuelChip.component';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState } from '../fuelChip.component.enum';
import { FuelChipContract, FuelChipContractAccountDetails } from '../fuelChip.component.model';
import { FuelChipFooterComponent } from '../fuelChipFooter/fuelChipFooter.component';

import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiFuelChipModule } from '../index';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                    [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                    [fuelType]="MauiFuelChipFuelType.Electricity"
                    [fuelContext]="MauiFuelChipFuelContextEnum.None"
                    [contractAccountDetails]="singleAccountDetail"
                    [contractNumber]="contractNumber">
                <agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapperComponent implements OnInit {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContextEnum = MauiFuelChipFuelContext;
    public singleAccountDetail: FuelChipContractAccountDetails[];
    public contractNumber: string = '121212';

    public ngOnInit(): void {
        this.singleAccountDetail = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ])
        ];
    }
}

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                        [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                        [fuelType]="MauiFuelChipFuelType.Electricity">
                    <agl-maui-fuel-chip-message
                        [primaryMessage]="'test Primary message'">
                    </agl-maui-fuel-chip-message>
                    <agl-maui-fuel-chip-footer
                        [tertiaryMessage]="'Test Tertiary message'">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapper2Component {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
}

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                        [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                        [fuelType]="MauiFuelChipFuelType.Electricity">
                    <agl-maui-fuel-chip-message
                        [primaryMessage]="'test Primary message'">
                    </agl-maui-fuel-chip-message>
                    <agl-maui-fuel-chip-footer
                        [cancelText] ="'Cancel Monthly Billing'">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapper3Component {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
}

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                        [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                        [fuelType]="MauiFuelChipFuelType.Electricity"
                        [fuelContext]="MauiFuelChipFuelContextEnum.None"
                        [contractAccountDetails]="singleAccountDetail"
                        [contractNumber]="contractNumber">
                    <agl-maui-fuel-chip-footer
                        [tertiaryMessage]="'Test tertiary message'">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapper4Component implements OnInit {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContextEnum = MauiFuelChipFuelContext;
    public singleAccountDetail: FuelChipContractAccountDetails[];
    public contractNumber: string = '121212';

    public ngOnInit(): void {
        this.singleAccountDetail = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ])
        ];
    }
}

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                        [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                        [fuelType]="MauiFuelChipFuelType.Electricity"
                        [fuelContext]="MauiFuelChipFuelContextEnum.None"
                        [contractAccountDetails]="multiContractAccountDetail"
                        [contractNumber]="contractNumber">
                    <agl-maui-fuel-chip-footer
                        [tertiaryMessage]="'Test tertiary message'">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapper5Component implements OnInit {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContextEnum = MauiFuelChipFuelContext;
    public multiContractAccountDetail: FuelChipContractAccountDetails[];
    public contractNumber: string = '121212';

    public ngOnInit(): void {
        this.multiContractAccountDetail = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ],
            ),
            new FuelChipContractAccountDetails('111222334', [
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121214', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ],
            )

        ];
    }
}

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-fuel-chip
                        [fuelChipState]="MauiFuelChipState.PostSetupComplete"
                        [fuelType]="MauiFuelChipFuelType.Electricity"
                        [fuelContext]="MauiFuelChipFuelContextEnum.None"
                        [contractAccountDetails]="singleAccountDetail"
                        [contractNumber]="contractNumber">
                    <agl-maui-fuel-chip-footer
                        [cancelText]="'Cancel Monthly Billing'">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>`,
})

class TestWrapper6Component implements OnInit {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContextEnum = MauiFuelChipFuelContext;
    public singleAccountDetail: FuelChipContractAccountDetails[];
    public contractNumber: string = '121212';

    public ngOnInit(): void {
        this.singleAccountDetail = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ])
        ];
    }
}

describe('Maui Fuel chip footer component', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;
    let de: DebugElement;
    let comp: FuelChipComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [MauiFuelChipModule]
        });

        fixture = TestBed.createComponent(TestWrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();
        comp = de.children[0].componentInstance;
    }));

    it('should not show the tertiary message text when it is not passed in', () => {
        const footerComponent: FuelChipFooterComponent = comp.fuelChipFooterComponent;

        // ACT
        fixture.detectChanges();

        // ASSERT
        let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__tertiary-message-details-container');
        expect(nativeElementText).toBeNull();
    });

    it('should show the tertiary message text when it is passed in', () => {
        const footerComponent: FuelChipFooterComponent = comp.fuelChipFooterComponent;
        footerComponent.tertiaryMessage = 'Tertiary message';
        // ACT
        fixture.detectChanges();

        // ASSERT
        let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__tertiary-message-details-container').textContent;
        expect(nativeElementText).toContain(footerComponent.tertiaryMessage);
    });

    it('should not show the cancel text when it is not passed in', () => {
        const footerComponent: FuelChipFooterComponent = comp.fuelChipFooterComponent;

        // ACT
        fixture.detectChanges();

        // ASSERT
        let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__cancel-details-container');
        expect(nativeElementText).toBeNull();
    });

    it('should show the cancel text when it is passed in', async(() => {
        const footerComponent: FuelChipFooterComponent = comp.fuelChipFooterComponent;
        footerComponent.cancelText = 'Cancel Monthly Billing';

        // ACT
        fixture.detectChanges();

        // ASSERT
        let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__cancel-details-container').textContent;
        expect(nativeElementText).toContain(footerComponent.cancelText);
    }));

    it('should call cancelClick when the cancel link is clicked', () => {
        const footerComponent: FuelChipFooterComponent = comp.fuelChipFooterComponent;
        footerComponent.cancelText = 'CANCEL MONTHLY BILLING';
        // ACT
        fixture.detectChanges();

        spyOn(footerComponent.cancelClick, 'emit');
        let cancelDiv = fixture.nativeElement.querySelector('.maui-fuel-chip__cancel-details-container');
        cancelDiv.click();

        // ASSERT
        expect(footerComponent.cancelClick.emit).toHaveBeenCalled();
    });

    it('should not show message/cancel divider when message not passed in', () => {
        comp.tertiaryMessage = null;

        // ACT
        fixture.detectChanges();

        // ASSERT
        let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
        expect(messageElement).toBeNull();
    });
});

describe('Tertiary/cancel message divider when tertiaryMessage and a primary message is also passed in', () => {
    let fixture: ComponentFixture<TestWrapper2Component>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapper2Component],
            imports: [MauiFuelChipModule]
        });

        fixture = TestBed.createComponent(TestWrapper2Component);
        de = fixture.debugElement;
        fixture.detectChanges();
    }));

    it('should show tertiary/cancel message divider', () => {
        let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
        expect(messageElement).not.toBeNull();
    });
});

describe('Tertiary/cancel message divider when cancelText and a primary message is also passed in', () => {
    let fixture: ComponentFixture<TestWrapper3Component>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapper3Component],
            imports: [MauiFuelChipModule]
        });

        fixture = TestBed.createComponent(TestWrapper3Component);
        de = fixture.debugElement;
        fixture.detectChanges();
    }));
    it('should show tertiary/cancel message divider', () => {
        let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
        expect(messageElement).not.toBeNull();
    });
});

describe('Tertiary/cancel message divider when a primary message is not passed in with a single contract', () => {
    describe('Tertiary message', () => {
        let fixture: ComponentFixture<TestWrapper4Component>;
        let de: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestWrapper4Component],
                imports: [MauiFuelChipModule]
            });

            fixture = TestBed.createComponent(TestWrapper4Component);
            de = fixture.debugElement;
            fixture.detectChanges();
        }));

        it('should show tertiary/cancel message divider', () => {
            let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
            expect(messageElement).toBeNull();
        });
    });

    describe('CancelText message', () => {
        let fixture: ComponentFixture<TestWrapper6Component>;
        let de: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestWrapper6Component],
                imports: [MauiFuelChipModule]
            });

            fixture = TestBed.createComponent(TestWrapper6Component);
            de = fixture.debugElement;
            fixture.detectChanges();
        }));

        it('should show tertiary/cancel message divider', () => {
            let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
            expect(messageElement).toBeNull();
        });
    });
});

describe('Test tertiary/cancel message divider when a primary message is not passed in with a multi contract', () => {
    describe('Tertiary message', () => {
        let fixture: ComponentFixture<TestWrapper5Component>;
        let de: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestWrapper5Component],
                imports: [MauiFuelChipModule]
            });

            fixture = TestBed.createComponent(TestWrapper5Component);
            de = fixture.debugElement;
            fixture.detectChanges();
        }));

        it('should not show tertiary/cancel message divider', () => {
            let messageElement = de.query(By.css('.maui-fuel-chip__tertiary-message-border'));
            expect(messageElement).toBeNull();
        });
    });
});
