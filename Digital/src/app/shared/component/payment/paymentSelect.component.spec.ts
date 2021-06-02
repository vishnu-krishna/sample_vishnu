import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';
import { LoadingComponent } from '../../loaders/loading.component';
import { AlertComponent } from '../alert/alert.component';
import { ButtonDropdownComponent } from '../buttonDropdown/buttonDropdown.component';
import { PaymentAmountComponent } from './paymentAmount.component';
import { PaymentBankAccountComponent } from './paymentMethods/bankAccount/payment.bankAccount.component';
import { PaymentCreditCardComponent } from './paymentMethods/creditCard/payment.creditCard.component';
import { PaymentPaypalComponent } from './paymentMethods/paypal/payment.paypal.component';
import { StoredMethodPaymentComponent } from './paymentMethods/storedMethod/storedMethod.component';
import { PaymentSelectComponent } from './paymentSelect.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { FeatureFlagService } from '../../../myAccount/services/featureFlag.service';
import { FeatureFlagMockService }           from '../../../myAccount/services/mock/featureflag.mock.service';
import { ApiStubService } from '../../../test/stubs/api.stub.service';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { ContentService } from '../../service/content.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';

import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MyWalletService } from '../../../myAccount/pages/settings/myWallet/myWallet.service';
import { SafeHtmlPipe } from '../../../myAccount/pipes/safeHtml.pipe';
import { PaymentMethod } from '../../../myAccount/services/settings/model/paymentMethod';
import { IPaymentMethodsService } from '../../../myAccount/services/settings/paymentMethods.service.interface';
import { PrePaymentBalanceTopUpUrgency } from '../../globals/prePaymentBalanceTopUpUrgency';
import { IApiRepository } from '../../repository/contract/iapi.repository';
import { ApiService } from '../../service/api.service';
import { ConfigService } from '../../service/config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentSelectComponent Component', () => {

    let component: PaymentSelectComponent;
    let fixture: ComponentFixture<PaymentSelectComponent>;
    let debugElement: DebugElement;

    let content: PaymentContentModel = new PaymentContentModel();

    let contentServiceStub = {
        getContent(): Observable<any> {
            return Observable.of({});
        }
    };

    let myWalletServiceStub = {
        getValidCreditCards: () => [],
    };

    let paymentMethodsServiceStub = {
        getPaymentMethods: () => Observable.of<PaymentMethod[]>(new Array<PaymentMethod>()),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaymentSelectComponent,
                PaymentAmountComponent,
                StoredMethodPaymentComponent,
                ButtonDropdownComponent,
                PaymentCreditCardComponent,
                PaymentPaypalComponent,
                PaymentBankAccountComponent,
                AlertComponent,
                LoadingComponent,
                SafeHtmlPipe
            ],

            providers: [
                { provide: ContentService,          useValue: contentServiceStub },
                { provide: FeatureFlagService,      useClass: FeatureFlagMockService },
                { provide: MyWalletService,         useValue: myWalletServiceStub },
                { provide: ApiService,              useClass: ApiStubService },
                { provide: IPaymentMethodsService,  useValue: paymentMethodsServiceStub },
                { provide: MATERIAL_SANITY_CHECKS,  useValue: false },
                IMessageBusService,
                IApiRepository,
                ConfigService,
                HttpModule

            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ]
        });
        // first create the fixture
        fixture = TestBed.createComponent(PaymentSelectComponent);
        // create an instance of the component from the fixture
        component = fixture.componentInstance;

        // add properties used by sub components
        component.content = content;
        component.paymentDetails = new PaymentDetails();
        component.bonusBands = [];
        component.storedMethodActive = true;
        component.paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;
        component.paymentAmountView.form = new FormGroup({
            amount: new FormControl()
        });
    });
});
