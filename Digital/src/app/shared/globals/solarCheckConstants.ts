export class SolarCheckStatusLinks {
    public static DefaultLearnMoreLink: string = 'https://solarstatus.agl.com.au/?page=faqs';
    public static LearnMoreAmberLink: string = 'https://solarstatus.agl.com.au/?page=amber';
    public static LearnMoreGreenLink: string = 'https://solarstatus.agl.com.au/?page=green';
    public static LearnMoreUnavailableLink: string = 'https://solarstatus.agl.com.au/?page=unavailable';
}

export class SolarCheckStatusDataSettings {
    public static NumberOfDaysToProcess: number = 30;
}

export class SolarDetailsValidationConstants {
    public static minPanelQuantity: number = 4;
    public static maxPanelQuantity: number = 83;

    public static minSystemSize: number = 1.00;
    public static maxSystemSize: number = 12.50;

    public static minPanelSize: number = 0.15;
    public static maxPanelSize: number = 0.35;

    public static minInstallationYear: number = 2000;

    public static minSystemChangedDate: Date = new Date(2000, 0, 1);

}

export class SolarDetailsTitleText {
    public static registerTitle = 'Great! We need a few details then you\'re all set.';
    public static systemCorrectionTitle = 'I\'m correcting my system details';
    public static systemChangeTitle = 'I have modified my system';
}

export class SolarDetailsTooltipText {
    public static PanelQuantiyToolTipHeaderText = '';
    public static PanelQuantityToolTipBodyText = 'Not sure? Take a stroll outside, look up and count the number of panels on your roof, or check your installation paperwork.';

    public static SystemSizeToolTipHeaderText = '';
    public static SystemSizeToolTipBodyText = 'Check your paperwork or contact your installer. Otherwise, multiply the number of panels by the panel wattage (W).<br/><br/>As a guide: <br/>- Pre 2011 panels typically 190-215W<br/>- From 2011-14 typically 225-250W<br/>- Post 2014 typically 250-265W.<br/><br/>Example: 1000 Watts = 1 Kilowatt (kW), so 16 panels x 250W per panel = 4000W = 4.00 kW.';

    public static InstallationYearToolTipHeaderText = '';
    public static InstallationYearToolTipBodyText = 'Panel performance has improved over the years, so we need to know how old they are - check the paperwork if you’re unsure.';

    public static UpgradeDateToolTipHeaderText = '';
    public static UpgradeDateToolTipBodyText = 'This is the date which your system was modified.';
}

export class SolarCheck {
    public static AccountWithNoSolarCheckOffer = 'accountWithNoSolarCheckOffer';
}
