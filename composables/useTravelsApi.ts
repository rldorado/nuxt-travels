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
        } finally {
            pending.value = false;
        }
        return [];
    }

    fetchTravels();

    return {
        pending,
        error,
        fetchTravels
    }
}