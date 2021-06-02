import { Component, Input, OnInit } from '@angular/core';
import { VerticalProgressItemModel, Color, LineStyle, BulletShape, BulletContent, PaneAlignment } from './verticalProgressItem.model';

@Component({
    selector: 'agl-maui-vertical-progress-item',
    templateUrl: './verticalProgressItem.component.html',
    styleUrls: ['./verticalProgressItem.component.scss']
})
export class VerticalProgressItemComponent implements OnInit {
    @Input() public model: VerticalProgressItemModel;
    public itemClasses: string;
    public leftPaneClasses: string;
    public rightPaneClasses: string;

    public ngOnInit(): void {
        this.itemClasses = this.getItemClasses();
        this.leftPaneClasses = this.getLeftPaneClasses();
        this.rightPaneClasses = this.getRightPaneClasses();
    }

    private getItemClasses(): string {
        const dimensionClass = `verticalItem__item`;
        const itemClasses = [dimensionClass];
        if (this.model.isLast) {
            itemClasses.push(`verticalItem__item-last`);
        }

        const colorMap = {
            [Color.Blue]: () => {
                itemClasses.push('verticalItem__item--color-blue');
            },
            [Color.Red]: () => {
                itemClasses.push('verticalItem__item--color-red');
            },
            [Color.Green]: () => {
                itemClasses.push('verticalItem__item--color-green');
            },
        };

        const colorFunc = colorMap[this.model.color];
        if (colorFunc) {
            colorFunc();
        }

        const lineStyleMap = {
            [LineStyle.Solid]: () => {
                itemClasses.push('verticalItem__item--line-style-solid');
            },
            [LineStyle.Dashed]: () => {
                itemClasses.push('verticalItem__item--line-style-dashed');
            }
        };

        const lineStyleFunc = lineStyleMap[this.model.lineStyle];
        if (lineStyleFunc) {
            lineStyleFunc();
        }

        const bulletShapeMap = {
            [BulletShape.CircleEmpty]: () => {
                itemClasses.push('verticalItem__item--bullet-shape-circle-empty');
            },
            [BulletShape.CircleSolid]: () => {
                itemClasses.push('verticalItem__item--bullet-shape-circle-solid');
            },
            [BulletShape.SquareEmpty]: () => {
                itemClasses.push('verticalItem__item--bullet-shape-square-empty');
            },
            [BulletShape.SquareSolid]: () => {
                itemClasses.push('verticalItem__item--bullet-shape-square-solid');
            }
        };

        const bulletShapeFunc = bulletShapeMap[this.model.bulletShape];
        if (bulletShapeFunc) {
            bulletShapeFunc();
        }

        const bulletContentMap = {
            [BulletContent.Tick]: () => {
                itemClasses.push('verticalItem__item--bullet-icon-tick');
            },
            [BulletContent.Cross]: () => {
                itemClasses.push('verticalItem__item--bullet-icon-cross');
            }
        };

        const bulletContentFunc = bulletContentMap[this.model.bulletContent];
        if (bulletContentFunc) {
            bulletContentFunc();
        } else {
            itemClasses.push('verticalItem__item--bullet-icon-empty');
        }

        if (!this.model.hasShadow) {
            itemClasses.push('verticalItem__item--hide-shadow');
        }

        return itemClasses.join(' ');
    }

    private getLeftPaneClasses(): string {
        const dimensionClass = `verticalItem__left-pane`;
        const leftPaneClasses = [dimensionClass];

        const leftPaneAlignmentMap = {
            [PaneAlignment.Left]: () => {
                leftPaneClasses.push('verticalItem__left-pane--align-left');
            },
            [PaneAlignment.Right]: () => {
                leftPaneClasses.push('verticalItem__left-pane--align-right');
            }
        };
        leftPaneAlignmentMap[this.model.leftPaneAlignment]();

        return leftPaneClasses.join(' ');
    }

    private getRightPaneClasses(): string {
        const dimensionClass = `verticalItem__right-pane`;
        const rightPaneClasses = [dimensionClass];

        const rightPaneAlignmentMap = {
            [PaneAlignment.Left]: () => {
                rightPaneClasses.push('verticalItem__right-pane--align-left');
            },
            [PaneAlignment.Right]: () => {
                rightPaneClasses.push('verticalItem__right-pane--align-right');
            }
        };
        rightPaneAlignmentMap[this.model.rightPaneAlignment]();

        return rightPaneClasses.join(' ');
    }
}
