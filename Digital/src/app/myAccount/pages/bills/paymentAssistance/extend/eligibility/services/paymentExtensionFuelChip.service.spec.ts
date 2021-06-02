import { Observable } from 'rxjs/Observable';
import { FuelChipContract, FuelChipContractAccountDetails, MauiFuelChipFuelContext, MauiFuelChipFuelType } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { AccountMockService } from '../../../../../../services/mock/account.mock.service';
import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { ClassifiedFuelChips, IFuelChipClassificationService } from './fuelChipClassification.service';
import { IPaymentExtensionFuelChipService, PaymentExtensionFuelChipService } from './paymentExtensionFuelChip.service';

describe('Payment extension fuel chip service', () => {
    let sut: IPaymentExtensionFuelChipService = null;
    let accountServiceStub: IAccountServiceMA = null;
    let paymentExtensionEligibilityStub: IPaymentExtensionEligibility = null;
    let fuelChipClassificationServiceStub: IFuelChipClassificationService = null;

    beforeEach(() => {
        paymentExtensionEligibilityStub = {
            getContractAccountEligibility(contractAccountNumber: string): Observable<PaymentExtensionContractEligibility> {
                throw new Error('paymentExtensionEligibilityStub stub has not been mocked properly.');
            }
        };

        fuelChipClassificationServiceStub = {
            classify(fuelChipDetails: FuelChipData[]): Observable<ClassifiedFuelChips> {
                throw new Error('fuelChipClassificationServiceStub stub has not been mocked properly.');
            }
        };

        accountServiceStub = new AccountMockService();
        sut = new PaymentExtensionFuelChipService(accountServiceStub,
                                                  paymentExtensionEligibilityStub,
                                                  fuelChipClassificationServiceStub);
    });

    let contract1: ContractViewModel;
    let contract2: ContractViewModel;
    let contract3: ContractViewModel;
    let contract4: ContractViewModel;
    const contractAccountNumber1 = '111111';
    const contractAccountNumber2 = '222222';

    beforeEach(() => {
        contract1 = new ContractViewModel('111');
        contract1.address = 'some address';
        contract1.fuelType = 'Gas';

        contract2 = new ContractViewModel('222');
        contract2.address = 'some other address';
        contract2.fuelType = 'Electricity';

        contract3 = new ContractViewModel('333');
        contract3.address = 'some other address';
        contract3.fuelType = 'Gas';

        contract4 = new ContractViewModel('444');
        contract3.address = 'some other address';
        contract3.fuelType = 'Electricity';
    });

    it('should check eligibility for all contract accounts', (done) =>  {

        let mockAccounts: AccountViewModel[] = [
            new AccountViewModel(contractAccountNumber1, [contract1]),
            new AccountViewModel(contractAccountNumber2, [contract2, contract3, contract4])
        ];

        spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

        let eligibilitySpy = spyOn(paymentExtensionEligibilityStub, 'getContractAccountEligibility').and.callFake((ca) => {
            let mockEligibility: PaymentExtensionContractEligibility[] = [];

            if (ca === contractAccountNumber1) {
                mockEligibility.push(new PaymentExtensionContractEligibility(contract1.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null));
            } else {
                mockEligibility.push(new PaymentExtensionContractEligibility(contract2.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null));
                mockEligibility.push(new PaymentExtensionContractEligibility(contract3.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null));
            }

            return Observable.from(mockEligibility);
        });

        const eligibleFuelChips: FuelChipData[] = [new FuelChipData(contractAccountNumber1, contract1.contractNumber, undefined, [], undefined, undefined),
            new FuelChipData(contractAccountNumber2, contract2.contractNumber, undefined, [], undefined, undefined),
            new FuelChipData(contractAccountNumber2, contract3.contractNumber, undefined, [], undefined, undefined)
        ];

        const classifySpy = spyOn(fuelChipClassificationServiceStub, 'classify').and.returnValue(Observable.of(new ClassifiedFuelChips(eligibleFuelChips, [], [], [])));

        sut.init().subscribe((result: ClassifiedFuelChips) => {
            expect(eligibilitySpy).toHaveBeenCalledTimes(mockAccounts.length);
            expect(classifySpy).toHaveBeenCalledTimes(1);
            expect(result.eligibleFuelChips.length).toBe(3);

            expect(result.eligibleFuelChips).toContain(jasmine.objectContaining({ contractNumber: contract1.contractNumber }));
            expect(result.eligibleFuelChips).toContain(jasmine.objectContaining({ contractNumber: contract2.contractNumber }));
            expect(result.eligibleFuelChips).toContain(jasmine.objectContaining({ contractNumber: contract3.contractNumber }));
            done();
        });
    });

    describe('One of the api return error', () => {
        let mockAccounts: AccountViewModel[];
        let eligibilitySpy: jasmine.Spy;
        let classifySpy: jasmine.Spy;
        let contract2Eligibility: PaymentExtensionContractEligibility;

        beforeEach(() => {
            contract2Eligibility = new PaymentExtensionContractEligibility(contract2.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null);
            mockAccounts = [
                new AccountViewModel(contractAccountNumber1, [contract1]),
                new AccountViewModel(contractAccountNumber2, [contract2])
            ];

            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            eligibilitySpy = spyOn(paymentExtensionEligibilityStub, 'getContractAccountEligibility').and.callFake((ca) => {
                if (ca === contractAccountNumber1) {
                    return Observable.create((obs) => obs.error('error'));
                }
                return Observable.from([
                    contract2Eligibility
                ]);
            });

            classifySpy = spyOn(fuelChipClassificationServiceStub, 'classify').and.callFake((results: PaymentExtensionContractEligibility[]) => {
                return Observable.of(new ClassifiedFuelChips([new FuelChipData(contractAccountNumber2, contract2.contractNumber, undefined, [], undefined, undefined)], [], [], [])
                );
            });
        });

        it('should calls the functions correctly', (done) => {
            const fuelChipContractAccountDetails = [
                new FuelChipContractAccountDetails(contractAccountNumber1, [new FuelChipContract(contract1.contractNumber, contract1.address, MauiFuelChipFuelType.Gas, undefined)]),
                new FuelChipContractAccountDetails(contractAccountNumber2, [new FuelChipContract(contract2.contractNumber, contract2.address, MauiFuelChipFuelType.Electricity, undefined)])
            ];
            const fuelChipData = [new FuelChipData(contractAccountNumber2, contract2.contractNumber, MauiFuelChipFuelType.Electricity, fuelChipContractAccountDetails, contract2Eligibility, MauiFuelChipFuelContext.Bill)];
            sut.init().subscribe((result: ClassifiedFuelChips) => {
                expect(eligibilitySpy).toHaveBeenCalledTimes(mockAccounts.length);
                expect(classifySpy).toHaveBeenCalledTimes(1);
                expect(classifySpy).toHaveBeenCalledWith(fuelChipData);
                done();
            });
        });

        it('should return correct data', (done) => {
            sut.init().subscribe((result: ClassifiedFuelChips) => {
                expect(result.eligibleFuelChips.length).toBe(1);
                expect(result.alreadyExtendedFuelChips.length).toBe(0);
                expect(result.ineligibleFuelChips.length).toBe(0);
                expect(result.noIssuedBillFuelChips.length).toBe(0);
                done();
            });
        });
    });

    describe('Calling contract account eligibility as needed', () => {

        let paymentExtensionEligibilitySpy;
        let eligibleFuelChips: FuelChipData[];

        beforeEach(() => {
            let mockAccounts: AccountViewModel[] = [
                new AccountViewModel(contractAccountNumber1, [contract1]),
                new AccountViewModel(contractAccountNumber2, [contract2]),
            ];

            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            let mockEligibility: PaymentExtensionContractEligibility[] = [
                new PaymentExtensionContractEligibility(contract1.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null),
                new PaymentExtensionContractEligibility(contract2.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null)
            ];

            paymentExtensionEligibilitySpy = spyOn(paymentExtensionEligibilityStub, 'getContractAccountEligibility').and.returnValue(Observable.from(mockEligibility));

            eligibleFuelChips = [
                new FuelChipData(contractAccountNumber1, contract1.contractNumber, undefined, [], undefined, undefined)
            ];

            spyOn(fuelChipClassificationServiceStub, 'classify').and.returnValue(Observable.of(new ClassifiedFuelChips(eligibleFuelChips, [], [], [])));
        });

        it('should call eligibility for supplied contract accounts', (done) => {
            sut.init(contractAccountNumber1, contract1.contractNumber).subscribe((result: ClassifiedFuelChips) => {
                expect(paymentExtensionEligibilitySpy.calls.count()).toEqual(1);
                expect(paymentExtensionEligibilitySpy).toHaveBeenCalledWith(contractAccountNumber1);

                expect(result.eligibleFuelChips.length).toBe(1);
                expect(result.alreadyExtendedFuelChips.length).toBe(0);
                expect(result.ineligibleFuelChips.length).toBe(0);
                expect(result.noIssuedBillFuelChips.length).toBe(0);
                done();
            });
        });

        it('should call eligibility for all contract accounts', (done) => {
            eligibleFuelChips.push(new FuelChipData(contractAccountNumber1, contract2.contractNumber, undefined, [], undefined, undefined));
            sut.init().subscribe((result: ClassifiedFuelChips) => {

                expect(paymentExtensionEligibilitySpy.calls.count()).toEqual(2);
                expect(paymentExtensionEligibilitySpy).toHaveBeenCalledWith(contractAccountNumber1);
                expect(paymentExtensionEligibilitySpy).toHaveBeenCalledWith(contractAccountNumber2);

                expect(result.eligibleFuelChips.length).toBe(2);
                expect(result.alreadyExtendedFuelChips.length).toBe(0);
                expect(result.ineligibleFuelChips.length).toBe(0);
                expect(result.noIssuedBillFuelChips.length).toBe(0);
                done();
            });
        });
    });

    describe(`Contract doesn't exist or is restricted`, () => {

        let paymentExtensionEligibilitySpy;
        let eligibleFuelChips: FuelChipData[];

        beforeEach(() => {

            let mockEligibility: PaymentExtensionContractEligibility[] = [
                new PaymentExtensionContractEligibility(contract1.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null),
                new PaymentExtensionContractEligibility(contract2.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null)];

            paymentExtensionEligibilitySpy = spyOn(paymentExtensionEligibilityStub, 'getContractAccountEligibility').and.returnValue(Observable.from(mockEligibility));

            eligibleFuelChips = [
                new FuelChipData(contractAccountNumber1, contract1.contractNumber, undefined, [], undefined, undefined)
            ];

            spyOn(fuelChipClassificationServiceStub, 'classify').and.returnValue(Observable.of(new ClassifiedFuelChips(eligibleFuelChips, [], [], [])));
        });

        it(`should ignore contracts that don't exist in accountList api`, (done) => {
            let mockAccounts: AccountViewModel[] = [
                new AccountViewModel(contractAccountNumber1, [contract1]),
            ];

            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            sut.init().subscribe((result: ClassifiedFuelChips) => {
                expect(paymentExtensionEligibilitySpy.calls.count()).toEqual(1);
                expect(paymentExtensionEligibilitySpy).toHaveBeenCalledWith(contractAccountNumber1);

                expect(result.eligibleFuelChips.length).toBe(1);
                expect(result.alreadyExtendedFuelChips.length).toBe(0);
                expect(result.ineligibleFuelChips.length).toBe(0);
                expect(result.noIssuedBillFuelChips.length).toBe(0);
                done();
            });
        });

        it('should ignore restricted contracts', (done) => {
            contract2.isRestricted = true;

            let mockAccounts: AccountViewModel[] = [
                new AccountViewModel(contractAccountNumber1, [contract1, contract2]),
            ];

            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            sut.init().subscribe((result: ClassifiedFuelChips) => {

                expect(paymentExtensionEligibilitySpy.calls.count()).toEqual(1);
                expect(paymentExtensionEligibilitySpy).toHaveBeenCalledWith(contractAccountNumber1);

                expect(result.eligibleFuelChips.length).toBe(1);
                expect(result.alreadyExtendedFuelChips.length).toBe(0);
                expect(result.ineligibleFuelChips.length).toBe(0);
                expect(result.noIssuedBillFuelChips.length).toBe(0);
                done();
            });
        });
    });
});
