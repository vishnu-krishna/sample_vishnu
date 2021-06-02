# 4.3.0 (2018-04-23)
## Features
* Calendar Reminder Component:
  - moved the AddEvent based calendar reminder into a MAUI component
  - the component emits the generated link for use on the page

# 4.2.0 (2018-03-21)
## Features
* Toggle Component:
  - Added an unclickable (disabled) feature

# 4.1.1 (2018-03-15)
## Features
* Secondary Navigation Component:
  - adding page indicator number (page number / page total)
* Dropdown Component:
  - adding disabled state
* Added Page Progress Bar Component

# 4.1.0 (2018-03-06)
## Fixes
* Checkbox Component: When checked, the class 'maui-checkbox__label--selected' is applied only to label which is passed as input and not to the label which is passed via ng-content. so removed the condition for applying this class only for label coming as @Input. Now it applies to both @Input and ng-content.

# 4.0.0 (2018-03-06)
## Fixes
* **Breaking Change** Toggle Component: Allow two-way binding
* Toggle Showcase: Show correct usage of toggle with proper bindings

# 3.0.1 (2018-03-05)
## Features
* Radio Button Group component:
  - removed nowrap from content
  - removed vertical-align: top from label

# 3.0.0 (2018-03-01)
## Features
* Radio Button Group component:
  - support two way binding on selectedValue
  -  **Breaking Change** remove currentSelectedValue property
  - rename radioButtonChange event to selectedValueChange to support two way binding.
  - fix showcase example (was not showing bound value changes)

# 2.3.0 (2018-02-27)
## Features
* Toggle component

# 2.2.1 (2018-02-12)
## Features
* Radio Button Group component
* Radio Button component

# 2.2.0 (2018-02-08)
## Features
* Checkbox component
* Checkbox Group component

## Fixes
* Segmented Button: Added white background color
* Showcase: Offset mobile heading height for height of mobile menu
* Showcase: Sort menu nav items alphabetically

# 2.1.1 (2018-02-05)
## Fixes
* Showcase: change breakpoint as which the menu appears as it prevents us seeing important maui component behavior around the original breakpoint

# 2.1.0 (2018-01-31)
## Features
* Terms and Conditions component - Modified the alignment of the text to align to top of the checkbox rather than middle

# 2.0.0 (2018-01-30)
## Features
* **Breaking Change** Refactored dropdown component and fixed dropdown selection not working in IOS.

# 1.0.0 (2018-01-17)
## Features
* **Changelog Added**
* Flash message component. Increase line spacing of heading, subheading and body. Fix vertical alignment of heading only flash message.
