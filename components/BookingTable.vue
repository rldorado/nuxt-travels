<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="w-2/6 min-w-[160px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Travel Info
            </th>
            <th scope="col" class="w-2/6 min-w-[160px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Info
            </th>
            <th scope="col" class="w-1/6 min-w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Type
            </th>
            <th scope="col" class="w-2/6 min-w-[160px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 text-sm md:text-md">
          <tr v-for="booking in bookings" :key="booking.id">
            <td class="px-6 py-4 whitespace-nowrap">
                <div
                  v-if="findTravel(booking.travelId)"
                  class="flex flex-col"
                >
                    <span><strong>Name:</strong> {{ findTravel(booking.travelId)?.name }}</span>
                    <span><strong>Departure:</strong> {{ findTravel(booking.travelId)?.departureDate }}</span>
                    <span><strong>Return:</strong> {{ findTravel(booking.travelId)?.returnDate }}</span>
                </div>
                <div v-else>
                    <span class="text-red-500"><strong>Travel not found</strong></span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                    <span><strong>Name:</strong> {{ booking.customerInfo.name }}</span>
                    <span><strong>Email:</strong> {{ booking.customerInfo.email }}</span>
                    <span><strong>Phone:</strong> {{ booking.customerInfo.phoneNumber }}</span>
                    <span><strong>Age:</strong> {{ booking.customerInfo.age }} </span>
                    <span><strong>Gender:</strong> {{ booking.customerInfo.gender }}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <Icon :name="getPaymentTypeIcon(booking.paymentType)" size="24px" />
              <span class="pl-2">{{ booking.paymentType }}</span>
            </td>
            <td class="px-6 py-4 notes">
              <span v-if="booking.notes">{{ truncateText(booking.notes) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup lang="ts">
import { PaymentTypes } from '~/enums/PaymentTypes';
import type Booking from '~/interfaces/Booking';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from '~/stores/travels';
import { truncateText } from '~/utils/formatters';

defineProps({
  bookings: {
    type: Array as () => Booking[],
    required: true,
  },
});

const travelsStore = useTravelsStore();

const findTravel = (id: number): Travel | null => {
    return travelsStore.travels.find((travel) => travel.id === id) ?? null;
}

const getPaymentTypeIcon = (paymentType: string): string => {
    if (paymentType === PaymentTypes.CREDIT_TRANSFER) {
        return 'mdi:credit-card-outline';
    }
    if (paymentType === PaymentTypes.PAYPAL) {
        return 'mdi:paypal';
    }
    if (paymentType === PaymentTypes.REVOLUT) {
        return 'arcticons:revolut';
    }
    return 'No valid payment type found';
}

</script>

<style scoped>
@media (max-width: 640px) /* TailwindCSS breakpoint for 'sm' */ {
  .notes {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>