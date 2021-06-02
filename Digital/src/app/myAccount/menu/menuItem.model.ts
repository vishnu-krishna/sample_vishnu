export class MenuItemModel {

    public icon: string;
    public isEnabled: boolean;
    public isSubItem: boolean;
    public label: string;
    public route: string;
    public showIndicator: boolean;
    public seperatorAfter: boolean;

    constructor() {
        this.icon = null;
        this.isEnabled = false;
        this.isSubItem = false;
        this.label = null;
        this.route = null;
        this.showIndicator = false;
    }
}
