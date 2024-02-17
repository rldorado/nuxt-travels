import { describe, beforeEach, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from './../travels';

describe('travels store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add a new travel', () => {
    const store = useTravelsStore();
    const travel: Travel = {
      id: 1,
      name: 'Test Travel',
      departureDate: '2022-01-01',
      returnDate: '2022-01-07',
      description: 'Test Description',
      price: 100,
      picture: 'url',
      rating: 5,
    };

    store.addTravel(travel);
    expect(store.travels).toHaveLength(1);
    expect(store.travels[0]).toEqual(travel);
  });

  it('should remove a travel', () => {
    const store = useTravelsStore();
    const travel: Travel = {
      id: 1,
      name: 'Test Travel',
      departureDate: '2022-01-01',
      returnDate: '2022-01-07',
      description: 'Test Description',
      price: 100,
      picture: 'url',
      rating: 5,
    };
    store.addTravel(travel);
    store.removeTravel(travel.id);
    expect(store.travels).toHaveLength(0);
  });

  it('updates/edits an existing travel', () => {
    const store = useTravelsStore();
    const travel: Travel = {
      id: 1,
      name: 'Test Travel',
      departureDate: '2022-01-01',
      returnDate: '2022-01-07',
      description: 'Test Description',
      price: 100,
      picture: 'url',
      rating: 5,
    };

    store.addTravel(travel);
    store.updateTravel({
      ...travel,
      name: 'Updated Travel',
    });
    expect(store.travels[0]).toEqual({
      ...travel,
      name: 'Updated Travel',
    });
  })
});
