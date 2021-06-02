export enum DecisioningEventType {
    Authenticated = <any> 'Authenticated'
}
export enum DecisioningEventTypeStorageKey {
    Authenticated = <any> `Event:${ DecisioningEventType.Authenticated.toString() }`
}
