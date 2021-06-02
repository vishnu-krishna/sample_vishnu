import { Mock } from 'ts-mocks';
import { Observable } from 'rxjs/Observable';
import { async } from '@angular/core/testing';
import { HomeProfileStateService, HomeProfileStatus } from './homeProfileState.service';
import { HomeProfileMapper } from './homeProfileMapper';
import { IHomeProfileApi, HomeProfileSummaryApiModel, HomeProfileApiModel } from '../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileViewModel, PropertyType } from './homeProfileViewModel';

describe('Home Profile State Service', () => {
    const homeProfileApiMock = new Mock<IHomeProfileApi>();
    const contractNumber1 = '111222';
    const contractNumber2 = '111333';
    let spyOnHomeProfileApi: {
        getProfile: jasmine.Spy,
        saveProfile: jasmine.Spy
    };
    let sut: HomeProfileStateService;

    beforeEach(() => {
        spyOnHomeProfileApi = {
            getProfile: homeProfileApiMock.setup((svc) => svc.getProfile).is(() => Observable.of(new HomeProfileApiModel())).Spy,
            saveProfile: homeProfileApiMock.setup((svc) => svc.saveProfile).is(() => Observable.of(null)).Spy
        };
        sut = new HomeProfileStateService(homeProfileApiMock.Object, new HomeProfileMapper());
    });

    describe('initializeHomeProfile()', () => {

        it('should not do anything when homeProfile state has been initialized before', async(() => {
            sut.contractNumber = contractNumber1;
            sut.initializeHomeProfile(contractNumber1, true, false).subscribe(
                (result) => {
                    expect(spyOnHomeProfileApi.getProfile).not.toHaveBeenCalled();
                    expect(result).toBe(true);
                },
                (error) => {
                    fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
                });
        }));

        it('should create a new homeProfileViewModel when user doesnt have existing data in api', async(() => {
            sut.contractNumber = contractNumber1;
            sut.initializeHomeProfile(contractNumber2, true, false).subscribe(
                (result) => {
                    expect(spyOnHomeProfileApi.getProfile).not.toHaveBeenCalled();
                    expect(result).toBe(true);
                    expect(sut.homeProfile.propertyType).toBeUndefined();
                },
                (error) => {
                    fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
                });
        }));

        it('should get the existing home profile from api when user has one', async(() => {
            const homeProfileViewModel = new HomeProfileViewModel();
            homeProfileViewModel.propertyType = PropertyType.Apartment;
            spyOnHomeProfileApi.getProfile.and.returnValue(Observable.of(homeProfileViewModel));
            sut.contractNumber = contractNumber1;
            sut.initializeHomeProfile(contractNumber2, true, true).subscribe(
                (result) => {
                    expect(spyOnHomeProfileApi.getProfile).toHaveBeenCalled();
                    expect(result).toBe(true);
                    expect(sut.homeProfile.propertyType).toBe(PropertyType.Apartment);
                },
                (error) => {
                    fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
                });
        }));

        it('should return false if it fails to get profile from api', async(() => {
            spyOnHomeProfileApi.getProfile.and.returnValue(Observable.throw({ status: 500 }));
            sut.contractNumber = contractNumber1;
            sut.initializeHomeProfile(contractNumber2, true, true).subscribe(
                (result) => {
                    expect(spyOnHomeProfileApi.getProfile).toHaveBeenCalled();
                    expect(result).toBe(false);
                },
                (error) => {
                    fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
                });
        }));

    });

    describe('saveProfile()', () => {
        it('should call HomeProfileApi.saveProfile() and succeed if the api returns successfully', async(() => {
            const observer = sut.saveProfile();
            observer.subscribe(
                (result) => {
                    expect(spyOnHomeProfileApi.saveProfile).toHaveBeenCalled();
                    expect(result).toBe(true);
                },
                (error) => {
                    fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
                });
        }));

        it('should throw an error if HomeProfileApi.saveProfile() throws an error', async(() => {
            const apiErrorResponse = { status: 500 };
            spyOnHomeProfileApi.saveProfile.and.returnValue(Observable.throw(apiErrorResponse));
            const observer = sut.saveProfile();
            observer.subscribe(
                (result) => {
                    fail(`Expected operation to fail, but it succeedded with return value: \n${JSON.stringify(result)}`);
                },
                (error) => {
                    expect(error).toEqual(apiErrorResponse);
                });
        }));
    });
});
