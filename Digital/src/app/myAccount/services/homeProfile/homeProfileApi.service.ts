import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { ApiClientBaseRepository } from '../../repository/base/apiClientBase.repository';
import { HttpClient } from '@angular/common/http';

export abstract class IHomeProfileApi {
    public abstract getProfiles(): Observable<HomeProfileSummaryApiModel[]>;
    public abstract getProfile(contractNumber: string): Observable<HomeProfileApiModel>;
    public abstract saveProfile(contractNumber: string, profile: HomeProfileApiModel): Observable<void>;
}

@Injectable()
export class HomeProfileApiService extends ApiClientBaseRepository implements IHomeProfileApi {
    private basePath: string;

    constructor(
        protected httpClient: HttpClient,
        protected configService: ConfigService,
    ) {
        super(
            httpClient,
            configService,
            configService.current.aglHomeProfileApi
        );
    }

    public getProfiles(): Observable<HomeProfileSummaryApiModel[]> {
        const getEndPoint = `/v1/homeProfiles`;
        return this.getModel<HomeProfileSummaryApiModel[]>(getEndPoint);
    }

    public getProfile(contractNumber: string): Observable<HomeProfileApiModel> {
        if (!contractNumber || isNaN(Number(contractNumber))) {
            return Observable.throw(`Contract Number is not valid`);
        }
        const getEndPoint = `/v1/contracts/${contractNumber}/homeProfile`;
        return this.getModel<HomeProfileApiModel>(getEndPoint);
    }

    public saveProfile(contractNumber: string, profile: HomeProfileApiModel): Observable<void> {
        if (!contractNumber || isNaN(Number(contractNumber))) {
            return Observable.throw(`Contract Number is not valid`);
        }
        const postEndPoint = `/v1/contracts/${contractNumber}/homeProfile`;
        return this.postModel<any, HomeProfileApiModel>(postEndPoint, profile);
    }
}

export class HomeProfileApiModel {
    public propertyType?: string;
    public numberOfAdults?: number;
    public numberOfChildren?: number;
    public numberOfBedrooms?: number;
    public numberOfBathrooms?: number;

    public hasCooling?: boolean;
    public hasCoolingAircon: boolean;
    public numberOfAirconSplitSystems?: number;
    public numberOfAirconFixed?: number;
    public hasDuctedAircon?: boolean;
    public hasEvaporativeCooling?: boolean;
    public numberOfPortableCoolers?: number;
    public hasDuctedEvaporativeCooling?: boolean;
    public hasOtherCooling?: boolean; // Maps to 'Has fan cooling'.
    public numberOfFans?: number;

    public hotWaterType?: string;

    public ovenType?: string;
    public cooktopType?: string;

    public numberOfHeatingSplitSystems?: number;
    public typeOfDuctedHeating?: string;
    public numberOfPortableElecHeaters?: number;
    public typeOfOtherHeating?: string;

    public mainFridge?: Fridge;
    public fridge2?: Fridge;

    public numberOfTelevisions?: number;
    public hasWashingMachine?: boolean;
    public hasClothesDryer?: boolean;
    public hasDishwasher?: boolean;
    public hasMicrowave?: boolean;
    public hasElectricalVehicle?: boolean;

    public hasPool?: boolean;
    public poolSize?: string;
    public poolHeaterFuelType?: string;
    public poolPumpAge?: string;
    public hasSpa?: boolean;
}

export class Fridge {
    constructor(fridgeType: string, age: string) {
        this.fridgeType = fridgeType;
        this.age = age;
    }
    public fridgeType?: string;
    public age?: string;
}

export class HomeProfileSummaryApiModel {
    public contractNumber: string;
    public accountNumber: string;
    public updatedUtc: Date;
}
