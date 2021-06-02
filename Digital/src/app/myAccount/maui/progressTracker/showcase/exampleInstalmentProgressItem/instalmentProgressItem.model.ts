import * as moment from 'moment';
import { VerticalProgressItemModel, Color, LineStyle, BulletShape, BulletContent, PaneAlignment } from '../../progressItems/verticalProgressItem/verticalProgressItem.model';
import { ProgressItem } from '../../progressTracker.model';

export class InstalmentProgressItem implements ProgressItem {
    private model: VerticalProgressItemModel;
    private pane1: any;
    private pane2: any;
    private index: number;
    private isLast: boolean;

    public constructor(private amountDue: number, private dueDate: Date, private status: InstalmentStatus) {
    }

    public initialise(index: number, isLast: boolean) {
        this.index = index;
        this.isLast = isLast;
        this.model = this.loadVerticalProgressItemModel();
        this.pane1 = this.loadLeftPane();
        this.pane2 = this.loadRightPane();
    }

    public getModel() {
        return this.model;
    }

    public getPane1() {
        return this.pane1;
    }

    public getPane2() {
        return this.pane2;
    }

    private loadLeftPane(): LeftPane {

        const isPrimaryMessageGrey = this.status === InstalmentStatus.Paid;

        return {
            primaryMessage: `$${this.amountDue.toFixed(2)}`,
            secondaryMessage: `Instalment ${this.index + 1}${this.isLast ? ' (Final)' : ''}`,
            isPrimaryMessageGrey: isPrimaryMessageGrey
        };
    }

    private loadRightPane(): RightPane {

        const primaryMessageStatus = 'Due ';
        const primaryMessageDueDate = `${this.isDueDateToday() ? 'Today' : this.getDueDateAsDate()}`;
        const secondaryMessage = this.getDueDateAsDay();
        let tertiaryMessage = '';

        const instalmentStatusMap = {
            [InstalmentStatus.Paid] : () => {
                tertiaryMessage = `Paid`;
            },
            [InstalmentStatus.Overdue] : () => {
                const daysOverdue = this.getDaysBeforeToday(this.dueDate);

                if (daysOverdue !== 0) {
                    tertiaryMessage = `Overdue by ${daysOverdue} ${(daysOverdue === 1) ? 'day' : 'days' }`;
                }
            }
        };

        const instalmentStatusFunc = instalmentStatusMap[this.status];
        if (instalmentStatusFunc) {
            instalmentStatusFunc();
        }

        const isPrimaryMessageGrey = this.status === InstalmentStatus.Paid;

        return {
            primaryMessageStatus: primaryMessageStatus,
            primaryMessageDueDate: primaryMessageDueDate,
            secondaryMessage: secondaryMessage,
            tertiaryMessage: tertiaryMessage,
            isPrimaryMessageGrey: isPrimaryMessageGrey
        };
    }

    private loadVerticalProgressItemModel(): VerticalProgressItemModel {
        const leftPaneAlignment = PaneAlignment.Right;
        const rightPaneAlignment = PaneAlignment.Left;
        const isLast = this.isLast;
        let lineStyle: LineStyle;
        let color: Color;
        let bulletShape: BulletShape;
        let bulletContent: BulletContent;
        let hasShadow: boolean = false;

        const instalmentStatusMap = {
            [InstalmentStatus.Due]: () => {
                lineStyle = LineStyle.Dashed;
                color = Color.Blue;
                bulletShape = BulletShape.CircleSolid;
                hasShadow = true;
            },
            [InstalmentStatus.Upcoming]: () => {
                lineStyle = LineStyle.Dashed;
                color = Color.Blue;
                bulletShape = BulletShape.CircleEmpty;
            },
            [InstalmentStatus.Paid]: () => {
                lineStyle = LineStyle.Solid;
                color = Color.Green;
                bulletShape = BulletShape.CircleSolid;
                bulletContent = BulletContent.Tick;
            },
            [InstalmentStatus.Overdue]: () => {
                lineStyle = LineStyle.Solid;
                color = Color.Red;
                bulletShape = BulletShape.CircleSolid;
                bulletContent = BulletContent.Cross;
            }
        };

        const instalmentStatusFunc = instalmentStatusMap[this.status];
        if (instalmentStatusFunc) {
            instalmentStatusFunc();
        }

        const model = new VerticalProgressItemModel(color, lineStyle, bulletShape, bulletContent, leftPaneAlignment, rightPaneAlignment, hasShadow, isLast);

        return model;
    }

    private getDueDateAsDate(): string {
        return moment(this.dueDate).format('DD MMM YYYY');
    }

    private getDueDateAsDay(): string {
        return moment(this.dueDate).format('dddd');
    }

    private getDaysBeforeToday(date: Date): number {
        const days = moment().diff(moment(date), 'days');
        return (days > 0) ? days : 0;
    }

    private isDueDateToday(): boolean {
        return moment().diff(moment(this.dueDate), 'days') === 0;
    }
}

export enum InstalmentStatus {
    Due,
    Upcoming,
    Paid,
    Overdue
}

export interface LeftPane {
    primaryMessage: string;
    secondaryMessage: string;
    isPrimaryMessageGrey: boolean;
}

export interface RightPane {
    primaryMessageStatus: string;
    primaryMessageDueDate: string;
    secondaryMessage: string;
    tertiaryMessage: string;
    isPrimaryMessageGrey: boolean;
}
