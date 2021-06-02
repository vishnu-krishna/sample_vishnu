import { State } from '../../shared/globals/oneMinuteMove/state';

export class AddressHelper {
    public static toString(
        floorNumber: string,
        unitNumber: string,
        streetNumber: string,
        streetName: string,
        suburb: string,
        postcode: string,
        state: State) {
        let addressPrefix: string =
            ((floorNumber) ? 'Floor ' + floorNumber + ', ' : '') +
            ((unitNumber) ? 'Unit ' + unitNumber + ', ' : '');
        let address: string = `${addressPrefix}${streetNumber ? streetNumber + ' ' : ''}${streetName ? streetName + ', ' : ''}${suburb ? suburb + ' ' : ''}${state ? state + ' ' : ''}${postcode ? postcode : ''}`;
        return address.trim();
    }
}
