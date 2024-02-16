<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Travels</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600">Failed to load travels.</div>
        <div v-if="!pending && !error">
            <TravelTable
                :travels="displayedTravels"
                @edit="handleEdit"
                @delete="handleDelete"
            />
            <div class="flex justify-center mt-4">
                <button
                    v-if="travelsStore.travels.length > displayedTravels.length"
                    @click="loadMore"
                    class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Load More
                </button>
            </div>
            <hr class="my-4">
            <h1 class="text-2xl font-bold">Add Travel</h1>
            <TravelForm
                :initialTravel="travelToEdit"
                @save="handleSave"
            />
        </div>
        <div v-if="successMessage" class="fixed top-0 right-0 p-4 m-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            {{ successMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTravelsApi } from '~/composables/useTravelsApi';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from '~/stores/travels';

const { fetchTravels, pending, error } = useTravelsApi();

const travelsStore = useTravelsStore();

const travelToEdit = ref<Travel | null>(null);
const successMessage = ref('');

const handleSave = (travel: Travel) => {
    if (travel.id) {
        travelsStore.updateTravel(travel);
        successMessage.value = 'Travel updated successfully.'
    } else {
        travelsStore.addTravel(travel);
        successMessage.value = 'Travel added successfully.'
    }
    setTimeout(() => successMessage.value = '', 3000);
    travelToEdit.value = null;
}

const handleEdit = (travel: Travel) => {
    travelToEdit.value = travel;
}

const handleDelete = (travelId: number) => {
    travelsStore.removeTravel(travelId);
}

const LIMIT_PER_PAGE = 10;
const displayedTravels = ref<Travel[]>([]);

onMounted(async () => {
    await fetchTravels();
    displayedTravels.value = travelsStore.fetchTravels(0, LIMIT_PER_PAGE);
});

const loadMore = async () => {
    const currentLength = displayedTravels.value.length;
    displayedTravels.value.push(...travelsStore.fetchTravels(currentLength, LIMIT_PER_PAGE));
}
</script>
