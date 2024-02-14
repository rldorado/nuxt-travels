import { PaymentTypes } from "~/enums/PaymentTypes";
import type { Booking } from "~/interfaces/Booking";

const mockBookings: Booking[] = [
  {
    id: 1,
    travelId: 1,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "123456789",
      age: 30,
      gender: "Male"
    },
    paymentType: PaymentTypes.CREDIT_TRANSFER,
    notes: "Prefer window seat",
  },
  {
    id: 2,
    travelId: 2,
    customerInfo: {
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "987654321",
      age: 28,
      gender: "Female"
    },
    paymentType: PaymentTypes.PAYPAL,
    notes: "Allergic to peanuts",
  },
  {
    id: 3,
    travelId: 3,
    customerInfo: {
      name: "Alex Johnson",
      email: "alex@example.com",
      phoneNumber: "555555555",
      age: 35,
      gender: "Non-binary"
    },
    paymentType: PaymentTypes.REVOLUT,
    notes: "",
  },
];

export default defineEventHandler(() => mockBookings);
