import { ConfirmAddress } from './pages/confirmAddress';
import { ConfirmConnection } from './pages/confirmConnection';
import { ConnectionTips } from './pages/connectionTips';
import { MoveOutDate } from './pages/moveOutDate';
import { RequestReceived } from './pages/requestReceived';
import { SelectAddress } from './pages/selectAddress';

export class Pages {
    public selectAddress: SelectAddress;
    public confirmAddress: ConfirmAddress;
    public moveOutDate: MoveOutDate;
    public confirmConnection: ConfirmConnection;
    public connectionTips: ConnectionTips;
    public requestReceived: RequestReceived;
    public termsConditions: string;
}
