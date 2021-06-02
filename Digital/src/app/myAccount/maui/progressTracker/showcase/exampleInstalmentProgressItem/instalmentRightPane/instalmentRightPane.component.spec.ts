import { InstalmentRightPaneComponent } from './instalmentRightPane.component';
import { Color } from '../../../progressItems/verticalProgressItem/verticalProgressItem.model';

describe('instalmentRightPane', () => {
    let instalmentRightPaneComponent: InstalmentRightPaneComponent;

    beforeEach(() => {
        instalmentRightPaneComponent = new InstalmentRightPaneComponent();
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
