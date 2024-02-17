import type { PaymentType } from "~/enums/PaymentTypes";
import type CustomerInfo from "./CustomerInfo";

export default interface Booking {
    id: number;
    travelId: number;
    customerInfo: CustomerInfo;
    paymentType: PaymentType;
    notes?: string;
}
  