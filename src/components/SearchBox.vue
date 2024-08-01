<template>
    <div class="flex gap-x-1">
        <el-input class="w-80" v-model="internalQuery" placeholder="请输入搜索关键词" @keyup.enter.native="performSearch" />
        <el-button type="primary" @click="performSearch">
            搜索
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const internalQuery = ref(route.query.query as string || '');

watch(() => route.query.query, (newQuery) => {
  internalQuery.value = newQuery as string || '';
});

function performSearch() {
    if (internalQuery.value !== '') {
        ElMessage.success(`搜索: ${internalQuery.value}`);
        router.push({ path: '/results', query: { query: internalQuery.value } });
    } else {
        ElMessage.warning('请输入搜索关键词');
    }
}
</script>

<style scoped>
.rainbow {
    @apply bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent
}
</style>