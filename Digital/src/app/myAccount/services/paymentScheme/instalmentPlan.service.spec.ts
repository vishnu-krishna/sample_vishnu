import * as moment from 'moment';
import { NowMock } from './../mock/now.mock.service';
import { Observable } from 'rxjs';

import { PaymentAssistancePlanInstalmentsModel, PaymentAssistancePlanInstalmentsProgressItem, InstalmentStatus } from '../../pages/bills/paymentAssistance/plan/instalments';
import { IPaymentSchemeApi, InstalmentPlanStatus, PaymentArrangementInstalmentPlans, InstalmentPayment, InstalmentPlan } from './paymentSchemeApi.service';
import { InstalmentPlanService, UpcomingInstalment, InstalmentPlanBilling, OverdueInstalment, InstalmentPlanData, ContractUpcomingInstalment, NextInstalment } from './instalmentPlan.service';
import { ContractInstalmentPlanBuilder, InstalmentPlanBuilder, InstalmentBuilder } from './test';

describe('InstalmentPlanService', () => {
    let instalmentPlanService: InstalmentPlanService;
    let apiSpy: any;
    let now: NowMock;

    beforeEach(() => {
        apiSpy = jasmine.createSpyObj('api', ['getPaymentArrangementInstalmentPlans']);
        now = new NowMock('');
        instalmentPlanService = new InstalmentPlanService(apiSpy, now);
    });

    describe('when prepareInstalmentProgressTracker is called', () => {
        const contractNumber = 123;
        const instalmentDate1 = moment('2018-01-01').toDate();
        const instalmentDate2 = moment('2018-01-02').toDate();
        const instalmentDate3 = moment('2018-01-03').toDate();
        const instalmentDate4 = moment('2018-01-04').toDate();
        const instalmentDate5 = moment('2018-01-05').toDate();

        it('should return the same number of progress items as instalments',  () => {
            // ARRANGE
            now.setDate(2018, 0, 1);
            const instalmentDate = now.date().subtract(1, 'day').toDate();

            const instalment = createInstalmentPayment(instalmentDate, 50, 50);
            const instalmentPlan = createInstalmentPlan([instalment], InstalmentPlanStatus.Open);

            // ACT
            const actualProgressTracker = instalmentPlanService.prepareInstalmentProgressTracker(instalmentPlan);

            // ASSERT
            const expectedProgressTracker = createProgressItems(50, instalmentDate, InstalmentStatus.Overdue);

            expect(actualProgressTracker.progressItems.length).toBe(instalmentPlan.instalments.length);
            expect(actualProgressTracker).toEqual(expectedProgressTracker);
        });

        it('should sort progress items data set starting with the earliest start date',  () => {
            // ARRANGE
            now.setDate(2018, 1, 1);
            const instalments = [
                createInstalmentPayment(instalmentDate2, 50, 50),
                createInstalmentPayment(instalmentDate3, 50, 50),
                createInstalmentPayment(instalmentDate1, 50, 50)
            ];

            const instalmentPlan = createInstalmentPlan(instalments, InstalmentPlanStatus.Open);

            // ACT
            const instalmentProgressTracker = instalmentPlanService.prepareInstalmentProgressTracker(instalmentPlan);

            // ASSERT
            const sortedProgressItems = [
                new PaymentAssistancePlanInstalmentsProgressItem(50, instalmentDate1, InstalmentStatus.Overdue),
                new PaymentAssistancePlanInstalmentsProgressItem(50, instalmentDate2, InstalmentStatus.Overdue),
                new PaymentAssistancePlanInstalmentsProgressItem(50, instalmentDate3, InstalmentStatus.Overdue)];

            expect(instalmentProgressTracker.progressItems).toEqual(sortedProgressItems);
        });

        it('should set the right progress item status depending on the dates',  () => {
            // ARRANGE
            now.setDate(2018, 0, 3);

            const instalments = [
                createInstalmentPayment(instalmentDate1, 50, 0),
                createInstalmentPayment(instalmentDate2, 50, 50),
                createInstalmentPayment(instalmentDate3, 50, 50),
                createInstalmentPayment(instalmentDate4, 50, 50),
                createInstalmentPayment(instalmentDate5, 50, 50)
            ];

            const instalmentPlan = createInstalmentPlan(instalments, InstalmentPlanStatus.Open);

            // ACT
            const instalmentProgressTracker = instalmentPlanService.prepareInstalmentProgressTracker(instalmentPlan);

            // ASSERT
            const progressItems = instalmentProgressTracker.progressItems;
            expect(progressItems[0].status).toBe(InstalmentStatus.Paid);
            expect(progressItems[1].status).toBe(InstalmentStatus.Overdue);
            expect(progressItems[2].status).toBe(InstalmentStatus.Due);
            expect(progressItems[3].status).toBe(InstalmentStatus.Upcoming);
            expect(progressItems[4].status).toBe(InstalmentStatus.Upcoming);
        });

        it('should display the right amount depending on the status of the instalment',  () => {
            // ARRANGE
            now.setDate(2018, 0, 1);

            const instalments: InstalmentPayment[] = [
                createInstalmentPayment(instalmentDate1, 50, 0),
                createInstalmentPayment(instalmentDate2, 50, 20),
                createInstalmentPayment(instalmentDate2, 50, 50)
            ];

            const instalmentPlan = createInstalmentPlan(instalments, InstalmentPlanStatus.Open);

            // ACT
            const instalmentProgressTracker = instalmentPlanService.prepareInstalmentProgressTracker(instalmentPlan);

            // ASSERT
            const progressItems = instalmentProgressTracker.progressItems;
            expect(progressItems[0].amountDue).toBe(50);
            expect(progressItems[1].amountDue).toBe(20);
            expect(progressItems[2].amountDue).toBe(50);
        });
    });

    describe('when getBilling', () => {
        describe('when NO overdue', () => {
            it('should set next due instalment', () => {
                // Arrange
                now.setDate(2018, 4, 11);

                const pastInstalment = new InstalmentBuilder(new Date('2018-05-10'), 50, 0).build();
                const dueInstalment = new InstalmentBuilder(new Date('2018-05-12'), 100, 100).build();
                const futureInstalment = new InstalmentBuilder(new Date('2018-05-13'), 100, 100).build();

                const instalmentPlan = new InstalmentPlanBuilder()
                    .addInstalment(pastInstalment)
                    .addInstalment(dueInstalment)
                    .addInstalment(futureInstalment)
                    .build();

                const expectedNextInstalment = new NextInstalment(
                    dueInstalment.dueAmount,
                    dueInstalment.instalmentDate,
                    2);
                const expectedOwingBalance = 200;
                const expectedOverdueBalance = 0;

                const expectedBilling = new InstalmentPlanBilling(
                    expectedNextInstalment,
                    expectedOwingBalance,
                    expectedOverdueBalance
                );

                // Act
                const actualBilling = instalmentPlanService.getBilling(instalmentPlan.instalments);

                // Assert
                expect(actualBilling).toEqual(expectedBilling);
            });
        });

        describe('when overdue', () => {
            it('should set overdue', () => {
                // Arrange
                now.setDate(2018, 4, 11);

                const expectedOverdueBalance = 30;

                const overduePastInstalment = new InstalmentBuilder(new Date('2018-05-09'), 50, expectedOverdueBalance).build();
                const pastInstalment = new InstalmentBuilder(new Date('2018-05-10'), 50, 0).build();
                const dueInstalment = new InstalmentBuilder(new Date('2018-05-12'), 100, 100).build();
                const futureInstalment = new InstalmentBuilder(new Date('2018-05-13'), 100, 100).build();

                const instalmentPlan = new InstalmentPlanBuilder()
                    .addInstalment(overduePastInstalment)
                    .addInstalment(pastInstalment)
                    .addInstalment(dueInstalment)
                    .addInstalment(futureInstalment)
                    .build();

                const expectedNextInstalment = new NextInstalment(
                    dueInstalment.dueAmount,
                    dueInstalment.instalmentDate,
                    3);
                const expectedOwingBalance = 230;

                const expectedBilling = new InstalmentPlanBilling(
                    expectedNextInstalment,
                    expectedOwingBalance,
                    expectedOverdueBalance
                );

                // Act
                const actualBilling = instalmentPlanService.getBilling(instalmentPlan.instalments);

                // Assert
                expect(actualBilling).toEqual(expectedBilling);
            });
        });

        describe('when instalment plan completed', () => {
            it('should return empty billing', () => {
                // Arrange
                now.setDate(2018, 4, 11);

                const pastInstamentOne = new InstalmentBuilder(new Date('2018-05-09'), 50, 0).build();
                const pastInstalmentTwo = new InstalmentBuilder(new Date('2018-05-10'), 49, 0).build();

                const instalmentPlan = new InstalmentPlanBuilder()
                    .addInstalment(pastInstamentOne)
                    .addInstalment(pastInstalmentTwo)
                    .build();

                const expectedNextInstalment: NextInstalment = undefined;
                const expectedOwingBalance = 0;
                const expectedOverdueBalance = 0;

                const expectedBilling = new InstalmentPlanBilling(
                    expectedNextInstalment,
                    expectedOwingBalance,
                    expectedOverdueBalance
                );

                // Act
                const actualBilling = instalmentPlanService.getBilling(instalmentPlan.instalments);

                // Assert
                expect(actualBilling).toEqual(expectedBilling);
            });
        });

        describe('when getOwingBalance() has rounding problems with the amount owing (10 * $50.01)', () => {

            it('should accurately determine totalInstalmentPlanOwingBalance to 2 decimal places ($500.10)', () => {
                // Arrange
                now.setDate(2018, 4, 11);

                const instalment = new InstalmentBuilder(new Date('2018-05-09'), 0, 50.01).build();

                const instalmentPlan = new InstalmentPlanBuilder()
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .build();

                const expectedOwingBalance = 500.10;

                // Act
                const actualBilling = instalmentPlanService.getBilling(instalmentPlan.instalments);

                // Assert
                expect(actualBilling.totalInstalmentPlanOwingBalance).toBe(expectedOwingBalance);
            });
        });

        describe('when getOverdueBalance() has rounding problems with the amount due (10 * $10.01)', () => {

            it('should accurately determine overdueBalance to 2 decimal places ($100.10)', () => {
                // Arrange
                now.setDate(2018, 4, 11);

                const instalment = new InstalmentBuilder(new Date('2018-05-09'), 0, 10.01).build();

                const instalmentPlan = new InstalmentPlanBuilder()
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .addInstalment(instalment)
                    .build();

                const overdueAmount = 100.10;

                // Act
                const actualBilling = instalmentPlanService.getBilling(instalmentPlan.instalments);

                // Assert
                expect(actualBilling.overdueAmount).toBe(overdueAmount);
            });
        });
    });

    describe('when getUpcomingInstalments is called', () => {
        it('should return same number of upcoming instalments as payment arrangement plans',  (done) => {
            // arrange
            const plans = [
                new ContractInstalmentPlanBuilder(1, [new Date('2018-03-01'), new Date('2018-05-01'), new Date('2018-08-01')]).build(),
                new ContractInstalmentPlanBuilder(2, [new Date('2018-03-01'), new Date('2018-05-01'), new Date('2018-08-01')]).build()
            ];

            const expectedUpcomingInstalmentsCount = plans.length;

            apiSpy.getPaymentArrangementInstalmentPlans.and.returnValue(Observable.of(plans));

            // act
            const upcomingInstalmentsObservable = instalmentPlanService.getUpcomingInstalments('1');

            // assert
            upcomingInstalmentsObservable.subscribe((upcomingInstalments: ContractUpcomingInstalment[]) => {
                expect(upcomingInstalments.length).toBe(expectedUpcomingInstalmentsCount);
                done();
            });
        });
    });

    describe('when getUpcomingInstalments is called', () => {
        it('should return first plan (plan with earliest instalment)', (done) => {
            // arrange
            now.setDate(2018, 4, 5);
            const expectedUpcomingInstalmentDate = new Date('2018-07-01');

            const plans = [
                new ContractInstalmentPlanBuilder(1, [new Date('2018-03-01'), new Date('2018-05-01'), new Date('2018-08-01')])
                    .addInstalmentPlan(new InstalmentPlanBuilder([new Date('2018-02-01'), expectedUpcomingInstalmentDate]).build())
                    .build()
            ];

            apiSpy.getPaymentArrangementInstalmentPlans.and.returnValue(Observable.of(plans));

            // act
            const upcomingInstalmentsObservable = instalmentPlanService.getUpcomingInstalments('1');

            // assert
            upcomingInstalmentsObservable.subscribe((upcomingInstalments: ContractUpcomingInstalment[]) => {
                expect(upcomingInstalments.length).toBe(1);
                const actualUpcomingInstalment = upcomingInstalments.find((p) => p.contractNumber === 1);
                expect(actualUpcomingInstalment.upcomingInstalment.instalmentDueDate).toEqual(expectedUpcomingInstalmentDate);
                done();
            });
        });
    });

    describe('when getUpcomingInstalments is called', () => {
        it('should return upcoming instalment for the plan', (done) => {
            // arrange

            now.setDate(2018, 6, 1);
            const dueAmount = 1;
            const overdueAmounts = [ 2, 3 ];
            const dueDate = new Date('2018-07-01');

            const totalOverdueAmount = overdueAmounts[0] + overdueAmounts[1];
            const expectedUpcomingInstalment = new UpcomingInstalment(totalOverdueAmount, dueAmount, dueDate);

            const instalmentToReturn = new InstalmentBuilder(dueDate, dueAmount, dueAmount)
                .build();

            const instalmentPlan =  new InstalmentPlanBuilder()
                .addInstalment(new InstalmentBuilder(new Date('2018-04-01'), overdueAmounts[0], overdueAmounts[0]).build())
                .addInstalment(new InstalmentBuilder(new Date('2018-05-01'), overdueAmounts[1], overdueAmounts[1]).build())
                .addInstalment(instalmentToReturn)
                .addInstalment(new InstalmentBuilder(new Date('2018-08-01'), overdueAmounts[0], overdueAmounts[0]).build())
                .build();

            const plans = [
                new ContractInstalmentPlanBuilder(1)
                    .addInstalmentPlan(instalmentPlan)
                    .build()
            ];

            apiSpy.getPaymentArrangementInstalmentPlans.and.returnValue(Observable.of(plans));

            // act
            const upcomingInstalmentsObservable = instalmentPlanService.getUpcomingInstalments('1');

            // assert

            upcomingInstalmentsObservable.subscribe((upcomingInstalments: ContractUpcomingInstalment[]) => {
                expect(upcomingInstalments.length).toBe(1);

                const actualUpcomingInstalment = upcomingInstalments.find((p) => p.contractNumber === 1);
                expect(actualUpcomingInstalment.upcomingInstalment).toEqual(expectedUpcomingInstalment);

                done();
            });
        });
    });
});

function createInstalmentPayment(instalmentDate: Date, instalmentAmount: number, dueAmount: number): InstalmentPayment {
    return { instalmentDate, instalmentAmount, dueAmount };
}

function createInstalmentPlan(instalmentPayment: InstalmentPayment[], status: InstalmentPlanStatus): InstalmentPlan {
    return { instalments: instalmentPayment, status: status };
}

function createProgressItems(amountDue: number, dueDate: Date, status: InstalmentStatus): PaymentAssistancePlanInstalmentsModel {
    return { progressItems: [new PaymentAssistancePlanInstalmentsProgressItem(amountDue, dueDate, status)] };
}
