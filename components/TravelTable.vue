<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Travel List</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="travel in travels" :key="travel.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ travel.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(travel.departureDate) }} - {{ formatDate(travel.returnDate) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatCurrency(travel.price) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ travel.rating }}</td>
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

  // TODO: Implement date formatting logic
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  // TODO: Implement currency formatting logic
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(amount);
  }
</script>