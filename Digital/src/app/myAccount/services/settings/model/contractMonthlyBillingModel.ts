import { ContractViewModel } from '../../account.service';
import { BillDateOption } from './billDateOption';
import { BillingFrequencyType } from './billingFrequencyType';
import { MonthlyBillingActionEligibility } from './monthlyBillingActionEligibility';

export class ContractMonthlyBillingModel {

    public accountNumber: string;

    /* Indicates if there is incomplete to configure this contract for monthly billing
        eg. No matching record in the billingfrequencies or eligibility
    */
    public hasIncompleteData?: boolean = false;

    public setup?: MonthlyBillingActionEligibility;
    public cancellation?: MonthlyBillingActionEligibility;

    /*
        setupPredicted' and 'cancelPredicted' are predicted versions of
        'setup' and 'cancellation' that would be returned by the Eligibility endpoint.
        These exist so we can use available data about the customer to predict their
        eligibility prior to making an expensive API call. eg if they are WA gas then
        we know that an API call will always return false.
    */
    public setupPredicted: boolean;
    public cancelPredicted: boolean;

    public frequency: BillingFrequencyType;
    public preferredDayOfMonth: number;
    public selectedBillDate?: BillDateOption;

    constructor(
        public contract: ContractViewModel
    ) {

    }

}
