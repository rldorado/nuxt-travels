import type Travel from "~/interfaces/Travel";

const mockTravels: Travel[] = [
    {
        id: 1,
        name: "Example Travel 1",
        departureDate: "2022-08-15",
        returnDate: "2022-08-20",
        description: "This is an example travel 1",
        price: 500,
        picture: "example1.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "Example Travel 2",
        departureDate: "2022-09-10",
        returnDate: "2022-09-15",
        description: "This is an example travel 2",
        price: 700,
        picture: "example2.jpg",
        rating: 4.7
    }
];

export default defineEventHandler(() => {
    return mockTravels || [];
});