<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="travel in travels" :key="travel.id">
            <td class="px-6 py-3 whitespace-nowrap">
              <img :src="travel.picture" class="w-10 h-10 rounded-full" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ travel.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(travel.departureDate) }} - {{ formatDate(travel.returnDate) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ travel.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatCurrency(travel.price) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ travel.rating }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <Icon
                name="mdi:pencil"
                class="cursor-pointer text-blue-500 hover:text-blue-700"
                size="24px"
                @click="$emit('edit', travel)"
              />
              <Icon
                name="mdi:delete"
                class="cursor-pointer text-red-500 hover:text-red-700 ml-2"
                size="24px"
                @click="$emit('delete', travel.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup lang="ts">
import type Travel from './../interfaces/Travel';

defineProps({
  travels: {
    type: Array as () => Travel[],
    required: true,
  },
});

defineEmits(['edit', 'delete']);

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(amount);
}
</script>