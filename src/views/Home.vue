<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 space-y-5"> 
    <div class="flex items-center">
      <div class="inline-block text-5xl font-bold rainbow leading-none">
        DevSo.Fun
      </div>
    </div>
    <SearchBox />
  </div>
</template>

<script setup lang="ts">
import SearchBox from '../components/SearchBox.vue';
</script>

<style scoped>
.rainbow {
  @apply bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent
}
</style>