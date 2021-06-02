import { AddressSearchModel } from './addressSearch.model';

export class QasListModel {
    public redirectToContactAGL: string;
    public errorMsg: string;
    public data: QasDataModel[];
}

export class QasDataModel {
    public PartialAddress: string;
    public Moniker: string;
}

export class QasSearchResultModel {
    public SearchResult: {
        SearchResponse: QasSearchResponseModel;
        SelectedAddress: string;
        ErrorMessage: string;
    };
}
export class QasSearchResponseModel {
    public AddressMode: string;
    public AddressType: string;
    public CareOf: string;
    public DPID: string;
    public Floor: string;
    public HouserNumber: string;
    public Latitude: string;
    public Longitude: string;
    public POBoxNumber: string;
    public POBoxType: string;
    public PostCode: string;
    public State: string;
    public Street: string;
    public StreetName: string;
    public StreetType: string;
    public Suburb: string;
    public UnitNumber: string;
    public ValidatedByQAS: string;
    public toString(): string {
        let addressPrefix: string = (this.UnitNumber) ? 'Unit ' + this.UnitNumber : '';
        return `${addressPrefix} ${this.Street} ${this.StreetName} ${this.StreetType}, ${this.Suburb} ${this.State} ${this.PostCode}`;
    }
    public toAddressSearchModel(): AddressSearchModel {
        return {
            searchPostcode: + this.PostCode,
            searchState: this.State,
            searchSuburb: this.Suburb,
            searchStreet: this.Street,
        };
    }
}
