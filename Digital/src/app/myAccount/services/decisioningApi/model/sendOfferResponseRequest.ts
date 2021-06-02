export class SendOfferResponseRequest {
    constructor(public bpId: string, public interactionId: string, public businessGroup: string, public businessIssue: string, public propositionId: string, public businessName: string, public pageId: string, public componentId: string, public asset: string, public channel: string, public responseType: string, public direction: string) {
      // Constructor
    }
}
