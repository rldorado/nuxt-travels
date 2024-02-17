<template>
    <nav aria-label="Page navigation" class="flex justify-center mt-4">
        <ul class="inline-flex items-center -space-x-px">
            <li 
                v-if="currentPage > 1"
                class="px-4 py-2 border text-blue-600 border-gray-300 hover:bg-gray-200 cursor-pointer"
                @click="updatePage(currentPage - 1)"
            >
                «
            </li>
            <li
                v-for="page in paginationRange"
                :key="page"
                :class="[
                    'px-4 py-2 border text-blue-600 border-gray-300 hover:bg-gray-200 cursor-pointer',
                    { 'bg-blue-100': page === currentPage }
                ]"
                @click="updatePage(page)"
            >
                {{ page }}
            </li>
            <li
                v-if="currentPage < totalPages"
                class="px-4 py-2 border text-blue-600 border-gray-300 hover:bg-gray-200 cursor-pointer"
                @click="updatePage(currentPage + 1)"
            >
                »
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['update:currentPage']);

const MAX_PAGES_SHOWN = 5;
const SIDE_PAGES = 1;

const paginationRange = computed(() => {
    const range = [];
    
    if (props.totalPages <= MAX_PAGES_SHOWN) {
        for (let i = 1; i <= props.totalPages; i++) {
            range.push(i);
        }
    } else {
        let start = Math.max(props.currentPage - SIDE_PAGES, 2);
        let end = Math.min(props.currentPage + SIDE_PAGES, props.totalPages - 1);
        
        range.push(1);
        
        if (start > 2) {
            range.push('...');
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < props.totalPages - 1) {
            range.push('...');
        }

        range.push(props.totalPages);
    }

    return range;
});

const updatePage = (page: number | string) => {
    if (page !== '...') {
        emit('update:currentPage', page);
    }
}
</script>