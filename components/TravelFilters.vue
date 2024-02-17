<template>
    <div class="space-y-4 mb-4">
        <input
            v-model="filterQuery"
            type="text"
            placeholder="Filter by name..."
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            @input="$emit('updateFilter', filterQuery)"
        />
        <select
            v-model="sortOrder"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            @change="$emit('updateSort', sortOrder)"    
        >
                <option value="dateAsc">Dates - Soonest First</option>
                <option value="dateDesc">Dates - Latest First</option>
                <option value="ratingAsc">Rating - Lowest First</option>
                <option value="ratingDesc">Rating - Highest First</option>
        </select>
    </div>

</template>

<script setup lang="ts">
const filterQuery = ref<string>('');
const sortOrder = ref<string>('dateAsc');
</script>