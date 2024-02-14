export const PaymentTypes = {
    CREDIT_TRANSFER: 'Credit transfer',
    PAYPAL: 'Paypal',
    REVOLUT: 'Revolut'
};

export type PaymentType = typeof PaymentTypes[keyof typeof PaymentTypes];