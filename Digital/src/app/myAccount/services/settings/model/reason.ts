import { InternalReason } from './internalReason';

export class Reason {

    public message: string;
    public internal: InternalReason;
    public friendlyMessage?: string; // Added by the front end. Copy may be different than SAP message.

}
