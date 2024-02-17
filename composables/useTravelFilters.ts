import { computed, ref } from 'vue';
import type { Travel } from '~/interfaces/Travel';

const TRAVELS_PER_PAGE = 10;

export function useTravelFilters(initialTravels: Travel[]) {
    const filterQuery = ref('');
    const sortOrder = ref('');
    const currentPage = ref(1);

    const filteredTravels = computed(() => {
        let result = initialTravels.filter(
            (item) => item.name.toLowerCase().includes(filterQuery.value.toLowerCase())
        );

        result.sort((a,b) => {
            switch(sortOrder.value) {
                case 'dateAsc':
                    return new Date(a.departureDate) - new Date(b.departureDate);
                case 'dateDesc':
                    return new Date(b.departureDate) - new Date(a.departureDate);
                case 'ratingAsc':
                    return a.rating - b.rating;
                case 'ratingDesc':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        return result;
    });

    const paginatedTravels = computed(() => {
        const start = (currentPage.value - 1) * TRAVELS_PER_PAGE;
        const end = start + TRAVELS_PER_PAGE;
        return filteredTravels.value.slice(start, end);
    });

    const totalPages = computed(
        () => Math.ceil(filteredTravels.value.length / TRAVELS_PER_PAGE)
    );

    

    return {
        filterQuery,
        sortOrder,
        currentPage,
        totalPages,
        paginatedTravels,
    }
}