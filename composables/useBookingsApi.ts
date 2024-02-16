import type { Booking } from "~/interfaces/Booking";
import { useBookingsStore } from "~/stores/bookings";

export function useBookingsApi() {
    const bookingsStore = useBookingsStore();
    const pending = ref<boolean>(false);
    const error = ref<Error | null>(null);

    const fetchBookings = async () => {
        pending.value = true;
        error.value = null;
        try {
            const { data: bookingsData } = await useFetch<Booking[]>('/api/bookings');
            bookingsStore.setBookings(bookingsData.value ?? []);
        } catch (err) {
            error.value = err as Error;
            console.error('Error fetching bookings', err);
        } finally {
            pending.value = false;
        }
    }

    fetchBookings();

    return {
        pending,
        error,
        fetchBookings
    }
}