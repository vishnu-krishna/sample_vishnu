import { VerticalProgressItemComponent } from './verticalProgressItem.component';
import { Color, LineStyle, BulletShape, BulletContent, PaneAlignment, VerticalProgressItemModel } from './verticalProgressItem.model';

describe('VerticalProgressItemComponent', () => {
    let verticalProgressItemComponent: VerticalProgressItemComponent;

    beforeEach(() => {
        const model = new VerticalProgressItemModel(Color.Red, LineStyle.Dashed, BulletShape.SquareEmpty, BulletContent.Cross, PaneAlignment.Right, PaneAlignment.Right, false, true);
        verticalProgressItemComponent = new VerticalProgressItemComponent();
        verticalProgressItemComponent.model = model;
    });

    describe('List item', () => {
        it('add dimension class', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain(`verticalItem__item`);
        });

        it('add color class', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain('verticalItem__item--color-red');
        });

        it('add line style', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain('verticalItem__item--line-style-dashed');
        });

        it('add bullet shape', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain('verticalItem__item--bullet-shape-square-empty');
        });

        it('add bullet content', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain('verticalItem__item--bullet-icon-cross');
        });

        it('hide shadow', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain('verticalItem__item--hide-shadow');
        });

        it('is final', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.itemClasses).toContain(`verticalItem__item-last`);
        });
    });

    describe('left pane', () => {
        it('add dimension class', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.leftPaneClasses).toContain(`verticalItem__left-pane`);
        });

        it('add pane content alignment', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.leftPaneClasses).toContain('verticalItem__left-pane--align-right');
        });
    });

    describe('right pane', () => {
        it('add dimension class', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.rightPaneClasses).toContain(`verticalItem__right-pane`);
        });

        it('add pan content alignment', () => {
            verticalProgressItemComponent.ngOnInit();

            expect(verticalProgressItemComponent.rightPaneClasses).toContain('verticalItem__right-pane--align-right');
        });
    });
});
