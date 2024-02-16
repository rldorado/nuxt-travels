<template>
    <div class="mb-4">
        <input
            v-model="filterQuery"
            type="text"
            placeholder="Filter by name..."
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            @input="applyFilters"
        />
    </div>
</template>

<script setup lang="ts">
import type Travel from '~/interfaces/Travel';

const props = defineProps({
    travels: {
        type: Array as () => Travel[],
        required: true
    }
});

/** FILTERS */
const filterQuery = ref<string>('');
const filteredTravels = ref<Travel[]>([]);

const applyFilters = () => {
  filteredTravels.value = props.travels.filter((travel: Travel) => {
    return travel.name.toLowerCase().includes(filterQuery.value.toLowerCase());
  });
}
</script>