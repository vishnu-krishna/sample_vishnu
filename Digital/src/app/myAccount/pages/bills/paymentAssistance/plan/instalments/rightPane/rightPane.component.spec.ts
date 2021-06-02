import { PaymentAssistancePlanInstalmentsRightPaneComponent } from './rightPane.component';
import { Color } from '../../../../../../maui/progressTracker/progressItems/verticalProgressItem/verticalProgressItem.model';

describe('instalmentRightPane', () => {
    let instalmentRightPaneComponent: PaymentAssistancePlanInstalmentsRightPaneComponent;

    beforeEach(() => {
        instalmentRightPaneComponent = new PaymentAssistancePlanInstalmentsRightPaneComponent();
    });

    describe('When ngOnInit is called', () => {
        it('color is red', () => {
            instalmentRightPaneComponent.color = Color.Red;

            instalmentRightPaneComponent.ngOnInit();

            expect(instalmentRightPaneComponent.isTertiaryMessageRed).toBe(true);
        });

        it('color is green', () => {
            instalmentRightPaneComponent.color = Color.Green;

            instalmentRightPaneComponent.ngOnInit();

            expect(instalmentRightPaneComponent.isTertiaryMessageGreen).toBe(true);
        });
    });
});
