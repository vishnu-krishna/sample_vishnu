export class Flags {
    public IsEnabled: boolean;
    public UseQAS: string;
}

export class UiItems {
    public lblMovingTo: string;
    public txtMovingTo: string;
    public lblConfirmYourMove: string;
    public lblViewRates: string;
    public lblConnect: string;
    public lblDisconnect: string;
    public lblEditAddress: string;
    public lblEditDate: string;
    public lblConnectedBy: string;
    public lblDisconnectedBy: string;
    public lblDisconnectCurrent: string;
    public lblTerms: string;
    public lblNext: string;
    public lblConfirmAddress: string;
    public lblConfirmAvailableFuels: string;
    public lblDefaultFuelsMessage: string;
    public lblBack: string;
    public lblElectricity: string;
    public lblGas: string;
    public lblAvailable: string;
    public lblConnectIfAvailable: string;
    public lblUnitNumber: string;
    public lblUnitNumberErrMessage: string;
    public lblStreetNumber: string;
    public lblStreetNumberErrMessage: string;
    public lblStreetName: string;
    public lblStreetNameErrMessage: string;
    public lblStreetType: string;
    public lblStreeTypeErrMessage: string;
    public lblSuburb: string;
    public lblSuburbErrMessage: string;
    public lblState: string;
    public lblStateErrMessage: string;
    public lblPostcode: string;
    public lblPostcodeErrMessage: string;
    public lblConfirmAddressBtnText: string;
    public lblFuelUnavailableText: string;
    public lblMovingOn: string;
}

export class OneMinuteMove {
    public flags: Flags;
    public uiItems: UiItems;
}

export class OmmContentModel {
    public oneMinuteMove: OneMinuteMove;
}
