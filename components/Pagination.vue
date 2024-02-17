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

const paginationRange = computed(() => {
    let range: (number | string)[] = [];
    if (props.totalPages <= MAX_PAGES_SHOWN) {
        for (let i = 1; i <= props.totalPages; i++) {
            range.push(i);
        }
    } else {
        const startPages = [1, 2];
        const endPages = [props.totalPages - 1, props.totalPages];
        const currentPageIndex = props.currentPage - 1;

        range = [props.currentPage];
        let count = 1;

        while (range.length < MAX_PAGES_SHOWN) {
        if (currentPageIndex - count >= 1) {
            range.unshift(currentPageIndex - count + 1);
        }
        if (currentPageIndex + count <= props.totalPages) {
            range.push(currentPageIndex + count + 1);
        }
        count++;
        }

        if (range[1] !== 2) range.splice(1, 0, '...');
        if (range[range.length - 2] !== props.totalPages - 1) range.splice(range.length - 1, 0, '...');
        
        range = Array.from(new Set([...startPages, ...range, ...endPages])).sort((a, b) => a - b);
    }

    return range.filter((page, index, self) => self.indexOf(page) === index);
});

const updatePage = (page: number | string) => {
    if (page !== '...') {
        emit('update:currentPage', page);
    }
}
</script>