<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-500 text-white p-4">
      <h1>Nuxt Travels App</h1>
    </header>
    <nav class="bg-blue-700 text-white p-2">
      <ul class="flex space-x-4 justify-center">
        <li>
          <NuxtLink to="/travels" class="hover:underline">
            Travels
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/bookings" class="hover:underline">
            Bookings
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <main class="flex-grow p-4">
      <slot />
    </main>
    <footer class="bg-gray-700 text-white p-4 text-center">
      <p>&copy; 2024 Nuxt Travels App</p>
    </footer>
  </div>
</template>