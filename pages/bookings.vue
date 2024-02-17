<template>
    <div class="container mx-auto-p-4">
        <h1 class="text-2xl font-bold mb-4">Bookings</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600" role="alert">Failed to load bookings.</div>
        <div v-if="!pending && !error">
            <BookingTable :bookings="displayedBookings" />
            <div class="flex justify-center">
                <button
                    v-if="bookingsStore.bookings.length > displayedBookings.length"
                    @click="loadMore"
                    class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Load More
                </button>
            </div>
            <BookingWizard
                v-model:showModal="showBookingWizard"
                @save="handleSave"
            />
        </div>
        <hr class="my-4">
        <div class="flex justify-center">
            <button
                @click="openBookingWizard"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                + Add Booking
            </button>
        </div>
        
        <div v-if="showSuccessMessage" class="fixed top-0 right-0 p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Booking successfully added.
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingsApi } from '~/composables/useBookingsApi';
import { useTravelsApi } from '~/composables/useTravelsApi';
import type Booking from '~/interfaces/Booking';
import { useBookingsStore } from '~/stores/bookings';

const { fetchBookings, pending, error } = useBookingsApi();
const { fetchTravels } = useTravelsApi();

const bookingsStore = useBookingsStore();

const showBookingWizard = ref(false);
const showSuccessMessage = ref(false);

const openBookingWizard = () => {
    showBookingWizard.value = true;
}

const handleSave = (booking: Booking) => {
    bookingsStore.addBooking(booking);
    displayedBookings.value.unshift(booking);
    showSuccessMessage.value = true;
    setTimeout(() => showSuccessMessage.value = false, 3000);
}

const LIMIT_PER_PAGE = 5;
const displayedBookings = ref<Booking[]>([]);

onMounted(async () => {
    await fetchTravels();
    await fetchBookings();
    displayedBookings.value = bookingsStore.fetchBookings(0, LIMIT_PER_PAGE);
});

const loadMore = async () => {
    const currentLength = displayedBookings.value.length;
    displayedBookings.value.push(...bookingsStore.fetchBookings(currentLength, LIMIT_PER_PAGE));
}
</script>