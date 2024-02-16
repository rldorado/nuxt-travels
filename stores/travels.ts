import { defineStore } from 'pinia';
import type Travel from '~/interfaces/Travel';

export const useTravelsStore = defineStore('travels', {
  state: () => ({
    travels: [] as Travel[]
  }),
  actions: {
    setTravels(travels: Travel[]) {
      this.travels = travels;
    },
    addTravel(travel: Travel) {
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
    },
    // INFO: We use 'fetchTravels' to emulate pagination as we don't have pagination in backend
    fetchTravels(start: number, limit: number) {
      return this.travels.slice(start, start + limit);
    }
  }
});
