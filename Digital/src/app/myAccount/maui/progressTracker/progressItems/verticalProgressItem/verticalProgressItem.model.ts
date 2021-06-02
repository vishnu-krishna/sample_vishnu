export enum Color {
    Red,
    Blue,
    Green
}

export enum LineStyle {
    Solid,
    Dashed
}

export enum BulletShape {
    CircleEmpty,
    CircleSolid,
    SquareEmpty,
    SquareSolid
}

export enum BulletContent {
    Tick,
    Cross
}

export enum PaneAlignment {
    Left,
    Right
}

export class VerticalProgressItemModel {
    public constructor(public color: Color, public lineStyle: LineStyle, public bulletShape: BulletShape,
                       public bulletContent: BulletContent, public leftPaneAlignment: PaneAlignment, public rightPaneAlignment: PaneAlignment, public hasShadow: boolean, public isLast: boolean) {
    }
}
