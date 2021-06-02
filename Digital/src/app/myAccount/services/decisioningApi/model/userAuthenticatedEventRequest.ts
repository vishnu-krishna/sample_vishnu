export class UserAuthenticatedEventRequest  {
      constructor(public type: string, public channel: string, public timeStamp: string, public data: UserAuthenticatedEventRequestData) {
        // Constructor
      }
}

export class UserAuthenticatedEventRequestData {
    constructor(public bpId: string, public hBpId: string, public mId: string, public gAId: string) {
        // Constructor
    }
}
