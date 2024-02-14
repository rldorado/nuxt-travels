<template>
    <div class="container mx-auto-p-4">
        <h1 class="text-2xl font-bold mb-4">Bookings</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600" role="alert">Failed to load bookings.</div>
        <div v-if="!pending && !error">
            <BookingTable :bookings="bookingsStore.bookings" />
            <BookingWizard
                v-model:showModal="showBookingWizard"
                @save="handleSave"
            />
        </div>
        <hr class="mb-4">
        <button
            @click="openBookingWizard"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            + Add Booking
        </button>
        <div v-if="showSuccessMessage" class="fixed top-0 right-0 p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Booking successfully added.
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingsApi } from '~/composables/useBookingsApi';
import { useTravelsApi } from '~/composables/useTravelsApi';
import type { Booking } from '~/interfaces/Booking';
import { useBookingsStore } from '~/stores/bookings';

const { fetchBookings, pending, error } = useBookingsApi();
const { fetchTravels } = useTravelsApi();

const bookingsStore = useBookingsStore();

const showBookingWizard = ref(false);
const showSuccessMessage = ref(false);

const openBookingWizard = () => {
    showBookingWizard.value = true;
}

onMounted(() => {
    fetchTravels();
    fetchBookings();
});

const handleSave = (booking: Booking) => {
    bookingsStore.addBooking(booking);
    showSuccessMessage.value = true;
    setTimeout(() => showSuccessMessage.value = false, 3000);
}
</script>