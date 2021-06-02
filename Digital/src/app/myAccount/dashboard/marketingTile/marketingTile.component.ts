import {
    Component,
    OnInit } from '@angular/core';
import { ContentService } from '../../../shared/service/content.service';

@Component({
    selector: 'agl-marketing-tile',
    templateUrl: './marketingTile.component.html',
    styleUrls: ['./marketingTile.component.scss']
})
export class MarketingTileComponent implements OnInit {

    public tile: MarketingTile;
    private _content: Object;

    constructor(private _contentService: ContentService) { }

    public ngOnInit() {
        this._contentService.load()
            .subscribe((content) => {
                this._content = <MarketingTile[]> content.selfService.marketingTiles;
                if (this._content) {

                    const contentNames: string[] = Object.keys(this._content);

                    // Iterate through the tiles to find if there one that is enabled for this page (uses url)
                    for (const contentName of contentNames) {
                        const tile = this._content[contentName];
                        if (tile.showOn.includes(window.location.pathname)) {
                            this.tile = tile;
                            break;
                        }
                    }

                    // If a tile has not been found, default to the first in the list
                    if (!this.tile) {
                        this.tile = this._content[contentNames[0]];
                    }
                }
            });
    }
}

export class MarketingTile {
    public tileImage: string;
    public link: string;
    public heading: string;
    public details: string;
    public textBackgroundColour: string;
    public linkLabel: string;
    public showOn: string[];
}
