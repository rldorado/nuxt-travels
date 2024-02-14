<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Travels</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600">Failed to load travels.</div>
        <div v-if="!pending && !error">
            <TravelTable
                :travels="travelsStore.travels"
                @edit="handleEdit"
                @delete="handleDelete"
            />
            <h1 class="text-2xl font-bold my-4">Add Travel</h1>
            <TravelForm
                :initialTravel="travelToEdit"
                @save="handleSave"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTravelsApi } from '~/composables/useTravelsApi';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from '~/stores/travels';

const { fetchTravels, pending, error } = useTravelsApi();

const travelsStore = useTravelsStore();

onMounted(fetchTravels);

const travelToEdit = ref<Travel | null>(null);

const handleSave = (travel: Travel) => {
    if (travel.id) {
        travelsStore.updateTravel(travel);
    } else {
        travelsStore.addTravel(travel);
    }
    travelToEdit.value = null;
}

const handleEdit = (travel: Travel) => {
    travelToEdit.value = travel;
}

const handleDelete = (travelId: number) => {
    travelsStore.removeTravel(travelId);
}
</script>
