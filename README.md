# Nuxt Travels Platform

## Tech stack

- [Vue 3](https://vuejs.org/) with composition API
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Iconify](https://iconify.design/) for Nuxt

## Project description

Travel and booking management system consisting of two pages:

1. To manage travels.
2. To manage bookings.

#### Travels

Travel's information:

- Name of the travel
- Dates of departure and return
- Picture
- Description of the tour
- Price for a single person
- Average user rating

Travel's page consists on a table and some basic filters. The user is able to:

1. Use a form to add a new travel.
2. Edit an existing travel.
3. Delete a travel.

#### Bookings

Booking's information:

- Related travel
- Customer basic information: Name, Email, Phone, Age, Gender.
- Payment type: Credit transfer, Paypal, Revolut
- Eventual internal notes

Booking's page consists on a table and a multi-step form (wizard) where the user can do:

1. Search and select the related travel
2. Customer info in a dedicated form
3. Select the payment type and optionally add some notes.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
