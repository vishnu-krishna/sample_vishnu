import { ComponentFixture, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TrackerWrapperComponent } from './trackerWrapper.component';

describe('Tracker wrapper component', () => {
    let comp: TrackerWrapperComponent;
    let fixture: ComponentFixture<TrackerWrapperComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TrackerWrapperComponent]
        });

        fixture = TestBed.createComponent(TrackerWrapperComponent);
        comp = fixture.componentInstance;
    });

    it('should load without crashing', () => {
        expect(comp).toBeDefined();
    });
});
