import { defineStore } from 'pinia';
import type Booking from '~/interfaces/Booking';

export const useBookingsStore = defineStore('bookings', {
    state: () => ({
      bookings: [] as Booking[]
    }),
    actions: {
      setBookings(bookings: Booking[]) {
        this.bookings = bookings;
      },
      addBooking(booking: Booking) {
        this.bookings.push(booking);
      },
      // INFO: We use 'fetchTravels' to emulate pagination as we don't have pagination in backend
      fetchBookings(start: number, limit: number) {
        return this.bookings.slice(start, start + limit);
      }
    }
  });