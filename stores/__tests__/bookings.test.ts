import { describe, beforeEach, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import type Booking from '~/interfaces/Booking';
import { useBookingsStore } from './../bookings';

describe('bookings store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should add a new booking', () => {
        const store = useBookingsStore();
        const booking: Booking = {
            id: 1,
            name: 'Test Booking',
            departureDate: '2022-01-01',
            returnDate: '2022-01-07',
            description: 'Test Description',
            price: 100,
            picture: 'url',
            rating: 5,
        };

        store.addBooking(booking);
        expect(store.bookings).toHaveLength(1);
        expect(store.bookings[0]).toEqual(booking);
    });
})