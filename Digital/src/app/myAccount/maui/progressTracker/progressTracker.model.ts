import { VerticalProgressItemModel } from './progressItems/verticalProgressItem/verticalProgressItem.model';

export interface ProgressItem {
    initialise(index: number, isLast: boolean);
    // getModel() can return multiple possible types, it can be declare like this: VerticalProgressItemModel | HorizontalProgressItemModel;
    getModel(): VerticalProgressItemModel;
    getPane1(): any;
    getPane2(): any;
}
