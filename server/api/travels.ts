import type Travel from "~/interfaces/Travel";

const mockTravels: Travel[] = [
    {
        id: 1,
        name: "Alburqueque, NM",
        departureDate: "2024-08-15",
        returnDate: "2024-08-20",
        description: "This is an example travel 1",
        price: 500,
        picture: "https://s3.amazonaws.com/websiteportal/markets/63/Albuquerque.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "Tokyo, Japan",
        departureDate: "2024-09-10",
        returnDate: "2024-09-15",
        description: "This is an example travel 2",
        price: 700,
        picture: "https://cdn.thecrazytourist.com/wp-content/uploads/2018/05/ccimage-shutterstock_197314337.jpg",
        rating: 4.7
    }
];

export default defineEventHandler(() => {
    return mockTravels;
});