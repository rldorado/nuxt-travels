<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Travels</h1>
        <div v-if="pending" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600">Failed to load travels.</div>
        <div v-if="!pending && !error">
            <TravelFilters
                @updateFilter="updateFilter"
                @updateSort="updateSort"
            />
            <TravelTable
                :travels="paginatedTravels"
                @edit="handleEdit"
                @delete="handleDelete"
            />
            <Pagination
                :totalPages="totalPages"
                :currentPage="currentPage"
                @update:currentPage="currentPage = $event"
            />
            <hr class="my-4">
            <h1 v-if="travelToEdit" class="text-2xl font-bold">Update Travel</h1>
            <h1 v-else class="text-2xl font-bold">Add Travel</h1>
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
import { useTravelFilters } from '~/composables/useTravelFilters';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from '~/stores/travels';

const { fetchTravels, pending, error } = useTravelsApi();

const travelsStore = useTravelsStore();

const {
    filterQuery,
    sortOrder,
    currentPage,
    totalPages,
    paginatedTravels
} = useTravelFilters();

const travelToEdit = ref<Travel | null>(null);
const successMessage = ref<string>('');

const handleSave = (travel: Travel) => {
    if (travelToEdit.value) {
        travelsStore.updateTravel(travel);
        successMessage.value = 'Travel updated successfully.';
    } else {
        travelsStore.addTravel(travel);
        successMessage.value = 'Travel added successfully.';
    }
    setTimeout(() => successMessage.value = '', 3000);
    travelToEdit.value = null;
}

const handleEdit = (travel: Travel) => {
    travelToEdit.value = travel;
}

const handleDelete = (travelId: number) => {
    travelsStore.removeTravel(travelId);
    successMessage.value = 'Travel removed successfully.';
    setTimeout(() => successMessage.value = '', 3000);
}

onMounted(async () => {
    await fetchTravels();
});

const updateFilter = (query: string) => {
    filterQuery.value = query;
};

const updateSort = (order: string) => {
    sortOrder.value = order;
}
</script>
