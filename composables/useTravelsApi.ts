import type Travel from "~/interfaces/Travel";
import { useTravelsStore } from '~/stores/travels';

export function useTravelsApi() {
    const travelsStore = useTravelsStore();
    const pending = ref<boolean>(false);
    const error = ref<Error | null>(null);

    const fetchTravels = async () => {
        pending.value = true;
        error.value = null;
        try {
            const { data: travelsData } = await useFetch<Travel[]>('/api/travels');
            travelsStore.setTravels(travelsData.value ?? []);
        } catch (err) {
            error.value = err as Error;
            console.error('Error fetching travels', err);
        } finally {
            pending.value = false;
        }
    }

    fetchTravels();

    return {
        pending,
        error,
        fetchTravels
    }
}