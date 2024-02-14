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
      // INFO: We're assuming ID is automatically generated from API
      this.travels.push(travel);
    },
    removeTravel(travelId: number) {
      this.travels = this.travels.filter(travel => travel.id !== travelId);
    },
    updateTravel(travel: Travel) {
      const index = this.travels.findIndex(t => t.id === travel.id);
      if (index !== -1) {
        this.travels[index] = travel;
      }
    }
  }
});
