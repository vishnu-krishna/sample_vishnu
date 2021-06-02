export enum SolarCheckStatusType {
    NotAvailable = 1, // to avoid 0 value - since 0 value will be evaluated as falsey if testing enum validity
    Good,
    Fault,
    Indeterminate,
    UpdatePending
}
