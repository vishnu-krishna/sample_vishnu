import { ProgressTrackerComponent } from './progressTracker.component';

describe('ProgressTrackerComponent', () => {
    let progressTrackerComponent = new ProgressTrackerComponent();
    describe('ngOnInit', () => {

        it('should call initialise', () => {
            const progressItem = {
                initialise: (index: number, isLast: boolean) => {
                    throw new Error('initialise is not implemented');
                },
                getModel: () => {
                    throw new Error('getModel is not implemented');
                },
                getPane1: () => {
                    throw new Error('getPane1 is not implemented');
                },
                getPane2: () => {
                    throw new Error('getPane2 is not implemented');
                }
            };

            spyOn(progressItem, 'initialise').and.returnValue(null);
            progressTrackerComponent.progressItems = [progressItem];

            progressTrackerComponent.ngOnInit();

            expect(progressItem.initialise).toHaveBeenCalledTimes(1);
        });
    });
});
