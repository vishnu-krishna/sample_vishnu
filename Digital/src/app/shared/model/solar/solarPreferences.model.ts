export class SolarCheckPreferences {

    public optOutOfOffer: boolean;
    public marketingComms: boolean;
    public statusChangeComms: boolean;

    constructor() {
        this.optOutOfOffer = true;
        this.marketingComms = true;
        this.statusChangeComms = true;
    }
}
