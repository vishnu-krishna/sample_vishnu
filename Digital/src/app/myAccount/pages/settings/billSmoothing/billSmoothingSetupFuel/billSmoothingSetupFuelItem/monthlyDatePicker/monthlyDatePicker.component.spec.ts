import { DebugElement }                     from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDatePickerComponent } from './monthlyDatePicker.component';
import { MonthlyDatePickerViewModel } from './monthlyDatePickerViewModel.model';

describe('Monthly Date Picker Component', () => {
    let sut: MonthlyDatePickerComponent;
    let fixture: ComponentFixture<MonthlyDatePickerComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MonthlyDatePickerComponent
            ],
            providers: [
                MonthlyDatePickerComponent
            ]
        });

        fixture = TestBed.createComponent(MonthlyDatePickerComponent);
        sut = fixture.componentInstance;
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];
        sut.monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);
        fixture.detectChanges();
    });

    it ('should emit onClose when close button is clicked', () => {
        // arrange
        spyOn(sut.onClose, 'emit');

        // act
        const closeLink = fixture.nativeElement.querySelector('.close-button > a');
        closeLink.dispatchEvent(new Event('click'));

        // assert
        expect(sut.onClose.emit).toHaveBeenCalled();
    });

    it ('should emit onSelect when non-excluded date link is clicked', () => {
        // arrange
        // non-excluded date
        const date = new Date(2017, 4, 5);
        spyOn(sut.onSelect, 'emit');

        // act
        const nonExcludedDateLink = [].find.call(fixture.nativeElement.querySelectorAll('.calendar > li > a.calendar-item-standard'), (l: any) => l.outerText === date.getDate().toString());
        nonExcludedDateLink.dispatchEvent(new Event('click'));

        // assert
        expect(sut.onSelect.emit).toHaveBeenCalled();
    });

    it ('should not emit onSelect when excluded date link clicked', () => {
        // arrange
        // excluded date
        const date = new Date(2017, 4, 12);
        spyOn(sut.onSelect, 'emit');

        // act
        const excludedDateLink = [].find.call(fixture.nativeElement.querySelectorAll('.calendar > li > a.calendar-item-excluded'), (l: any) => l.outerText === date.getDate().toString());
        excludedDateLink.dispatchEvent(new Event('click'));

        // assert
        expect(sut.onSelect.emit).not.toHaveBeenCalled();
    });

    it ('should emit onClose when somewhere outside of monthly date picker is clicked ', () => {
        // arrange
        spyOn(sut.onClose, 'emit');

        // act
        const mouseEvent: any = {
            srcElement: {
                nodeName: 'div',
                classList: [],
                parentElement: {
                    nodeName: 'body',
                    classList: [],
                    parentElement: null
                }
            }
        };
        sut.documentClick(mouseEvent);

        // assert
        expect(sut.onClose.emit).toHaveBeenCalled();
    });
});
