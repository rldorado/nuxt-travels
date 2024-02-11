<template>
    <slot />
</template>

<script setup lang="ts">
onBeforeMount(() => {
    navigateTo('/travels');
});
</script>