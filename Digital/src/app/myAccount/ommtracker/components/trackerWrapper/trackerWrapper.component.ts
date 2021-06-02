import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agl-omm-tracker-wrapper',
  templateUrl: './trackerWrapper.component.html',
  styleUrls: ['./trackerWrapper.component.scss']
})
export class TrackerWrapperComponent implements OnInit {
    @Input() public topPixels: number = 85;

    public topPixelValue: string;

    public ngOnInit() {
      this.topPixelValue = `${this.topPixels}px`;
    }
}
