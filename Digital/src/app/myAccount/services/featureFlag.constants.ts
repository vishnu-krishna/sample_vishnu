export enum FeatureFlagTypes {
    applyForConcessionEnabled = 'applyForConcessionEnabled',
    bankAccountPaymentEnabled = 'bankAccountPaymentEnabled',
    billSmoothingEnabled = 'billSmoothingEnabled',
    billSmoothingReviewEnabled = 'billSmoothingReviewEnabled',
    contactDetailsEnabled = 'contactDetailsEnabled',
    directDebitEnabled = 'directDebitEnabled',
    ebillEnabled = 'ebillEnabled',
    homeProfileEnabled = 'homeProfileEnabled',
    loginDetailsEnabled = 'loginDetailsEnabled',
    manageAccountEnabled = 'manageAccountEnabled',
    monthlyBillingEnabled = 'monthlyBillingEnabled',
    myWalletEnabled = 'myWalletEnabled',
    newCreditCardPaymentEnabled = 'newCreditCardPaymentEnabled',
    paymentAssistanceEnabled = 'paymentAssistanceEnabled', // This is payment assistance (part 2)
    paymentExtensionEnabled = 'paymentExtensionEnabled', // This is payment assistance (part 1)
    payOnTimeDiscountFixEnabled = 'payOnTimeDiscountFixEnabled',
    payPalDirectDebitEnabled = 'payPalDirectDebitEnabled',
    rewardsEnabled = 'rewardsEnabled',
    rewardsBenefitsMembershipEnabled = 'rewardsBenefitsMembershipEnabled',
    smsPayEnabled = 'smsPayEnabled',
    ssmrEnabled = 'ssmrEnabled',
    solarCheckEnabled = 'solarCheckEnabled',
    waGasTurnedOn = 'waGasTurnedOn',
    productSwapPrepaidEnabled = 'productSwapPrepaidEnabled',
    decisioningEnabled = 'decisioningEnabled',
    manageNotificationsEnabled = 'manageNotificationsEnabled',
    energyInsightsEnabled = 'energyInsightsEnabled',
    energyInsightsDisaggregationEnabled = 'energyInsightsDisaggregationEnabled',
}

export const FeatureFlagKeyPrefix: string = 'selfService.featureFlags.';
