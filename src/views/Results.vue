<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col items-center">
    <header class="sticky top-0 w-full bg-gray-100 shadow-md z-50 py-4">
      <div class="flex justify-start items-center gap-4 max-w-4xl mx-auto px-4 w-full">
        <div class="flex-shrink title rainbow text-2xl font-extrabold select-none">
          <a href="/">DevSo.Fun</a>
        </div>
        <SearchBox class="flex-grow" v-model="query" @search="fetchResults" />
      </div>
    </header>

    <main class="flex flex-col items-center max-w-4xl py-4 px-4" v-loading="loading">
      <div v-for="(result, index) in results" :key="index" 
        class="mb-6 p-6 bg-white rounded-xl shadow-lg min-w-full 
        transition-transform duration-300 hover:shadow-xl hover:scale-105">
        <h2 class="text-xl font-semibold text-blue-700">
          <a :href="result.link" target="_blank" class="hover-underline-animation">{{ result.title }}</a>
        </h2>
        <p class="text-gray-800 mt-2 break-all">{{ result.content + "..." }}</p>
        <p class="text-green-600 mt-2 break-all">{{ result.link }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import SearchBox from '../components/SearchBox.vue';

const route = useRoute();
const query = ref(route.query.query as string || '');
const results = ref<SearchResult[]>([]);
const loading = ref(false);

interface SearchResult {
  content: string;
  link: string;
  title: string;
}

const fetchResults = async () => {
  if (!query.value) return;
  loading.value = true;
  try {
    const response = await axios.get<SearchResult[]>(`https://api.devso.fun/search?q=${query.value}`);
    results.value = response.data;
    ElMessage.success('搜索结果更新');
  } catch (error) {
    ElMessage.error(`错误`);
  } finally {
    loading.value = false;
  }
};

watch(() => route.query.query, (newQuery) => {
  query.value = newQuery as string;
  fetchResults(); // 更新搜索结果
});

fetchResults();
</script>

<style scoped>
.rainbow {
  background: linear-gradient(to right, #60a5fa, #34d399, #8b5cf6);
  background-clip: text;
  color: transparent;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #3490dc;
  text-decoration: none;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #3490dc;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

</style>