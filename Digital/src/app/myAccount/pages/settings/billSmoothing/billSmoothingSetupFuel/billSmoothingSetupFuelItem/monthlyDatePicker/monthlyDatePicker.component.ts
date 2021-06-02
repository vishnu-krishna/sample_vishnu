import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MonthlyDatePickerDateViewModel, MonthlyDatePickerViewModel } from './monthlyDatePickerViewModel.model';

@Component({
    selector: 'agl-monthly-datepicker',
    templateUrl: './monthlyDatePicker.component.html',
    styleUrls: ['./monthlyDatePicker.component.scss']
})
export class MonthlyDatePickerComponent {
    @Output() public onSelect = new EventEmitter<MonthlyDatePickerDateViewModel>();
    @Output() public onClose = new EventEmitter();
    @Input() public monthlyDatePickerViewModel: MonthlyDatePickerViewModel;

    public close(event: any) {
        event.preventDefault();
        this.onClose.emit();
    }

    public select(event: any, date: MonthlyDatePickerDateViewModel) {
        event.preventDefault();
        if (!date.IsExcluded) {
            this.onSelect.emit(date);
        }
    }

    @HostListener('document:click', ['$event'])
    public documentClick(event: any) {
        if (!this.isMonthlyDatePickerClicked(event.srcElement || event.target)) {
            this.onClose.emit();
        }
    }

    private isMonthlyDatePickerClicked(element: any): boolean {
        if (!element) {
            return false;
        } else if (element.classList.length > 0 && element.classList.contains('monthly-date-picker')) {
            return true;
        } else if (element.nodeName.toUpperCase() === 'BODY') {
            return false;
        } else {
            return this.isMonthlyDatePickerClicked(element.parentElement);
        }
    }
}
