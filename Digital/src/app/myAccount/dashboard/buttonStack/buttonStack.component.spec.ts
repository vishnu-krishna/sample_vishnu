import { NowMock } from './../../services/mock/now.mock.service';
import { DebugElement }             from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                       from '@angular/platform-browser';

import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { RouterTestingModule   }                from '@angular/router/testing';
import { Observable }                           from 'rxjs/Observable';
import { ContentService }                       from '../../../shared/service/content.service';
import { IMoveJoinApiService } from '../../../shared/service/contract/imoveJoinApi.service';
import { Now } from '../../../shared/service/now.service';
import { MyAccountMaterialModule } from '../../modules/my-account.material.module';
import { IAccountServiceMA } from '../../services/account.service';
import { ISsmrService } from '../../services/contract/issmr.service';
import { FeatureFlagService } from '../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../services/mock/featureflag.mock.service';
import { SsmrMockService } from '../../services/mock/ssmr.mock.service';
import { ButtonStackComponent }                 from './buttonStack.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// SY - commented this out for now as the tests are not working and
// we need to refactor this because of a clash with the OMM Tracker project.
xdescribe('Button Stack', () => {
    let comp: ButtonStackComponent;
    let fixture: ComponentFixture<ButtonStackComponent>;
    let de: DebugElement;

    let mockFeatureJumpLinksData = {
        selfService: {
            jumpLinks: {
                moveHome: {
                    isFeatured: true,
                    image: '_mockData/sitecore/media/like_to_move.svg',
                    label: 'Move home',
                    note: 'Customise your current and your new connection.',
                    url: '/sts/account/login?returnApp=OneMinuteMove&returnPath=%2Fsignup%23connection%2FrequestType%2FMI',
                    code: 'omm'
                }
            }
        }
    };
    let mockJumpLinksData = {
        selfService: {
            jumpLinks: {
                moveHome: {
                    isFeatured: false,
                    label: 'Move home',
                    url: '/sts/account/login?returnApp=OneMinuteMove&returnPath=%2Fsignup%23connection%2FrequestType%2FMI',
                    code: 'omm'
                }
            }
        }
    };
    let ommMockJumpLinksData = {
        selfService: {
            jumpLinks: {
                moveHome: {
                    isFeatured: true,
                    image: '_mockData/sitecore/media/iconExp_move.png',
                    label: 'Move home',
                    note: 'Customise your current and your new connection.',
                    url: '/sts/account/login?returnApp=OneMinuteMove&returnPath=%2Fsignup%23connection%2FrequestType%2FMI',
                    code: 'omm'
                },
                rateMyMove: {
                    isFeatured: true,
                    image: '_mockData/sitecore/media/iconExp_move.png',
                    label: 'Rate My Move',
                    note: 'Check the status of your move.',
                    code: 'omm'
                },
                trackMyMove: {
                    isFeatured: true,
                    image: '_mockData/sitecore/media/iconExp_move.png',
                    label: 'Track My Move',
                    note: 'Tell us about your move experience.',
                    code: 'omm'
                }
            }
        }
    };
    let contentServiceStub = {
        load: () => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
        }
    };

    let mockMoveJoinApiServiceStub = {
        GetOMMTracker: () => {
            throw new Error('mockMoveJoinApiServiceStub.load has not been mocked properly.');
        }
    };
    let iAccountServiceMAStub = {
        getAccounts: () => {
            throw new Error('iAccountServiceMAStub.getAccounts has not been mocked properly.');
        }
    };
    let mockAccountsData = [{
        contracts: [
            {
                isEligibile: true
            }
        ]
    }];

    let nowMock: NowMock;

    beforeEach(() => {

        nowMock = new NowMock('');

        TestBed.configureTestingModule({
            declarations: [
                ButtonStackComponent
            ],
            imports: [
                MyAccountMaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ISsmrService, useClass: SsmrMockService },
                { provide: Now, useValue: nowMock },
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: IAccountServiceMA, useValue: iAccountServiceMAStub },
                { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                { provide: IMoveJoinApiService, useValue: mockMoveJoinApiServiceStub }

            ]
        });
        fixture = TestBed.createComponent(ButtonStackComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        comp.content = 'jumpLinks';
        de = fixture.debugElement;
        nowMock.setDate(2017, 5, 9);
    });

    it('Should show feature jump link with hero image and button if featured', () => {

        // ARRANGE
        let contentService = fixture.debugElement.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);

        spyOn(contentService, 'load').and.returnValue(Observable.of(mockFeatureJumpLinksData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(null));

        // let mockAccounts = new Array<AccountViewModel>();
        // let accountService = fixture.debugElement.injector.get(IAccountServiceMA);
        // spyOn(accountService, 'getAccounts').and.returnValue(Observable.of( mockAccounts));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
    });

    it('Should show simple link if not featured', () => {

        // ARRANGE
        let contentService = fixture.debugElement.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);

        spyOn(contentService, 'load').and.returnValue(Observable.of(mockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(null));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).not.toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).toBeNull('could not find element with class .promo-card-item__action--button');
    });
    it('Should show OMM-track home link - Request Received status', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'RequestReceived',
                expiryDate: '2017-06-10'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toMatch('Track My Move');
    });
    it('Should show OMM-track home link - processing status', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'ProcessingTenPercent',
                expiryDate: '2017-06-10'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toMatch('Track My Move');
    });
    it('Should show OMM-track home link - Ready to connect status', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'WelcomeHome',
                expiryDate: '2017-06-10'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toMatch('Rate My Move');
    });

    it('Should show OMM-track home link - processing status with expired date', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'ProcessingTenPercent',
                expiryDate: '2017-05-8'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toContain('Move home');
    });

    it('Should show OMM-track home link - ReadyToConnect status with expired date', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'ReadyToConnect',
                expiryDate: '2017-05-8'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toContain('Move home');
    });

    it('Should show OMM-track home link - RequestReceived status with expired date', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'RequestReceived',
                expiryDate: '2017-05-8'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toContain('Move home');
    });

    it('Should show OMM-track home link - WelcomeHome status with expired date', () => {
        let apiData = {
            oneMinuteMove: {
                status: 'WelcomeHome',
                expiryDate: '2017-05-8'
            }
        };
        // ARRANGE
        let contentService = de.injector.get(ContentService);
        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(contentService, 'load').and.returnValue(Observable.of(ommMockJumpLinksData));
        let mockommService = fixture.debugElement.injector.get(IMoveJoinApiService);
        spyOn(mockommService, 'GetOMMTracker').and.returnValue(Observable.of(apiData));
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));

        // ACT
        fixture.detectChanges();

        // ASSERT
        let imageElement = de.query(By.css('.promo-card-item__image'));
        let noteElement = de.query(By.css('.promo-card-item__note'));
        let linkElement = de.query(By.css('.promo-card-item__action--link'));
        let buttonElement = de.query(By.css('.promo-card-item__action--button'));
        expect(imageElement).not.toBeNull('could not find element with class .promo-card-item__image');
        expect(noteElement).not.toBeNull('could not find element with class .promo-card-item__note');
        expect(linkElement).toBeNull('could not find element with class .promo-card-item__action--link');
        expect(buttonElement).not.toBeNull('could not find element with class .promo-card-item__action--button');
        expect(fixture.nativeElement.querySelector('.promo-card-item__action--button').textContent).toContain('Move home');
    });
});
