import { FuelChipComponent } from './fuelChip.component';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState } from './fuelChip.component.enum';
import { FuelChipContract , FuelChipContractAccountDetails  } from './fuelChip.component.model';
import { FuelChipMessageComponent } from './fuelChipMessage/fuelChipMessage.component';

import { DebugElement, QueryList } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiFuelChipModule } from './index';

describe('Maui Fuel chip component', () => {

    let comp: FuelChipComponent;
    let fixture: ComponentFixture<FuelChipComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MauiFuelChipModule ]
        });

        fixture = TestBed.createComponent(FuelChipComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('Component container', () => {
        it('should show border shadow when fuel chip state is pre setup', () => {
            comp.fuelChipState = MauiFuelChipState.PreSetup;

            // ACT
            fixture.detectChanges();

            // ASSERT

            let containerBorderElement = de.query(By.css('.maui-fuel-chip__border-shadow'));
            expect(containerBorderElement).not.toBeNull();
        });

        it('should show border shadow when fuel chip state is post setup manage', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            this.containerHover = false;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let containerBorderElement = de.query(By.css('.maui-fuel-chip__border-shadow'));
            expect(containerBorderElement).not.toBeNull();
        });

        it('should not show border shadow when fuel chip state is Ineligible', () => {
            comp.fuelChipState = MauiFuelChipState.Ineligible;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let containerBorderElement = de.query(By.css('.maui-fuel-chip__border-shadow'));
            expect(containerBorderElement).toBeNull();
        });

        it('should not show border shadow when fuel chip state is post setup complete', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupComplete;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let containerBorderElement = de.query(By.css('.maui-fuel-chip__border-shadow'));
            expect(containerBorderElement).toBeNull();
        });

        it('should not show border shadow when fuel chip state is Display', () => {
            comp.fuelChipState = MauiFuelChipState.Display;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let containerBorderElement = de.query(By.css('.maui-fuel-chip__border-shadow'));
            expect(containerBorderElement).toBeNull();
        });

        it('should not show a white border around the fuel chip state is Display', () => {
            comp.fuelChipState = MauiFuelChipState.Display;

            // ACT
            fixture.detectChanges();

            // ASSERT
            // The test needs to check that both classes are toggled into an opposite state
            let containerBorderElement = de.query(By.css('.maui-fuel-chip'));
            expect(containerBorderElement).toBeNull();
            containerBorderElement = de.query(By.css('.maui-fuel-chip--display'));
            expect(containerBorderElement).not.toBeNull();
        });

        it('should show a white border around the fuel chip state is PreSetup', () => {
            comp.fuelChipState = MauiFuelChipState.PreSetup;

            // ACT
            fixture.detectChanges();

            // ASSERT
            // The test needs to check that both classes are toggled into an opposite state
            let containerBorderElement = de.query(By.css('.maui-fuel-chip'));
            expect(containerBorderElement).not.toBeNull();
            containerBorderElement = de.query(By.css('.maui-fuel-chip--display'));
            expect(containerBorderElement).toBeNull();
        });

        it('should show a white border around the fuel chip state is PostSetupComplete', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupComplete;

            // ACT
            fixture.detectChanges();

            // ASSERT
            // The test needs to check that both classes are toggled into an opposite state
            let containerBorderElement = de.query(By.css('.maui-fuel-chip'));
            expect(containerBorderElement).not.toBeNull();
            containerBorderElement = de.query(By.css('.maui-fuel-chip--display'));
            expect(containerBorderElement).toBeNull();
        });

        it('should show a white border around the fuel chip state is PostSetupManage', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;

            // ACT
            fixture.detectChanges();

            // ASSERT
            // The test needs to check that both classes are toggled into an opposite state
            let containerBorderElement = de.query(By.css('.maui-fuel-chip'));
            expect(containerBorderElement).not.toBeNull();
            containerBorderElement = de.query(By.css('.maui-fuel-chip--display'));
            expect(containerBorderElement).toBeNull();
        });

        it('should show a white border around the fuel chip state is Ineligible', () => {
            comp.fuelChipState = MauiFuelChipState.Ineligible;

            // ACT
            fixture.detectChanges();

            // ASSERT
            // The test needs to check that both classes are toggled into an opposite state
            let containerBorderElement = de.query(By.css('.maui-fuel-chip'));
            expect(containerBorderElement).not.toBeNull();
            containerBorderElement = de.query(By.css('.maui-fuel-chip--display'));
            expect(containerBorderElement).toBeNull();
        });

    });

    describe('Component header', () => {
        it('should show fuel chip title to be Electricity bill when context bill is passed', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.fuelType = MauiFuelChipFuelType.Electricity;
            comp.fuelContext = MauiFuelChipFuelContext.Bill;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__title').textContent;
            expect(nativeElementText).toContain(MauiFuelChipFuelType.Electricity + ' ' + MauiFuelChipFuelContext.Bill);
        });

        it('should show fuel chip title to be Electricity meter when context meter is passed', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.fuelType = MauiFuelChipFuelType.Electricity;
            comp.fuelContext = MauiFuelChipFuelContext.Meter;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__title').textContent;
            expect(nativeElementText).toContain(MauiFuelChipFuelType.Electricity + ' ' + MauiFuelChipFuelContext.Meter);
        });

        it('should show fuel chip title to be Electricity when context is none', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.fuelType = MauiFuelChipFuelType.Electricity;
            comp.fuelContext = MauiFuelChipFuelContext.None;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__title').textContent;
            expect(nativeElementText).toContain(MauiFuelChipFuelType.Electricity + ' ' + MauiFuelChipFuelContext.None);
        });

        it('should show fuel chip title to be Gas bill when context bill is passed', () => {
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.fuelType = MauiFuelChipFuelType.Gas;
            comp.fuelContext = MauiFuelChipFuelContext.Bill;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__title').textContent;
            expect(nativeElementText).toContain(MauiFuelChipFuelType.Gas + ' ' + MauiFuelChipFuelContext.Bill);
        });
    });

    describe('Component account details', () => {
        it('should not show Account Details section when single contract account with single contract Electricity', () => {
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333', [new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Electricity, 'VIC')])];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__number ');
            expect(nativeElement).toBeNull();
        });

        it('should not show Account Details section when single contract account with single contract gas', () => {
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333', [new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Gas, 'VIC')])];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__number ');
            expect(nativeElement).toBeNull();
        });

        it('should not show Account Details section when single contract account with duel different fuels', () => {
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333',
                                    [new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Electricity, 'VIC'),
                                    new FuelChipContract ('121213', 'my address', MauiFuelChipFuelType.Gas, 'VIC')])
                                ];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__number');
            expect(nativeElement).toBeNull();
        });

        it('should show contract number and corresponding address when single contract account with duplicate Electricity', () => {
            const address = 'my address';
            const contractNumber = '121212';
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333',
                                    [new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Electricity, 'VIC'),
                                    new FuelChipContract ('121213', 'my address', MauiFuelChipFuelType.Electricity, 'VIC')])
                                ];
            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('121 212');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });

        it('should show contract number and corresponding address for gas when single contract account with duplicate Electricity and Gas', () => {
            const address = 'my address';
            const contractNumber = '121212';
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333',
                                    [new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Gas, 'VIC'),
                                    new FuelChipContract ('121213', 'my other address', MauiFuelChipFuelType.Electricity, 'VIC'),
                                    new FuelChipContract ('121214', 'my address', MauiFuelChipFuelType.Electricity, 'VIC')]
                                )
                                ];
            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('121 212');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });

        it('should show contract account number and corresponding contract address when multi contract account with single contract Electricity', () => {
            const contractAccountNumber = '111222334';
            const contractNumber = '121214';
            const address = 'my address';
            comp.contractAccountDetails =  [new FuelChipContractAccountDetails ('111222333', [new FuelChipContract ('121213', 'my address', MauiFuelChipFuelType.Electricity, 'VIC')]),
                                    new FuelChipContractAccountDetails (contractAccountNumber, [new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Electricity, 'VIC')])
        ];
            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('111 222 334');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });

        it('should show contract account number and corresponding contract address when multi contract account with duel contracts ie one Gas one electricty', () => {

            const contractAccountNumber = '111222334';
            const address = 'my other address';
            const contractNumber = '121215';
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333', [
                    new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Electricity, 'VIC'),
                    new FuelChipContract ('121213', 'my address', MauiFuelChipFuelType.Gas, 'VIC')
                ]),
                                        new FuelChipContractAccountDetails (contractAccountNumber, [
                    new FuelChipContract ('121214', 'my address', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Electricity, 'VIC')
                ])
            ];

            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('111 222 334');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });

        it('should show contract number and corresponding contract address when multi contract account with duel Electricity contracts', () => {

            const address = 'my other address';
            const contractNumber = '121215';
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333', [
                    new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract ('121213', 'my address', MauiFuelChipFuelType.Gas, 'VIC')
                ]),
                                        new FuelChipContractAccountDetails ('111222334', [
                    new FuelChipContract ('121214', 'my address', MauiFuelChipFuelType.Electricity, 'VIC'),
                    new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Electricity, 'VIC')
                ])
            ];

            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('121 215');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });

        it('should show contract number and corresponding contract address when multi contract account with duel Gas contracts', () => {

            const address = 'my other address';
            const contractNumber = '121213';
            comp.contractAccountDetails = [new FuelChipContractAccountDetails ('111222333', [
                    new FuelChipContract ('121212', 'my address', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract (contractNumber, address, MauiFuelChipFuelType.Gas, 'VIC')
                ]),
                                        new FuelChipContractAccountDetails ('111222334', [
                    new FuelChipContract ('121214', 'my address', MauiFuelChipFuelType.Electricity, 'VIC'),
                    new FuelChipContract ('121215', 'my address', MauiFuelChipFuelType.Electricity, 'VIC')
                ])
            ];

            comp.contractNumber = contractNumber;

            // ACT
            fixture.detectChanges();

            // ASSERT

            let nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__number').textContent;
            expect(nativeElementText).toContain('121 213');
            nativeElementText = fixture.nativeElement.querySelector('.maui-fuel-chip__address').textContent;
            expect(nativeElementText).toContain(address);

        });
    });

    describe('Component selector', () => {

        it('should not show the selector when fuelChipState is PostSetupComplete', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PostSetupComplete;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__header-selector');
            expect(nativeElement).toBeNull();
        });

        it('should not show the selector when fuelChipState is PostSetupManage', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PostSetupManage;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__header-selector');
            expect(nativeElement).toBeNull();
        });

        it('should show the selector when fuelChipState is presetup', () => {
            comp.fuelChipMessages = new QueryList<FuelChipMessageComponent>();
            let messageComponent = new FuelChipMessageComponent();
            messageComponent.primaryMessage = 'Primary Msg';
            comp.fuelChipMessages.reset([messageComponent]);
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            comp.ngOnInit();

            fixture.detectChanges();

            let nativeElement = fixture.nativeElement.querySelector('.maui-fuel-chip__header-selector');
            expect(nativeElement).not.toBeNull();
        });

        it('should show header selector when fuelChipState is pre setup', () => {
            comp.fuelChipState = MauiFuelChipState.PreSetup;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let headerSelectorElement = de.query(By.css('.maui-fuel-chip__header-selector'));
            expect(headerSelectorElement).not.toBeNull();
        });

        it('should not show header selector when fuelChipState is not pre setup', () => {
            comp.fuelChipState = MauiFuelChipState.Ineligible;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let headerSelectorElement = de.query(By.css('.maui-fuel-chip__header-selector'));
            expect(headerSelectorElement).toBeNull();
        });

        it('should call fuelChipClick when the fuel chip is clicked in pre-setup state', async(() => {
            comp.fuelChipState = MauiFuelChipState.PreSetup;
            // ACT
            fixture.detectChanges();
            spyOn(comp.selectorClick, 'emit');

            let selectorDiv = fixture.nativeElement.querySelector('.maui-fuel-chip');
            selectorDiv.click();

            // ASSERT
            expect(comp.selectorClick.emit).toHaveBeenCalled();
        }));

        it('should not call fuelChipClick when the fuel chip is clicked post-setup state', async(() => {
            comp.fuelChipState = MauiFuelChipState.PostSetupComplete;
            // ACT
            fixture.detectChanges();
            spyOn(comp.selectorClick, 'emit');

            let selectorDiv = fixture.nativeElement.querySelector('.maui-fuel-chip');
            selectorDiv.click();

            // ASSERT
            expect(comp.selectorClick.emit).not.toHaveBeenCalled();
        }));
    });
});
