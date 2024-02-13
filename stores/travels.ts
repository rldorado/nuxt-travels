import { defineStore } from 'pinia';
import type Travel from '~/interfaces/Travel';

export const useTravelsStore = defineStore('travels', {
  state: () => ({
    travels: [] as Travel[]
  }),
  actions: {
    setTravels(travelsData: Travel[]) {
      this.travels = travelsData;
    },
    addTravel(travel: Travel) {
      this.travels.push(travel);
    },
    removeTravel(travelId: number) {
      this.travels = this.travels.filter(travel => travel.id !== travelId);
    },
  }
});
