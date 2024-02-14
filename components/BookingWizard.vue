<template>
    <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    >
        <div class="relative top-20 mx-auto p-5 border w-96 md:w-1/2 shadow-lg rounded-md bg-white">
            <button @click="closeModal" class="absolute top-0 right-0 m-2">
                <Icon name="mdi:close" size="24px" />
            </button>
            <h1 class="text-2xl font-bold mb-4">New Booking</h1>
            <div v-if="step === 1">
                <h2 class="text-xl font-bold mb-2">Please select an existing travel:</h2>
                <input
                    type="text"
                    placeholder="Search travels..."
                    v-model="searchQuery"
                    class="border p-2 w-full"
                />
                <ul class="max-h-60 overflow-auto">
                    <li
                        v-for="travel in filteredTravels"
                        :key="travel.id"
                        @click="selectTravel(travel.id)"
                        class="cursor-pointer p-2 hover:bg-gray-200"
                    >
                        {{ travel.name }}
                    </li>
                </ul>
            </div>
            <div v-if="step === 2">
                <h2 class="text-xl font-bold mb-2">Please introduce your personal information:</h2>
                <div class="flex flex-col space-y-4">
                    <input v-model="customerInfo.name" placeholder="Name" class="border p-2" />
                    <input v-model="customerInfo.email" placeholder="Email" class="border p-2" />
                    <input v-model="customerInfo.phoneNumber" placeholder="Phone" class="border p-2" />
                    <input v-model="customerInfo.age" placeholder="Age" class="border p-2" />
                    <input v-model="customerInfo.gender" placeholder="Gender" class="border p-2" />
                </div>
                <div class="mt-3 text-center">
                    <button @click="prevStep">
                        <Icon name="mdi:arrow-left" size="24px" />
                    </button>
                    <button @click="validateCustomerInfo" class="mt-3 text-center">
                        <Icon name="mdi:arrow-right" size="24px" />
                    </button>
                </div>
            </div>
            <div v-if="step === 3">
                <h2 class="text-xl font-bold mb-2">Please select a payment method:</h2>
                <div>
                    <label for="paymentType" class="block text-sm font-medium text-gray-700">Payment Type</label>
                    <select
                        name="paymentType"
                        id="paymentType"
                        v-model="bookingToAdd.paymentType"
                        class="mt-1 block w-full">
                        <option :value="PaymentTypes.CREDIT_TRANSFER" selected>Credit Transfer</option>
                        <option :value="PaymentTypes.PAYPAL">PayPal</option>
                        <option :value="PaymentTypes.REVOLUT">Revolut</option>
                    </select>
                </div>
                <div>
                    <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                        name="notes"
                        id="notes"
                        v-model="bookingToAdd.notes"
                        cols="30"
                        rows="4"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                    <div class="mt-3 text-center">
                        <button @click="prevStep">
                            <Icon name="mdi:arrow-left" size="24px" />
                        </button>
                        <button @click="submitForm" class="mt-3 text-center">
                            <Icon name="mdi:arrow-right" size="24px" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Booking } from '~/interfaces/Booking';
import type { CustomerInfo } from '~/interfaces/CustomerInfo';
import type Travel from '~/interfaces/Travel';
import { useTravelsStore } from '~/stores/travels';
import { useBookingsStore } from '~/stores/bookings';
import { PaymentTypes } from '~/enums/PaymentTypes';

const travelsStore = useTravelsStore();
const { addBooking } = useBookingsStore();

defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:showModal', 'save']);

const step = ref(1);
const TOTAL_STEPS = 3;
const DEFAULT_EMPTY_BOOKING: Booking = {
    id: 0,
    travelId: 0,
    customerInfo: {
        name: '',
        email: '',
        phoneNumber: '',
        age: 0,
        gender: ''
    },
    paymentType: PaymentTypes.CREDIT_TRANSFER,
    notes: ''
};
const bookingToAdd = ref<Booking>(DEFAULT_EMPTY_BOOKING);

/** STEP 1 **/

const searchQuery = ref('');
const selectedTravel = ref<Travel | null>(null);

const filteredTravels = computed<Travel[]>(() => (
    travelsStore.travels.filter(
        (travel) => travel.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
));

const selectTravel = (id: number) => {
    const findTravel = travelsStore.travels.find((travel) => travel.id === id);
    if (findTravel) {
        selectedTravel.value = findTravel;
        nextStep();
    } else {
        alert('Travel not found');
    }
};

/** STEP 2 **/
const customerInfo = ref<CustomerInfo>({
    name: '',
    email: '',
    phoneNumber: '',
    age: 0,
    gender: ''
});

const validateCustomerInfo = () => {
    if (customerInfo.value.name
        && customerInfo.value.email
        && customerInfo.value.phoneNumber
        && customerInfo.value.age
        && customerInfo.value.gender
    ) {
        nextStep();
    } else {
        alert('Please fill in all the fields');
    }
}

/** STEP 3 **/
const submitForm = () => {
    if (selectedTravel.value) {
        bookingToAdd.value = { 
            ...bookingToAdd.value,
            // INFO: We assume that new bookings have a unique ID generated by the server
            id: Math.floor(Math.random() * 10000),
            travelId: selectedTravel.value.id,
            customerInfo: customerInfo.value,
        };
        emit('save', bookingToAdd.value);
        bookingToAdd.value = { ...DEFAULT_EMPTY_BOOKING };
        closeModal();
    }
}

const nextStep = () => step.value < TOTAL_STEPS ? step.value++ : step.value;
const prevStep = () => step.value > 1 ? step.value-- : step.value;

const closeModal = () => {
    emit('update:showModal', false);
    step.value = 1;
}
</script>