import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MauiLightBoxModule } from '../lightBox';

import { CommonModule } from '@angular/common';
import { CommonPipesModule } from '../../modules/commonPipes.module';

// Modules
import { MauiButtonModule } from '../button';
import { MauiCheckboxModule } from '../checkbox';
import { MauiCheckboxGroupModule } from '../checkboxGroup';
import { MauiConfirmationBannerModule } from '../confirmationBanner/index';
import { MauiContainerModule } from '../container';
import { MauiDayOfMonthPickerModule } from '../dayOfMonthPicker';
import { MauiFlashMessageModule } from '../flashMessage';
import { MauiFuelChipModule } from '../fuelChip';
import { MauiHeadingModule } from '../heading';
import { MauiIconListModule } from '../iconList';
import { MauiRadioButtonGroupModule } from '../radioButtonGroup';
import { MauiSecondaryNavigationModule } from '../secondaryNavigation';
import { SegmentedButtonsModule } from '../segmentedButtons';
import { MauiPageProgressBarModule } from '../pageProgressBar';
import { MauiTermsAndConditionsModule } from '../termsAndConditions';
import { MauiTooltipModule } from '../tooltip';
import { MauiToggleModule } from '../toggle';
import { MauiProgressTrackerModule } from '../progressTracker';
import { MauiExpandableContainerModule } from '../expandableContainer';
import { MauiChevronMenuModule } from './../chevronMenu';

// Components
import { ShowcaseButtonComponent } from '../button/showcase/showcaseButton.component';
import { ShowcaseCheckboxComponent } from '../checkbox/showcase/showcaseCheckbox.component';
import { ShowcaseCheckboxGroupComponent } from '../checkboxGroup/showcase/showcaseCheckboxGroup.component';
import { ShowcaseConfirmationBannerComponent } from '../confirmationBanner/showcase/showcaseConfirmationBanner.component';
import { ShowcaseContainerComponent } from '../container/showcase/showcaseContainer.component';
import { ShowcaseDayOfMonthPickerComponent } from '../dayOfMonthPicker/showcase/showcaseDayOfMonthPicker.component';
import { DropdownModule } from '../dropdown';
import { ShowcaseDropdownComponent } from '../dropdown/showcase/showcaseDropdown.component';
import { ShowcaseFlashMessageComponent } from '../flashMessage/showcase/showcaseFlashMessage.component';
import { ShowcaseFuelChipComponent } from '../fuelChip/showcase/fuelChip.showcase.component';
import { ShowcaseHeadingComponent } from '../heading/showcase/showcaseHeading.component';
import { ShowcaseIconListComponent } from '../iconList/showcase/iconList.showcase.component';
import { ShowcaseLightBoxComponent } from '../lightBox/showcase/showcaseLightBox.component';
import { ShowcaseRadioButtonComponent } from '../radioButtonGroup/showcase/showcaseRadioButton.component';
import { ShowcaseSecondaryNavigationComponent } from '../secondaryNavigation/showcase/secondaryNavigation.showcase.component';
import { ShowcaseSegmentedButtonsComponent } from '../segmentedButtons/showcase/showcaseSegmentedButtons.component';
import { ShowcaseMauiPageProgressBarComponent } from '../pageProgressBar/showcase/showcasePageProgressBar.component';
import { ShowcaseTermsandConditionsComponent } from '../termsAndConditions/showcase/showcaseTermsAndConditions.component';
import { ShowcaseToggleComponent } from '../toggle/showcase/showcaseToggle.component';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseExampleTemplateComponent } from './showcaseExampleTemplate.component';
import { ShowcaseTemplateComponent } from './showcaseTemplate.component';
import { ShowcaseProgressTrackerComponent } from '../progressTracker/showcase/showcaseProgressTracker.component';
import { ShowcaseTooltipComponent } from '../tooltip/showcase/showcaseTooltip.component';
import { ShowcaseCalendarReminderComponent } from './../calendarReminder/showcase/showcaseCalendarReminder.component';
import { MauiCalendarReminderModule } from '../calendarReminder/calendarReminder.module';
import { ShowcaseExpandableContainerComponent } from '../expandableContainer/showcase/showcaseExpandableContainer.component';
import { ShowcaseChevronMenuComponent } from '../chevronMenu/showcase/showcaseChevronMenu.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: ShowcaseComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        CommonPipesModule,
        MauiDayOfMonthPickerModule,
        MauiButtonModule,
        MauiHeadingModule,
        MauiFuelChipModule,
        MauiHeadingModule,
        SegmentedButtonsModule,
        MauiLightBoxModule,
        MauiContainerModule,
        DropdownModule,
        MauiSecondaryNavigationModule,
        MauiFlashMessageModule,
        MauiConfirmationBannerModule,
        MauiTermsAndConditionsModule,
        MauiIconListModule,
        MauiRadioButtonGroupModule,
        MauiCheckboxModule,
        MauiCheckboxGroupModule,
        MauiProgressTrackerModule,
        MauiExpandableContainerModule,
        MauiChevronMenuModule,
        MauiTooltipModule,
        MauiToggleModule,
        MauiPageProgressBarModule,
        MauiCalendarReminderModule
    ],
    declarations: [
        ShowcaseComponent,
        ShowcaseTemplateComponent,
        ShowcaseExampleTemplateComponent,
        ShowcaseFlashMessageComponent,
        ShowcaseFuelChipComponent,
        ShowcaseDayOfMonthPickerComponent,
        ShowcaseHeadingComponent,
        ShowcaseDropdownComponent,
        ShowcaseButtonComponent,
        ShowcaseSegmentedButtonsComponent,
        ShowcaseSecondaryNavigationComponent,
        ShowcaseContainerComponent,
        ShowcaseLightBoxComponent,
        ShowcaseConfirmationBannerComponent,
        ShowcaseTermsandConditionsComponent,
        ShowcaseIconListComponent,
        ShowcaseRadioButtonComponent,
        ShowcaseCheckboxComponent,
        ShowcaseCheckboxGroupComponent,
        ShowcaseProgressTrackerComponent,
        ShowcaseExpandableContainerComponent,
        ShowcaseTooltipComponent,
        ShowcaseToggleComponent,
        ShowcaseMauiPageProgressBarComponent,
        ShowcaseCalendarReminderComponent,
        ShowcaseChevronMenuComponent
    ]
})
export class ShowcaseModule {}
