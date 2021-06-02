import * as moment from 'moment';
import { InstalmentProgressItem, InstalmentStatus } from './instalmentProgressItem.model';
import { LineStyle, Color, BulletShape, BulletContent, PaneAlignment } from '../../progressItems/verticalProgressItem/verticalProgressItem.model';

describe('instalment', () => {
    let instalmentProgressItem: InstalmentProgressItem;

    describe('When initialise is called', () => {
        it('should populate layout model', () => {
            instalmentProgressItem = new InstalmentProgressItem(0, null, InstalmentStatus.Paid);

            instalmentProgressItem.initialise(0, false);

            expect(instalmentProgressItem.getModel()).not.toBeNull();
            expect(instalmentProgressItem.getModel().color).toBe(Color.Green);
            expect(instalmentProgressItem.getModel().lineStyle).toBe(LineStyle.Solid);
            expect(instalmentProgressItem.getModel().bulletShape).toBe(BulletShape.CircleSolid);
            expect(instalmentProgressItem.getModel().bulletContent).toBe(BulletContent.Tick);
            expect(instalmentProgressItem.getModel().leftPaneAlignment).toBe(PaneAlignment.Right);
            expect(instalmentProgressItem.getModel().rightPaneAlignment).toBe(PaneAlignment.Left);
            expect(instalmentProgressItem.getModel().hasShadow).toBe(false);
            expect(instalmentProgressItem.getModel().isLast).toBe(false);
        });

        it('should populate left pane', () => {
            const amountDue = 10;
            instalmentProgressItem = new InstalmentProgressItem(amountDue, null, InstalmentStatus.Paid);

            instalmentProgressItem.initialise(0, true);

            expect(instalmentProgressItem.getPane1().primaryMessage).toBe(`$10.00`);
            expect(instalmentProgressItem.getPane1().secondaryMessage).toBe('Instalment 1 (Final)');
            expect(instalmentProgressItem.getPane1().isPrimaryMessageGrey).toBe(true);
        });

        it('should populate right pane', () => {
            let today = new Date('2018-03-15');
            jasmine.clock().mockDate(today);
            const dueDate = new Date('2018-03-12');
            instalmentProgressItem = new InstalmentProgressItem(0, dueDate, InstalmentStatus.Overdue);

            instalmentProgressItem.initialise(0, false);

            expect(instalmentProgressItem.getPane2().primaryMessageStatus).toBe('Due ');
            expect(instalmentProgressItem.getPane2().primaryMessageDueDate).toBe(`${moment(dueDate).format('DD MMM YYYY')}`);
            expect(instalmentProgressItem.getPane2().secondaryMessage).toBe('Monday');
            expect(instalmentProgressItem.getPane2().tertiaryMessage).toBe('Overdue by 3 days');
        });
    });
});
