<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 space-y-5"> 
    <div class="flex">
      <div class="inline-block text-5xl font-bold rainbow select-none">
        DevSo.Fun
      </div>
    </div>
    <div class="flex w-full max-w-xl">
      <SearchBox class="flex-grow w-full px-5"/>
    </div>
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