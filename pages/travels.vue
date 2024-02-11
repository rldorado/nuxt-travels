<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Travels</h1>
        <TravelTable :travels="safeTravels" />
    </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import type Travel from '~/interfaces/Travel';

const { data: travels } = await useFetch<Travel[]>('/api/travels');

const safeTravels = computed(() => travels.value || []);
</script>