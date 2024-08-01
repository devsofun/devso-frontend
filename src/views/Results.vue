<template>
  <div class="flex flex-col bg-gray-100 p-4">
    <div class="flex justify-start items-center space-x-1">
      <div class="font-bold text-xl rainbow leading-none">
        DevSo.Fun
      </div>
      <div class="flex-grow">
        <SearchBox :query="query" />
      </div>
    </div>
    <div class="w-full max-w-4xl mt-4">
      <div v-for="(result, index) in results" :key="index" class="result-item">
        <h2 class="result-title">
          <a :href="result.url" target="_blank">{{ result.title }}</a>
        </h2>
        <p class="result-snippet">{{ result.snippet }}</p>
        <div class="result-url">{{ result.url }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from '../components/SearchBox.vue';

const router = useRouter();

const query = ref(router.currentRoute.value.query.query as string);

const results = [
  {
    title: 'Vue.js - The Progressive JavaScript Framework',
    snippet: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
    url: 'https://vuejs.org/'
  },
  {
    title: 'React – A JavaScript library for building user interfaces',
    snippet: 'React makes it painless to create interactive UIs. Design simple views for each state in your application.',
    url: 'https://reactjs.org/'
  },
  {
    title: 'Angular',
    snippet: 'One framework. Mobile & desktop.',
    url: 'https://angular.io/'
  }
];
</script>

<style scoped>
.results-page {
  @apply flex flex-col items-center bg-gray-100 p-4;
}

.results-container {
  @apply w-full max-w-4xl mt-4;
}

.result-item {
  @apply mb-6;
}

.result-title {
  @apply text-xl font-bold text-blue-600;
}

.result-snippet {
  @apply text-gray-700;
}

.result-url {
  @apply text-green-600;
}

.rainbow {
  @apply bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent
}
</style>