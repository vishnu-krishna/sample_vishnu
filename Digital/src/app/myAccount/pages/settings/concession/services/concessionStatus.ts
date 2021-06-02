/* concession status has been created as a union type to enforce the status specific behaviors that would have been unenforceable if an enum been used */
export type ConcessionStatus = ConcessionNotAppliedFor | ConcessionApplied | ConcessionRejected | IneligibleForConcession | UnknownConcessionStatus;

export class ConcessionNotAppliedFor {}

export class ConcessionApplied {
    constructor(public readonly cardNumber: string,
                public readonly cardDescription: string,
                public readonly isWesternAustraliaFairerWayPackageApplicable: boolean) {
    }
}

export enum ConcessionRejectedReasons {
    NotApplicable,
    DetailsDidNotMatch,
    CouldNotBeValidated,
    IsIneligible,
    IsInvalid
}

export class ConcessionRejected {
    constructor(public readonly reason: ConcessionRejectedReasons,
                public readonly canApplyAgain: boolean) {
    }
}

export class IneligibleForConcession {
    constructor(public readonly shouldContactSouthAustralianDeptOfCommunities: boolean,
                public readonly hasMultipleBusinessPartners: boolean) {
        if (shouldContactSouthAustralianDeptOfCommunities && hasMultipleBusinessPartners) {
            throw new Error('Only one reason for ineligibility can be set');
        }
    }
}

export class UnknownConcessionStatus {}
