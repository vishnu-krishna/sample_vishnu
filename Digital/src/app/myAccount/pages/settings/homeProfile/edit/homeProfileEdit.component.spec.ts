import { Observable } from 'rxjs/Observable';
import { HomeProfileNavigationService } from './../homeProfileNavigation.service';
import { ActivatedRoute } from '@angular/router';
import { HomeProfileEditComponent } from './homeProfileEdit.component';
import { HomeProfileEditModule } from './homeProfileEdit.module';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Mock } from 'ts-mocks';
import { IAccountServiceMA } from '../../../../services/account.service';

describe('Home Profile Edit component', () => {

    let fixture: ComponentFixture<HomeProfileEditComponent>;
    let comp: HomeProfileEditComponent;

    const accountServiceMock = new Mock<IAccountServiceMA>();
    let spyOnAccountService: {
        getAccounts: jasmine.Spy
    };

    const homeProfileNavigationServiceMock = new Mock<HomeProfileNavigationService>();
    let spyOnHomeProfileNavigationService: {
        back: jasmine.Spy
    };

    const activatedRouteMock = {
        snapshot : {
            params : {
                accountNumber: '111',
                contractNumber: '111222'
            }
        }
    };
    beforeEach(() => {
        spyOnAccountService = {
            getAccounts: accountServiceMock.setup((mockService) => mockService.getAccounts).is(() => Observable.of([])).Spy
        };

        spyOnHomeProfileNavigationService = {
            back: homeProfileNavigationServiceMock.setup((mockService) => mockService.back).Spy
        };

        TestBed.configureTestingModule({
            imports: [
                HomeProfileEditModule,
            ],
            providers: [
                { provide: IAccountServiceMA, useValue: accountServiceMock.Object },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: HomeProfileNavigationService, useValue: homeProfileNavigationServiceMock.Object }
            ]
        });
        fixture = TestBed.createComponent(HomeProfileEditComponent);
        comp = fixture.componentInstance;
    });

    it('should call get accounts', async(() => {
        comp.ngOnInit();
        spyOnAccountService.getAccounts.and.returnValue([]);
        expect(spyOnAccountService.getAccounts).toHaveBeenCalled();
    }));

    it ('should call navigation service on back click', () => {
        comp.backClick();

        expect(spyOnHomeProfileNavigationService.back).toHaveBeenCalled();
    });
});
