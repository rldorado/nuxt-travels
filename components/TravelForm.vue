<template>
    <form
      @submit.prevent="submitForm"
      class="space-y-8 divide-y divide-gray-200"
    >
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Travel Information</h3>
          <div class="mt-6">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" v-model="travel.name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
  
              <div class="sm:col-span-3">
                <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="image" id="image" v-model="travel.picture" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
  
              <div class="sm:col-span-6">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows="3" v-model="travel.description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
  
              <div class="sm:col-span-3">
                <label for="departureDate" class="block text-sm font-medium text-gray-700">Departure Date</label>
                <input type="date" name="departureDate" id="departureDate" v-model="travel.departureDate" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
  
              <div class="sm:col-span-3">
                <label for="returnDate" class="block text-sm font-medium text-gray-700">Return Date</label>
                <input type="date" name="returnDate" id="returnDate" v-model="travel.returnDate" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
  
              <div class="sm:col-span-3">
                <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" id="price" v-model="travel.price" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
  
              <div class="sm:col-span-3">
                <label for="rating" class="block text-sm font-medium text-gray-700">Average Rating</label>
                <input type="number" name="rating" id="rating" v-model="travel.rating" step="0.1" min="0" max="5" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            @click="cancel"
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Travel
          </button>
        </div>
      </div>
    </form>
  </template>
  
<script setup lang="ts">  
import type Travel from '~/interfaces/Travel';

const emits = defineEmits(['save', 'cancel']);

const DEFAULT_EMPTY_TRAVEL: Travel = {
  id: 0,
  name: '',
  picture: '',
  description: '',
  departureDate: '',
  returnDate: '',
  price: 0,
  rating: 0
};

const travel = ref<Travel>({ ...DEFAULT_EMPTY_TRAVEL });
  
const submitForm = () => {
  emits('save', travel.value);
  travel.value = { ...DEFAULT_EMPTY_TRAVEL };
};
  
const cancel = () => {
  travel.value = { ...DEFAULT_EMPTY_TRAVEL };
};
</script>
  