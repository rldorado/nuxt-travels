<template>
    <div class="container mx-auto-p-4">
        <h1 class="text-2xl font-bold mb-4">Bookings</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600">Failed to load travels.</div>
        <div v-if="!pending && !error">
            <BookingTable :bookings="bookingsStore.bookings" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingsApi } from '~/composables/useBookingsApi';
import { useBookingsStore } from '~/stores/bookings';

const { fetchBookings, pending, error } = useBookingsApi();

const bookingsStore = useBookingsStore();

onMounted(fetchBookings);
</script>