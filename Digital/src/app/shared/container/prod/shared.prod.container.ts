/*

THIS FILE WAS CREATED BEFORE ANGULAR HAD MODULES - IT NOW NEEDS TO BE MOVED INTO THE APPROPRIATE NG-MODULES, AND REMOVED

*/

import { IRateFactGroupService } from '../../service/contract/iratefactgroup.service';
import { RateFactGroupService } from '../../service/rateFactGroup.service';

import { IPricingInfoService } from '../../service/contract/ipricinginfo.service';
import { PricingInfoService } from '../../service/pricingInfo.service';

import { IWebService } from '../../service/contract/iweb.service';
import { WebService } from '../../service/web.service';

import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { MessageBusService } from '../../service/messageBus.service';

import { ApiRepository } from '../../repository/api.repository';
import { IApiRepository } from    '../../repository/contract/iapi.repository';

import { IPaymentApiRepository } from    '../../repository/contract/ipaymentapi.repository';
import { PaymentApiRepository } from '../../repository/payment.api.repository';

import { IUsageService } from '../../service/contract/iusage.service';
import { UsageService } from '../../service/usage.service';

import { IUsageRenderingService } from '../../service/contract/iusageRendering.service';
import { UsageRenderingService } from '../../service/usageRendering.service';

import { SettingsApi } from '../../../myAccount/services/settings/settingsApi.service';
import { ISettingsApi }    from '../../../myAccount/services/settings/settingsApi.service.interface';

import { SettingsService } from '../../../myAccount/services/settings/settings.service';
import { ISettingsService }    from '../../../myAccount/services/settings/settings.service.interface';

import { UserInfoService }  from '../../../shared/service/userInfo/userInfo.Service';
import { IUserInfoService } from '../../../shared/service/userInfo/userInfo.service.interface';

import { IEligibilityService } from '../../../shared/service/contract/ieligibility.service';
import { EligibilityService } from '../../../shared/service/eligibility.service';

import { Apiv2Repository } from '../../repository/apiv2.repository';
import { IApiv2Repository } from '../../repository/contract/iapiv2.repository';

import { IProductRepository } from '../../repository/contract/iproduct.repository';
import { ProductApiRepository } from '../../repository/product.repository';

import { IProductApiService } from '../../service/contract/iproductApi.service';
import { ProductApiService } from '../../service/productApi.service';

import { ISolarCheckService } from '../../../myAccount/services/contract/isolarCheck.service';
import { SolarCheckService } from '../../../myAccount/services/solarCheck.service';
import { ISolarCheckRepository } from '../../repository/contract/isolarCheck.repository';
import { SolarCheckRepository } from '../../repository/solarCheck.repository';

import { IMoveJoinRepository } from '../../repository/contract/imovejoin.repository';
import { MoveJoinApiRepository } from '../../repository/movejoinapi.repository';
import { IMoveJoinApiService } from '../../service/contract/imoveJoinApi.service';
import { MoveJoinApiService } from '../../service/moveJoinApi.service';

import { MockIndex } from '../../../myAccount/mockManager/mockIndex';

export const PROD_CONTAINER: any[] = [
    { provide: ISolarCheckRepository, useClass: SolarCheckRepository },
    { provide: IRateFactGroupService, useClass: RateFactGroupService },
    { provide: IPricingInfoService, useClass: PricingInfoService },
    { provide: IWebService, useClass: WebService },
    { provide: IMessageBusService, useClass: MessageBusService },
    { provide: IApiRepository, useClass: ApiRepository },
    { provide: IPaymentApiRepository, useClass: PaymentApiRepository },
    { provide: IUsageService, useClass: UsageService },
    { provide: IUsageRenderingService, useClass: UsageRenderingService },
    { provide: ISettingsService, useClass: SettingsService },
    { provide: ISettingsApi, useClass: SettingsApi },
    { provide: IUserInfoService, useClass: UserInfoService },
    { provide: IApiv2Repository, useClass: Apiv2Repository },
    { provide: IProductRepository, useClass: ProductApiRepository },
    { provide: IProductApiService, useClass: ProductApiService },
    { provide: IEligibilityService, useClass: EligibilityService },
    { provide: ISolarCheckService, useClass: SolarCheckService },
    { provide: IMoveJoinApiService, useClass: MoveJoinApiService },
    { provide: IMoveJoinRepository, useClass: MoveJoinApiRepository },
    MockIndex /* Used by MockManager and MockIdentity to get a list of BPs from a json file _directory.json */
];
