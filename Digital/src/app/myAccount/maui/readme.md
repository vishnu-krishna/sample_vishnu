# MAUI - My Account User Interface (Components)
The goal of MAUI components is to provide consistent, well-tested and reviewed UI components which have been approved by the My Account UX team.

Components follow the design guideline outlined in the [MA - DLS Style Guide](https://agl.invisionapp.com/d/main/#/projects/prototypes/12311298)

## Code Conventions
It is important to follow these conventions for each component as to reduce the mental overhead of consuming, updating or modifying
MAUI components.

### File Structure
#### Component
`/src/app/myAccount/maui/button/`
* `button.component.html`
    * component HTML markup.
* `button.component.scss`
    * component styles (typically imports `_maui.scss`.  **do not** import `dls.scss`).
* `button.component.ts`
    * component logic - not business logic (make component as dumb or implementation-agnostic as possible)
* `button.component.spec.ts`
    * component tests
* `button.module.ts`
    * each component is in its own module. **do not** include the showcase component.
* `index.ts`
    * [barrel file](https://angular.io/guide/glossary#barrel) for the component. Allows a single import statement eg. `import ../maui/button`.

#### Showcase for Component
`/src/app/myAccount/maui/button/showcase/`
* showcaseButton.component.ts
    * **do not** include this showcase component in the `button.module.ts` file above as it is to only be used in the showcase module (for demo purposes)
* showcaseButton.component.html
    * An implementation of the showcase component: `<agl-maui-button-showcase>`. Title, description, component markup for all the variations of the button component, etc.

### Showcase Page (for all MAUI showcase components)
Accessible in all non-production environments via the url `/maui` (unauthenticated My Account Angular route).
This page should include all MAUI component showcases to demo it's functionality to team members / stakeholders.
`/src/app/myAccount/maui/showcase`
* `showcase.component.html`
    * Contains a reference to each of the individual component showcase components: `<agl-maui-button-showcase>`, `<agl-maui-fuelchip-showcase>` etc.
* `showcaseTemplate.component.html`
    * template with ng-content placeholders for heading, description, example code usage, example implementations



## Naming conventions
Ensure we use the same name the UX team has given the component to ensure we don't **mixup** the terms between discussions.
### Module
1. Prefix exported module class name name with `Maui` eg. `export class MauiButtonModule`

### Component
1.  Prefix the component element name with a `agl-maui-` prefix. eg `<agl-maui-button>`
1.  Export the component name without any prefixes eg. `export class FlashMessageComponent`
1.  Use default view encapsulation (ie. do not override or declare explicitly.)

## SCSS and Images
* We use Bootstrap 3.3.7 for our grid layout, do not create custom grid layouts.
Avoid using other third party UI component libraries (ie. Material Design).
* Prefer to use variables in `_maui.scss` rather than explicit values, especially for colours and fonts.
* Sass variable names in `_maui.scss` must match the names outlined in the [MA - DLS Style Guide](https://agl.invisionapp.com/d/main/#/projects/prototypes/12311298) to ensure designers and developers speak the same design language. For example: both the code and the style guide specify that `$neutral-03` means colour `#999999`.
* Import the maui-component-reset() mixin into the top of the component's scss file (or the the scss file of the outermost component if nested components are being used).
* Any SVG images used in components put into their own folder ie. `/src/public/svg/maui/<componentName>` to keep them separate.
* Include the `deep-anchor-styling` mixin if using transclusion and use `anchor-styling` mixin if embedding anchors directly.
* Use CSS `:host` bindings when needed (eg. shadows, border)
* Use B.E.M for CSS class names (see [GetBEM](http://getbem.com/naming/))

## Versioning
Although not currently done, the intent is to create sub-directories with `/v2` or `/v3` off the component directories, and consumers can choose which version to implement, so that any breaking change is an intentional upgrade by consumers of these components (with the view that we deprecate old versions and upgrade usage of the component over time.)

### Changelog Versioning
We follow the https://semver.org/ versioning where:
* `v0.0.x` - Patch/Bugfix
* `v0.x.0` - Feature
* `vx.0.0` - Breaking Change

## Tests

### Functional Testing
Component tests are mandatory and should cover all scenarios in the requirements, as consumers of the components will rely on the component working as expected (eg. as documented and showcased).

1. Import the `index.ts` file and the `./<name>.component` file into the test as follows:
```
import { ButtonComponent } from './button.component';
import { MauiButtonModule } from './index';

    /* Note: there is no need to call TestBed.compileComponents() as we use webpack to inline the templates and css before the tests run.
     * https://angular.io/guide/testing#compilecomponents
     */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiButtonModule
            ]
        });

        fixture = TestBed.createComponent(ButtonComponent);
        // ...
    };
```

### Visual Testing
*  Ensure you test across all browsers and devices

## Development Process
## Starting
*  Ensure you kickoff with the BA and UI stakeholder and review the story and all scenarios.
*  Ensure you discuss any visual differences between different screen widths, and responsive vs. fixed widths.
*  When doing the walkthrough, using the showcase page is recommended to ensure you have all scenarios fully captured.

## Dependencies
*  Avoid introducing any dependencies on code (models, services etc) from outside of the /maui folder structure. The maui library may be extracted from this codebase for use in other systems, so any dependencies on the My Account codebase will prove problematic. For example: Do not pass my account domain models into MAUI components.
*  Avoid using other third party UI component libraries (ie. Material Design).

## Development
*  As a general rule, branch off `development` (and create the PR back to `development`).
*  In the PR ensure you add screenshots (eg. of the showcase, preferably mobile and desktop versions.)
*  Prefer declarative components rather than requiring custom model parameters and where it makes sense use parent -> child components (eg. tabs, button groups etc.)
*  Confirm test coverage of your components is sufficient (as per report in `coverage/lcov-report/index.html`)
*  Run `yarn css:local:maui:test` to verify you have not made any unexpected changes, if all ok run `'yarn css:local:approve` to update the reference images for the MAUI showcase page.