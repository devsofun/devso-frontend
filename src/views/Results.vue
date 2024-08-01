<template>
  <div class="results-page">
    <div class="header">
      <div class="title rainbow">DevSo.Fun</div>
      <SearchBox v-model="query" @search="fetchResults" />
    </div>
    <div class="results-container" v-loading="loading">
      <div v-for="(result, index) in results" :key="index" class="result-item">
        <h2 class="result-title">
          <a :href="result.link" target="_blank">{{ result.title }}</a>
        </h2>
        <p class="result-snippet">{{ result.content }}</p>
        <div class="result-url">{{ result.link }}</div>
      </div>
    </div>
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
  fetchResults();
});

fetchResults();
</script>

<style scoped>
.results-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f4f6;
  padding: 1rem;
}

.results-page.loading {
  opacity: 0.5;
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
}

.title {
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1;
}

.rainbow {
  background: linear-gradient(to right, #60a5fa, #34d399, #8b5cf6);
  background-clip: text;
  color: transparent;
}

.results-container {
  width: 100%;
  max-width: 4xl;
  margin-top: 1rem;
}

.result-item {
  margin-bottom: 1.5rem;
}

.result-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
}

.result-snippet {
  color: #374151;
}

.result-url {
  color: #059669;
}
</style>